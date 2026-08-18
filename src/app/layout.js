import { Familjen_Grotesk, Carter_One } from "next/font/google";
import SiteHeader from "@/components/navigation/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";

const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-familjen-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const carterOne = Carter_One({
  variable: "--font-carter-one",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata = {
  title: "Smart Uniform and Embroidery | Custom Uniforms, Calgary",
  description:
    "Smart Uniform and Embroidery designs, manufactures, and embroiders custom uniforms for hospitality, healthcare, retail, and industrial businesses across Calgary.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${familjenGrotesk.variable} ${carterOne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
