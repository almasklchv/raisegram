import '../styles/globals.css'
import 'normalize.css'
import Header from "../components/Header";
import Footer from "../components/Footer";



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="root">
        <div className="centralizer">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
