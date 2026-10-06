import { Breadcrumbs } from "downormal-ui";

export function CurrentPage() {
  return (
    <div className="p-6">
      <Breadcrumbs items={[{ label: "Projects", current: true }]} />
    </div>
  );
}

export function Nested() {
  return (
    <div className="p-6">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/projects" },
          { label: "Quraani", current: true },
        ]}
      />
    </div>
  );
}
