import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  as?: "h2" | "h3" | "p";
  className?: string;
}

// "[ Label ]". The brackets are decoration, so screen readers skip them.
export default function SectionLabel({
  children,
  as: Tag = "h2",
  className,
}: SectionLabelProps) {
  return (
    <Tag className={cn("text-sm/5", className)}>
      <span aria-hidden className="text-foreground/60">
        [{" "}
      </span>
      {children}
      <span aria-hidden className="text-foreground/60">
        {" "}]
      </span>
    </Tag>
  );
}
