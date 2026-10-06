import { ArrowLink, SectionLabel } from "downormal-ui";

export function Heading() {
  return (
    <div className="p-6">
      <SectionLabel>About</SectionLabel>
    </div>
  );
}

export function WithLink() {
  return (
    <div className="flex flex-col items-start gap-3 p-6">
      <SectionLabel>Experience</SectionLabel>
      <ArrowLink href="/experience">Full experience</ArrowLink>
    </div>
  );
}

export function ColumnHeads() {
  return (
    <div className="grid grid-cols-3 gap-6 border-b p-6 pb-4">
      <SectionLabel as="p">Name</SectionLabel>
      <SectionLabel as="p">Detail</SectionLabel>
      <SectionLabel as="p" className="text-right">
        Date
      </SectionLabel>
    </div>
  );
}
