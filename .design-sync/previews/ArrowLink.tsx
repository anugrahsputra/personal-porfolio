import { ArrowLink } from "downormal-ui";

export function Internal() {
  return (
    <div className="p-6">
      <ArrowLink href="/projects">All 9 projects</ArrowLink>
    </div>
  );
}

export function External() {
  return (
    <div className="p-6">
      <ArrowLink href="https://www.youtube.com/@downormal" external>
        YouTube channel
      </ArrowLink>
    </div>
  );
}

export function BesideHeading() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 p-6">
      <h2 className="type-section">Selected work</h2>
      <ArrowLink href="/projects">All 9 projects</ArrowLink>
    </div>
  );
}
