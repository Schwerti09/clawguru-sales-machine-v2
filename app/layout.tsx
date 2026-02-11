import "./globals.css";
import { Nav } from "@/components/Nav";

export const metadata = {
  title: "ClawGuru — Runbooks that ship",
  description: "SEO + Security runbooks, checks, and templates. Built for speed."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Nav />
          <div style={{ height: 16 }} />
          {children}
          <div className="footer">
            <div className="hr" />
            <div>© {new Date().getFullYear()} ClawGuru. Transparent affiliate links on /offers.</div>
          </div>
        </div>
      </body>
    </html>
  );
}
