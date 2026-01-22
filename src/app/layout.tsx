import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getContactSettings } from "@/lib/api";

// Using Inter as a premium, standard font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SISCO360 | Sistemas de Seguridad en Nicaragua",
  description: "Líder en cámaras de seguridad y vigilancia en Nicaragua.",
  icons: {
    icon: '/images/centro_sisco360.svg',
    shortcut: '/images/centro_sisco360.svg',
    apple: '/images/centro_sisco360.svg',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContactSettings();

  return (
    <html lang="es">
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </head>
      <body className={inter.className}>
        <Navbar contact={contact} />
        <main style={{ minHeight: '80vh' }}>{children}</main>
        <Footer contact={contact} />
        <script dangerouslySetInnerHTML={{
          __html: `
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        `}} />
      </body>
    </html>
  );
}
