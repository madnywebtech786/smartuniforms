import { Phone, Mail } from "lucide-react";
import Container from "@/components/shared/Container";
import FacebookIcon from "@/components/shared/FacebookIcon";

/**
 * Confirmed NAP contact details only (client-business-info.md §2) — same
 * source the footer and Contact section already draw from. Facebook is
 * requested by the client but no page URL is confirmed yet, so it links
 * to "#" as a placeholder until they provide the real one.
 */
export default function TopBar() {
  return (
    <div className="bg-white text-foreground">
      <Container className="flex h-10 items-center justify-between text-sm">
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="tel:+14036290862"
            className="flex items-center gap-2 font-sans font-medium transition-colors hover:text-primary"
          >
            <Phone strokeWidth={1.75} className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">(403) 629-0862</span>
          </a>
          <a
            href="mailto:info@smartuniform.ca"
            className="hidden items-center gap-2 font-sans font-medium transition-colors hover:text-primary sm:flex"
          >
            <Mail strokeWidth={1.75} className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">info@smartuniform.ca</span>
          </a>
        </div>

        <a
          href="#"
          aria-label="Smart Uniform and Embroidery on Facebook"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-white transition-colors hover:bg-primary"
        >
          <FacebookIcon className="h-3.5 w-3.5" />
        </a>
      </Container>
    </div>
  );
}
