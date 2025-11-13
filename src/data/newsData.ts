const eventImage = "/news-event.jpg";
const socialImage = "/news-social.jpg";
const transformationImage = "/news-transformation.jpg";
const cultureImage = "/news-culture.jpg";
const reflectionImage = "/news-reflection.jpg";

export interface NewsArticle {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  featured?: boolean;
  content: string;
  author: string;
}

export const allNews: NewsArticle[] = [
  {
    id: 1,
    category: "Destaque",
    title: "FJU promove grande encontro nacional de jovens em 2025",
    excerpt: "Evento reunirá mais de 10 mil jovens de todo o Brasil para celebrar a fé e compartilhar experiências de transformação.",
    image: eventImage,
    date: "15 de Janeiro, 2025",
    featured: true,
    author: "Redação FJU",
    content: `
      <p>A Força Jovem Universal (FJU) está organizando o maior encontro nacional de jovens já realizado pela instituição. O evento, previsto para acontecer em julho de 2025, promete reunir mais de 10 mil jovens de todos os estados brasileiros em uma celebração de fé, esperança e transformação.</p>
      
      <p>Durante três dias intensos, os participantes terão a oportunidade de participar de palestras motivacionais, workshops de liderança, momentos de louvor coletivo e atividades interativas que visam fortalecer a fé e o senso de comunidade entre os jovens.</p>
      
      <p>"Este evento representa um marco importante para a FJU. Queremos proporcionar aos jovens um espaço de encontro, reflexão e crescimento espiritual", afirma o coordenador nacional da FJU.</p>
      
      <p>O encontro contará com palestrantes renomados, bandas de música gospel e testemunhos inspiradores de jovens que tiveram suas vidas transformadas. As inscrições serão abertas em breve através do site oficial.</p>
      
      <p>Além das atividades principais, o evento também incluirá momentos de integração, ações solidárias e oportunidades de networking entre jovens que compartilham os mesmos valores e propósitos de vida.</p>
    `
  },
  {
    id: 2,
    category: "Ação Social",
    title: "Projeto alimenta 500 famílias em comunidades carentes",
    excerpt: "Voluntários da FJU distribuem cestas básicas e levam esperança para comunidades vulneráveis.",
    image: socialImage,
    date: "12 de Janeiro, 2025",
    author: "Maria Silva",
    content: `
      <p>Em uma ação coordenada e planejada, voluntários da Força Jovem Universal realizaram a distribuição de 500 cestas básicas em comunidades carentes de diversas regiões da cidade. A iniciativa faz parte do projeto "Alimentar com Amor", que visa combater a fome e levar esperança para famílias em situação de vulnerabilidade social.</p>
      
      <p>Cada cesta contém itens essenciais como arroz, feijão, óleo, açúcar, macarrão e produtos de higiene pessoal. Além da ajuda material, os voluntários também ofereceram palavras de conforto e apoio emocional às famílias atendidas.</p>
      
      <p>"Ver a gratidão nos olhos das pessoas que ajudamos não tem preço. Isso nos motiva a continuar fazendo a diferença", conta Ana Paula, uma das voluntárias do projeto.</p>
      
      <p>O projeto é mantido através de doações e conta com o apoio de parceiros locais. A meta para 2025 é expandir o alcance e beneficiar ainda mais famílias ao longo do ano.</p>
    `
  },
  {
    id: 3,
    category: "Transformação",
    title: "Ex-dependente químico se torna líder comunitário",
    excerpt: "História inspiradora de superação através da fé e do apoio da comunidade FJU.",
    image: transformationImage,
    date: "10 de Janeiro, 2025",
    author: "João Santos",
    content: `
      <p>A história de Rafael Almeida, 28 anos, é um testemunho poderoso de como a fé e o apoio comunitário podem transformar vidas. Após anos lutando contra a dependência química, Rafael encontrou na FJU o suporte necessário para reconstruir sua vida e hoje se tornou um líder comunitário que inspira outros jovens.</p>
      
      <p>"Eu estava no fundo do poço, sem esperança. Foi quando conheci a FJU e pessoas que realmente se importaram comigo", relembra Rafael emocionado.</p>
      
      <p>O processo de recuperação não foi fácil, mas com acompanhamento especializado, apoio espiritual e a comunhão com outros jovens da FJU, Rafael conseguiu superar seus desafios. Hoje, ele lidera um grupo de apoio para jovens em situação semelhante à que ele viveu.</p>
      
      <p>"Minha missão agora é ajudar outros jovens a encontrarem o caminho da transformação, assim como eu encontrei. Cada vida que ajudamos a mudar é uma vitória", afirma o jovem líder.</p>
      
      <p>A história de Rafael tem inspirado muitos outros jovens a buscarem ajuda e acreditarem na possibilidade de recomeçar.</p>
    `
  },
  {
    id: 4,
    category: "Voz Jovem",
    title: "O poder da juventude na construção de um mundo melhor",
    excerpt: "Reflexão sobre o papel dos jovens na transformação social e espiritual da sociedade contemporânea.",
    image: reflectionImage,
    date: "14 de Janeiro, 2025",
    author: "Letícia Ferreira",
    content: `
      <p>Vivemos em tempos desafiadores, onde a juventude muitas vezes é vista apenas como o futuro, quando na verdade somos o presente. Nossa geração tem o poder e a responsabilidade de construir hoje o mundo que queremos viver amanhã.</p>
      
      <p>A transformação social começa com escolhas individuais, mas se multiplica quando nos unimos em propósito comum. É por isso que movimentos como a FJU são tão importantes - eles nos dão estrutura, comunidade e direção para canalizar nossa energia de forma positiva.</p>
      
      <p>Cada ação, por menor que pareça, tem o potencial de gerar ondas de mudança. Seja através do voluntariado, da liderança comunitária, do apoio a causas sociais ou simplesmente sendo exemplo de integridade no dia a dia.</p>
      
      <p>O convite é para que cada jovem reconheça seu valor e seu poder de fazer a diferença. Não precisamos esperar permissão ou oportunidades perfeitas. Podemos começar agora, onde estamos, com o que temos.</p>
    `
  },
  {
    id: 5,
    category: "Voz Jovem",
    title: "Fé e propósito: encontrando seu chamado",
    excerpt: "Como descobrir e viver seu propósito de vida através da espiritualidade e ação prática.",
    image: transformationImage,
    date: "11 de Janeiro, 2025",
    author: "Pedro Henrique",
    content: `
      <p>Uma das perguntas mais comuns entre os jovens é: "Qual é o meu propósito?". Esta busca por significado não é apenas natural, é essencial para uma vida plena e realizada.</p>
      
      <p>Descobrir nosso chamado envolve um processo de autoconhecimento, reflexão espiritual e ação prática. Não é algo que acontece da noite para o dia, mas uma jornada contínua de descoberta e crescimento.</p>
      
      <p>A fé desempenha um papel fundamental nessa jornada. Ela nos conecta com algo maior que nós mesmos e nos dá direção mesmo quando o caminho parece incerto. Mas a fé sem ação é incompleta - precisamos colocar em prática aquilo em que acreditamos.</p>
      
      <p>Meu conselho é: experimente, sirva, conecte-se com pessoas que compartilham seus valores. É na prática do serviço e no convívio com a comunidade que muitas vezes descobrimos nossos dons e nosso verdadeiro chamado.</p>
    `
  },
  {
    id: 6,
    category: "Voz Jovem",
    title: "Superando desafios com resiliência e esperança",
    excerpt: "Artigo sobre como a fé nos fortalece diante das adversidades da vida moderna.",
    image: eventImage,
    date: "08 de Janeiro, 2025",
    author: "Camila Rodrigues",
    content: `
      <p>A vida não vem com manual de instruções, e todos nós enfrentamos momentos difíceis. O que define nosso caráter não são os desafios que enfrentamos, mas como escolhemos responder a eles.</p>
      
      <p>A resiliência não significa ser forte o tempo todo ou nunca sentir dor. Significa ter a coragem de continuar mesmo quando tudo parece difícil, de se levantar após cada queda, de manter a esperança mesmo na escuridão.</p>
      
      <p>A fé tem sido minha âncora nos momentos mais tempestuosos. Ela me lembra que não estou sozinha, que há propósito até mesmo nas dificuldades, e que dias melhores virão.</p>
      
      <p>Junto com a fé, a comunidade é essencial. Não fomos feitos para enfrentar a vida sozinhos. Ter pessoas ao nosso lado, que nos apoiam, encorajam e caminham conosco, faz toda a diferença.</p>
      
      <p>Se você está passando por um momento difícil, saiba que é temporário. Continue caminhando, um passo de cada vez. A esperança não decepciona.</p>
    `
  },
  {
    id: 7,
    category: "Aconteceu na FJU",
    title: "Acampamento de verão reúne 2 mil jovens",
    excerpt: "Três dias de atividades, louvor e aprendizado marcaram o acampamento de verão da FJU.",
    image: eventImage,
    date: "13 de Janeiro, 2025",
    author: "Redação FJU",
    content: `
      <p>O acampamento de verão da FJU foi um sucesso absoluto, reunindo cerca de 2 mil jovens de diversas cidades em três dias intensos de atividades, louvor, aprendizado e muita integração.</p>
      
      <p>Realizado em um espaço amplo e preparado especialmente para o evento, o acampamento ofereceu uma programação variada que incluiu palestras motivacionais, workshops práticos, momentos de louvor coletivo, atividades esportivas e recreativas.</p>
      
      <p>"Foi uma experiência transformadora. Conheci pessoas incríveis, fortaleci minha fé e saí daqui com muito mais clareza sobre meus propósitos", conta Júlia, 19 anos, participante do acampamento.</p>
      
      <p>Os momentos de louvor foram particularmente marcantes, com bandas jovens liderando adoração sob as estrelas, criando uma atmosfera de conexão espiritual profunda.</p>
      
      <p>A organização do evento contou com o apoio de mais de 200 voluntários, que trabalharam incansavelmente para garantir que todos os participantes tivessem uma experiência segura e memorável.</p>
    `
  },
  {
    id: 8,
    category: "Aconteceu na FJU",
    title: "Maratona solidária arrecada fundos para projeto social",
    excerpt: "Evento esportivo combinou saúde, fé e solidariedade em prol de comunidades necessitadas.",
    image: socialImage,
    date: "09 de Janeiro, 2025",
    author: "Lucas Oliveira",
    content: `
      <p>A primeira Maratona Solidária da FJU foi um evento memorável que uniu esporte, saúde e solidariedade em uma causa nobre. Mais de 500 corredores participaram do evento, que teve como objetivo arrecadar fundos para projetos sociais em comunidades carentes.</p>
      
      <p>Com percursos de 5km e 10km, a maratona percorreu pontos importantes da cidade e contou com o apoio de patrocinadores locais. Cada inscrição contribuiu diretamente para o financiamento de projetos educacionais e de assistência social.</p>
      
      <p>"Poder combinar cuidado com a saúde e solidariedade foi maravilhoso. Corri pelos 10km com muito orgulho de estar contribuindo para uma causa tão importante", comenta Marina, participante da maratona.</p>
      
      <p>Ao final do evento, foram arrecadados mais de R$ 50 mil, que serão destinados a três projetos específicos: aulas de reforço escolar, distribuição de cestas básicas e oficinas profissionalizantes para jovens.</p>
    `
  },
  {
    id: 9,
    category: "Aconteceu na FJU",
    title: "Workshop de liderança capacita novos voluntários",
    excerpt: "Jovens participam de treinamento intensivo para atuar em projetos comunitários.",
    image: cultureImage,
    date: "06 de Janeiro, 2025",
    author: "Fernanda Lima",
    content: `
      <p>A FJU realizou um workshop intensivo de liderança que capacitou 80 novos voluntários para atuarem em diversos projetos comunitários. O treinamento, que durou um final de semana inteiro, abordou temas como liderança servidora, gestão de projetos sociais, comunicação efetiva e trabalho em equipe.</p>
      
      <p>Os participantes tiveram a oportunidade de aprender com líderes experientes, que compartilharam suas vivências e desafios na gestão de projetos sociais.</p>
      
      <p>"O workshop superou minhas expectativas. Aprendi ferramentas práticas que já estou aplicando no meu dia a dia", afirma Gabriel, 22 anos, um dos participantes.</p>
      
      <p>Além das palestras e dinâmicas, o workshop incluiu atividades práticas onde os participantes desenvolveram projetos em grupo, simulando situações reais que enfrentarão em suas atuações voluntárias.</p>
    `
  },
  {
    id: 10,
    category: "Transformação",
    title: "De morador de rua a estudante universitário",
    excerpt: "Trajetória de superação de jovem que encontrou apoio e propósito na FJU.",
    image: transformationImage,
    date: "07 de Janeiro, 2025",
    author: "Carolina Mendes",
    content: `
      <p>A história de Thiago Costa é um testemunho impressionante de superação e recomeço. Aos 24 anos, ele está prestes a concluir o primeiro semestre de Administração em uma universidade pública - uma conquista que parecia impossível há dois anos, quando vivia nas ruas.</p>
      
      <p>"Eu havia perdido tudo: família, emprego, dignidade. Estava vivendo nas ruas quando um grupo de jovens da FJU me abordou e me ofereceu não apenas comida, mas esperança", relembra Thiago.</p>
      
      <p>Com o apoio da comunidade FJU, Thiago conseguiu abrigo temporário, tratamento para suas questões de saúde mental e orientação para retomar os estudos. Ele passou seis meses se preparando para o ENEM enquanto participava de workshops de capacitação profissional.</p>
      
      <p>"Hoje eu não apenas voltei a estudar, mas também ajudo outros jovens que estão passando por dificuldades semelhantes. Minha história é prova de que nunca é tarde para recomeçar", afirma com orgulho.</p>
    `
  },
  {
    id: 11,
    category: "Transformação",
    title: "Família restaurada após anos de conflitos",
    excerpt: "Como a fé e o aconselhamento ajudaram a reconstruir laços familiares.",
    image: reflectionImage,
    date: "05 de Janeiro, 2025",
    author: "Paula Martins",
    content: `
      <p>Quando Beatriz, 26 anos, encontrou a FJU, ela não falava com os pais há quase três anos. Os conflitos familiares haviam se tornado tão intensos que o afastamento parecia a única solução. Mas a história mudou quando ela conheceu o programa de aconselhamento familiar da FJU.</p>
      
      <p>"Eu achava que minha família nunca mais seria a mesma. Os ressentimentos eram profundos e a mágoa parecia impossível de superar", conta Beatriz.</p>
      
      <p>Com o apoio de conselheiros experientes e através de um processo gradual de reconciliação, Beatriz e seus pais começaram a reconstruir sua relação. Foram meses de conversas difíceis, perdão e cura emocional.</p>
      
      <p>"Hoje, três anos depois de começar o aconselhamento, posso dizer que minha família está restaurada. Não apenas voltamos a nos falar, mas construímos uma relação mais saudável e verdadeira do que tínhamos antes", celebra.</p>
    `
  },
  {
    id: 12,
    category: "Transformação",
    title: "Jovem cria ONG para ajudar outros em situação de vulnerabilidade",
    excerpt: "Experiência pessoal de superação inspira projeto social que já ajudou centenas.",
    image: socialImage,
    date: "03 de Janeiro, 2025",
    author: "Ricardo Alves",
    content: `
      <p>Marcela Santos, 27 anos, transformou sua experiência de superação em um projeto que já mudou a vida de mais de 300 pessoas. Após superar um período difícil de sua vida com o apoio da FJU, ela fundou a ONG "Recomeço Possível", focada em ajudar jovens em situação de vulnerabilidade social.</p>
      
      <p>"Eu recebi tanto apoio quando mais precisei que senti a responsabilidade de retribuir de alguma forma. Foi assim que nasceu a ideia da ONG", explica Marcela.</p>
      
      <p>A organização oferece capacitação profissional, apoio psicológico, mentoria e auxílio na busca por emprego. Tudo isso de forma gratuita para jovens entre 16 e 29 anos que estão em situação de vulnerabilidade.</p>
      
      <p>"Ver cada jovem conquistando sua independência, encontrando um emprego ou retomando os estudos é a maior recompensa que poderia ter", afirma Marcela emocionada.</p>
      
      <p>O projeto conta com o apoio de voluntários da FJU e de parceiros locais, e tem planos de expansão para outras cidades em 2025.</p>
    `
  },
  {
    id: 13,
    category: "Cultura",
    title: "Banda jovem lança álbum de louvor contemporâneo",
    excerpt: "Novo trabalho musical une ritmos modernos com mensagens de fé e esperança.",
    image: cultureImage,
    date: "04 de Janeiro, 2025",
    author: "Daniel Costa",
    content: `
      <p>A banda "Nova Geração", formada por cinco jovens integrantes da FJU, acaba de lançar seu primeiro álbum profissional. "Tempos de Renovação" traz 12 faixas que misturam ritmos contemporâneos com letras profundas sobre fé, esperança e transformação.</p>
      
      <p>"Queríamos criar músicas que falassem a linguagem dos jovens de hoje, mas que também trouxessem mensagens poderosas de fé", explica João, vocalista da banda.</p>
      
      <p>O álbum foi produzido de forma independente, com apoio de financiamento coletivo que arrecadou mais de R$ 80 mil. A gravação aconteceu em um estúdio profissional ao longo de seis meses.</p>
      
      <p>As músicas já estão disponíveis nas principais plataformas de streaming e têm recebido excelente aceitação do público. A faixa "Recomeçar" já ultrapassou 100 mil reproduções nas primeiras semanas.</p>
      
      <p>A banda planeja fazer uma turnê de lançamento em diversas cidades, levando sua mensagem de esperança através da música.</p>
    `
  },
  {
    id: 14,
    category: "Cultura",
    title: "Festival de artes celebra criatividade e espiritualidade",
    excerpt: "Evento reúne música, dança, teatro e artes visuais em celebração da cultura jovem.",
    image: eventImage,
    date: "02 de Janeiro, 2025",
    author: "Amanda Silva",
    content: `
      <p>O primeiro Festival de Artes FJU foi um verdadeiro espetáculo de criatividade, fé e expressão cultural. Durante dois dias, jovens artistas de diversas áreas apresentaram seus trabalhos para um público de mais de 3 mil pessoas.</p>
      
      <p>O festival contou com shows musicais, apresentações de dança contemporânea, peças teatrais, exposições de artes visuais e até uma área dedicada à arte urbana, onde grafiteiros criaram murais ao vivo.</p>
      
      <p>"Foi emocionante ver tantos talentos reunidos. A arte é uma forma poderosa de expressar fé e conectar pessoas", comenta Bruna, uma das organizadoras do evento.</p>
      
      <p>Um dos destaques foi a peça teatral "Reconstruindo", que conta a história de jovens que encontraram propósito através da fé e da comunidade. A apresentação emocionou o público e recebeu ovação de pé.</p>
      
      <p>O sucesso do festival já garantiu uma segunda edição para o próximo ano, prometendo ser ainda maior e mais diversificado.</p>
    `
  },
  {
    id: 15,
    category: "Cultura",
    title: "Podcast FJU alcança 100 mil ouvintes",
    excerpt: "Programa semanal discute temas relevantes para a juventude contemporânea.",
    image: reflectionImage,
    date: "01 de Janeiro, 2025",
    author: "Thiago Ribeiro",
    content: `
      <p>O podcast "FJU em Pauta" acaba de alcançar a marca de 100 mil ouvintes mensais, consolidando-se como uma das principais vozes jovens no universo dos podcasts cristãos no Brasil.</p>
      
      <p>Criado há um ano por um grupo de jovens comunicadores da FJU, o programa aborda temas como relacionamentos, carreira, saúde mental, fé e propósito de vida, sempre com uma linguagem autêntica e acessível.</p>
      
      <p>"Nosso objetivo sempre foi criar conversas verdadeiras sobre assuntos que realmente importam para os jovens. Alcançar essa marca mostra que estávamos no caminho certo", celebra Lucas, um dos apresentadores.</p>
      
      <p>O podcast traz entrevistas com pessoas que têm histórias inspiradoras para compartilhar, além de debates sobre temas atuais e dicas práticas para o dia a dia.</p>
      
      <p>Os episódios são lançados semanalmente e estão disponíveis nas principais plataformas de podcast como Spotify, Apple Podcasts e YouTube.</p>
    `
  },
  {
    id: 16,
    category: "Ações Sociais",
    title: "Mutirão de limpeza transforma comunidade",
    excerpt: "Voluntários se unem para revitalizar espaços públicos e promover conscientização ambiental.",
    image: socialImage,
    date: "31 de Dezembro, 2024",
    author: "Juliana Souza",
    content: `
      <p>Em uma ação coordenada que envolveu mais de 150 voluntários da FJU, uma comunidade carente da zona sul da cidade passou por uma verdadeira transformação. O mutirão de limpeza não apenas revitalizou espaços públicos, mas também promoveu conscientização ambiental entre os moradores.</p>
      
      <p>Durante um sábado inteiro, os voluntários trabalharam na coleta de lixo, limpeza de ruas, pintura de muros e plantio de árvores. Foram recolhidas mais de 2 toneladas de resíduos, que foram devidamente encaminhados para reciclagem.</p>
      
      <p>"A mudança foi visível. A comunidade está irreconhecível, muito mais limpa e bonita. Mas o mais importante foi o despertar da consciência ambiental nos moradores", afirma Roberto, coordenador da ação.</p>
      
      <p>Além da limpeza, foram realizadas oficinas educativas sobre reciclagem, compostagem e cuidados com o meio ambiente. As crianças participaram de atividades lúdicas que ensinavam sobre a importância de cuidar do planeta.</p>
      
      <p>A comunidade agora conta com pontos de coleta seletiva e um grupo de moradores comprometidos em manter a área limpa.</p>
    `
  },
  {
    id: 17,
    category: "Ações Sociais",
    title: "Aulas gratuitas de reforço escolar beneficiam 200 crianças",
    excerpt: "Projeto educacional da FJU auxilia estudantes em situação de vulnerabilidade.",
    image: cultureImage,
    date: "29 de Dezembro, 2024",
    author: "Renata Oliveira",
    content: `
      <p>O projeto "Educação que Transforma", desenvolvido pela FJU, está mudando a realidade educacional de 200 crianças em comunidades carentes. As aulas gratuitas de reforço escolar têm ajudado estudantes a superarem dificuldades de aprendizagem e melhorarem significativamente seu desempenho escolar.</p>
      
      <p>O projeto funciona três vezes por semana, com professores voluntários que oferecem aulas de português, matemática e inglês. Além do conteúdo acadêmico, as aulas incluem atividades lúdicas e desenvolvimento de habilidades socioemocionais.</p>
      
      <p>"Meu filho estava com muita dificuldade em matemática e sua autoestima estava baixa. Depois que começou a participar do projeto, suas notas melhoraram muito e ele voltou a gostar de estudar", conta Maria, mãe de um dos alunos.</p>
      
      <p>Os resultados têm sido impressionantes: 85% dos alunos participantes apresentaram melhora nas notas escolares, e muitos desenvolveram maior confiança e motivação para aprender.</p>
      
      <p>O projeto conta com 40 professores voluntários e tem planos de expandir o atendimento para mais 100 crianças ainda este ano.</p>
    `
  },
  {
    id: 18,
    category: "Ações Sociais",
    title: "Campanha do agasalho arrecada 5 mil peças",
    excerpt: "Mobilização solidária leva conforto para pessoas em situação de rua durante o inverno.",
    image: transformationImage,
    date: "27 de Dezembro, 2024",
    author: "Gabriel Ferreira",
    content: `
      <p>A campanha do agasalho promovida pela FJU superou todas as expectativas, arrecadando mais de 5 mil peças de roupas que foram distribuídas para pessoas em situação de rua durante os meses mais frios do ano.</p>
      
      <p>A mobilização durou três meses e contou com pontos de coleta em diversas regiões da cidade. Além de roupas, foram arrecadados cobertores, calçados e itens de higiene pessoal.</p>
      
      <p>"A resposta da comunidade foi emocionante. Pessoas de todas as idades se mobilizaram para doar e ajudar", comenta Patrícia, coordenadora da campanha.</p>
      
      <p>As doações foram cuidadosamente organizadas e higienizadas antes da distribuição. As entregas aconteceram em diversos pontos da cidade onde há concentração de pessoas em situação de rua, sempre acompanhadas de uma refeição quente e palavras de conforto.</p>
      
      <p>"Receber essas doações durante o frio é literalmente receber carinho e dignidade. Vocês não imaginam o quanto isso significa", disse José, 54 anos, um dos beneficiados pela campanha.</p>
    `
  }
];

