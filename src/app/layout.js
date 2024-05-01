import { Comfortaa } from "next/font/google";
import "./globals.css";
import ProductProvider from "@/components/Context";

const comfortaa = Comfortaa({ subsets: ["cyrillic"] });

export const metadata = {
  title: "Поле",
  description: "Творці: група ФМН-4 2024 року випуску. Розробник: Зінець Вячеслав",
};

export default function RootLayout({ children }) {
  return (
    <ProductProvider>
    <html lang="uk">
      <body className={comfortaa.className}>{children}</body>
    </html>
    </ProductProvider>
  );
}
