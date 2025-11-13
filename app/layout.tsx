import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "FJU - Força Jovem Universal",
  description:
    "Blog oficial da Força Jovem Universal. Notícias, histórias de transformação, cultura e ações sociais para jovens que buscam propósito e superação.",
  openGraph: {
    title: "Blog FJU - Força Jovem Universal",
    description:
      "Notícias, histórias de transformação e conteúdo inspirador para jovens que buscam propósito",
    type: "website",
    images: [
      {
        url: "https://portalwp.s3.amazonaws.com/wp-content/uploads/2020/08/20145815/for%C3%A7a-jovem-universal1.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@oficialfju",
    images: ["https://portalwp.s3.amazonaws.com/wp-content/uploads/2020/08/20145815/for%C3%A7a-jovem-universal1.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
