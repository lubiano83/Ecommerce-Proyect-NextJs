import Footer from "./components/footer/Footer";
import NavBar from "./components/navbar/NavBar";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen grid grid-rows-[auto_1fr_auto] font-serif">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
