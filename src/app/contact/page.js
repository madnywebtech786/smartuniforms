import Contact from "@/components/sections/contact/Contact";

export const metadata = {
  title: "Contact | Smart Uniform and Embroidery",
  description:
    "Get in touch with Smart Uniform and Embroidery — call, email, or send over what your team needs and we'll follow up with a quote.",
};

export default function ContactPage() {
  return (
    <main className="bg-background pt-32 md:pt-40">
      <Contact headingLevel="h1" />
    </main>
  );
}
