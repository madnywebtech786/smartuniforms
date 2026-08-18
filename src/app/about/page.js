import Story from "@/components/sections/about-page/Story";
import Values from "@/components/sections/about-page/Values";
import Capabilities from "@/components/sections/about-page/Capabilities";
import Process from "@/components/sections/about-page/Process";
import Faq from "@/components/sections/about-page/Faq";
import CtaBand from "@/components/sections/cta/CtaBand";

export const metadata = {
  title: "About | Smart Uniform and Embroidery",
  description:
    "25+ years of custom uniform manufacturing and embroidery in Calgary — design, manufacturing, embroidery, and sublimation, all handled in-house.",
};

export default function AboutPage() {
  return (
    <main className="bg-background pt-32 md:pt-40">
      <Story />
      <Values />
      <Capabilities />
      <Process />
      <Faq />
      <CtaBand />
    </main>
  );
}
