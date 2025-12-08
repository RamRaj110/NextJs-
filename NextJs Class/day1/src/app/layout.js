
import Footer from "./contact/Footer";
import Navbar from "./contact/Navbar";
import "./globals.css";

export const metadata = {
  title: "This is NextJs class",
  description: "All about learning nextJs 16",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      >
        <Navbar />
        <div className="min-h-[80vh]">
        {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
