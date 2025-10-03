import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProductContextProvider } from "./context/shopContext";
import { CartContextProvider } from "./context/cartContext";
import { AuthContextProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "full-stack nextjs-sude dev",
  description: "Next.js full-stack eCommerce (frontend + backend)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster />
        <AuthContextProvider>
          <CartContextProvider>
            <ProductContextProvider>
              <ClientLayout>{children}</ClientLayout>
            </ProductContextProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