export const getNewsById = (id: number): NewsArticle | undefined => {
  return allNews.find(news => news.id === id);
};

export const getRelatedNews = (currentId: number, category: string, limit: number = 3): NewsArticle[] => {
  return allNews
    .filter(news => news.id !== currentId && news.category === category)
    .slice(0, limit);
};

export const getDestaques = () => allNews.filter(n => [1, 2, 3].includes(n.id));
export const getVozJovem = () => allNews.filter(n => [4, 5, 6].includes(n.id));
export const getAconteceu = () => allNews.filter(n => [7, 8, 9].includes(n.id));
export const getTransformacao = () => allNews.filter(n => [10, 11, 12].includes(n.id));
export const getCultura = () => allNews.filter(n => [13, 14, 15].includes(n.id));
export const getAcoesSociais = () => allNews.filter(n => [16, 17, 18].includes(n.id));

// Util: converter datas em pt-BR como "15 de Janeiro, 2025" para Date
const meses: Record<string, number> = {
  janeiro: 0,
  fevereiro: 1,
  marco: 2,
  março: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11,
};

const parseDatePT = (s: string): Date => {
  // Ex.: "15 de Janeiro, 2025"
  const norm = s.toLowerCase().replace(/ de /g, " ").replace(/,/g, "").trim();
  // "15 janeiro 2025"
  const [diaStr, mesStr, anoStr] = norm.split(/\s+/);
  const dia = parseInt(diaStr, 10) || 1;
  const mes = meses[mesStr] ?? 0;
  const ano = parseInt(anoStr, 10) || 1970;
  return new Date(ano, mes, dia);
};

export const getAllSortedByDate = (): NewsArticle[] => {
  return [...allNews].sort((a, b) => parseDatePT(b.date).getTime() - parseDatePT(a.date).getTime());
};

export const getMaisLidas = (limit: number = 5): NewsArticle[] => {
  // Sem métrica de leitura, usamos as mais recentes como proxy
  return getAllSortedByDate().slice(0, limit);
};
