import Link from "next/link";

import SectionLabel from "@/components/SectionLabel";
import { RevealLine } from "@/components/motion";
import { NAV_ITEMS } from "@/components/layout/navItems";
import { CONTACT_EMAIL, YOUTUBE_CHANNEL_URL } from "@/lib/site";

const EXTERNAL_LINKS = [
  { name: "GitHub", href: "https://github.com/anugrahsputra" },
  { name: "LinkedIn", href: "https://linkedin.com/in/anugrahsputra" },
  { name: "YouTube", href: YOUTUBE_CHANNEL_URL },
  { name: "Email", href: `mailto:${CONTACT_EMAIL}` },
];

const linkClass =
  "inline-block rounded-sm py-1 text-base/6 font-medium tracking-[-0.01em] text-foreground/70 transition-colors hover:text-foreground";

export default function Footer() {
  return (
    <footer className="page-container pt-10 pb-14">
      <RevealLine />
      <div className="grid gap-10 pt-6 md:grid-cols-2 md:gap-x-[clamp(2rem,4vw,4rem)]">
        <p className="text-sm/5 font-medium">
          © {new Date().getFullYear()} Anugrah Surya Putra
        </p>

        <div className="grid grid-cols-2 gap-8">
          <nav aria-label="Pages">
            <SectionLabel as="p" className="mb-4">
              Pages
            </SectionLabel>
            <ul>
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={linkClass}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Elsewhere">
            <SectionLabel as="p" className="mb-4">
              Elsewhere
            </SectionLabel>
            <ul>
              {EXTERNAL_LINKS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={linkClass}
                    {...(item.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
