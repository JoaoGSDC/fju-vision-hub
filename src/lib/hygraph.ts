import "server-only";

interface GraphQLRequestOptions<Vars extends Record<string, any>> {
  query: string;
  variables?: Vars;
  preview?: boolean;
}

const endpoint = process.env.HYGRAPH_ENDPOINT;
const token = process.env.HYGRAPH_TOKEN;

// Log para depuração
console.log('HYGRAPH_ENDPOINT:', process.env.HYGRAPH_ENDPOINT ? 'Definido' : 'Não definido');
console.log('HYGRAPH_TOKEN:', process.env.HYGRAPH_TOKEN ? 'Definido' : 'Não definido');

if (!endpoint) {
  // We avoid throwing at import time in Next.js; callers should handle lack of config gracefully
  // but we keep a console.warn for visibility in development.
  if (process.env.NODE_ENV !== "production") {
    console.warn("HYGRAPH_ENDPOINT env var is not set. Hygraph requests will fail.");
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function hygraphFetch<TData = any, TVars extends Record<string, any> = Record<string, any>>(
  opts: GraphQLRequestOptions<TVars>,
  retries = 2,
  delayMs = 1000
): Promise<TData> {
  console.log('=== Dados da Requisição ===');
  console.log('Endpoint:', endpoint);
  console.log('Token:', token ? `${token.substring(0, 10)}...` : 'Não definido');
  console.log('Query:', opts.query.substring(0, 100) + (opts.query.length > 100 ? '...' : ''));
  if (opts.variables) {
    console.log('Variables:', JSON.stringify(opts.variables, null, 2));
  }
  if (!endpoint) {
    throw new Error("Missing HYGRAPH_ENDPOINT env var");
  }

  const headers: Record<string, string> = { "content-type": "application/json" };
  if (token) headers["authorization"] = `Bearer ${token}`;

  const requestBody = { 
    query: opts.query, 
    variables: opts.variables ?? {}
  };
  
  console.log('Enviando requisição para:', endpoint);
  console.log('Headers:', JSON.stringify(headers, null, 2));
  console.log('Body:', JSON.stringify(requestBody, null, 2));

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(requestBody),
  });

  let responseText: string;
  try {
    responseText = await res.text();
    console.log('Resposta do servidor:');
    console.log('Status:', res.status, res.statusText);
    console.log('Headers:', JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2));
    console.log('Body (first 1000 chars):', responseText.substring(0, 1000));
  } catch (error) {
    console.error('Erro ao ler o corpo da resposta:', error);
    throw new Error(`Falha ao ler a resposta do servidor: ${error.message}`);
  }

  if (res.status === 429 && retries > 0) {
    // Se for rate limit e ainda tivermos tentativas, espera e tenta novamente
    const retryAfter = parseInt(res.headers.get('retry-after') || '0') * 1000 || delayMs;
    console.log(`Rate limit atingido. Tentando novamente em ${retryAfter}ms... (${retries} tentativas restantes)`);
    await delay(retryAfter);
    return hygraphFetch<TData, TVars>(opts, retries - 1, delayMs * 2);
  }

  if (!res.ok) {
    const error = new Error(`Hygraph HTTP ${res.status}: ${responseText}`);
    console.error('Erro na requisição ao Hygraph:', error);
    throw error;
  }

  let json: any;
  try {
    json = JSON.parse(responseText);
    console.log('Resposta JSON parseada com sucesso');
  } catch (error) {
    console.error('Erro ao fazer parse do JSON:', error);
    console.error('Conteúdo que falhou no parse:', responseText);
    throw new Error(`Falha ao fazer parse da resposta JSON: ${error.message}`);
  }

  if (json.errors?.length) {
    const msg = json.errors.map((e: any) => e.message).join("; ");
    console.error('Erros do GraphQL:', json.errors);
    throw new Error(`Hygraph GraphQL errors: ${msg}`);
  }
  
  if (!json.data) {
    console.error('Resposta do servidor não contém a propriedade "data":', json);
    throw new Error('Resposta do servidor não contém os dados esperados');
  }
  
  console.log('Dados retornados com sucesso');
  return json.data as TData;
}
