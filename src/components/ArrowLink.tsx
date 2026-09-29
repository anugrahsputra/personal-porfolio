import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const className =
  "group inline-flex items-center gap-1.5 rounded-sm text-sm/5 font-medium text-foreground max-md:min-h-11";

export default function ArrowLink({ href, children, external }: ArrowLinkProps) {
  const content = (
    <>
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
      />
      {children}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
