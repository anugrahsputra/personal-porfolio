import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm/5 text-foreground/60">
        <li>
          <Link
            href="/"
            className="rounded-sm transition-colors hover:text-foreground"
          >
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" aria-hidden />
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="rounded-sm transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={item.current ? "text-foreground" : undefined}
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
