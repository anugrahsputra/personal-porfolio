import { Download, Loader2 } from "lucide-react";
import { Button } from "downormal-ui";

export function PagePair() {
  return (
    <div className="flex flex-wrap gap-3 p-6">
      <Button size="lg">Email me</Button>
      <Button size="lg" variant="outline">
        <Download />
        Download resume
      </Button>
    </div>
  );
}

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button size="sm" variant="outline">Live demo</Button>
      <Button>Contact me</Button>
      <Button size="lg">Send message</Button>
      <Button size="icon" variant="outline" aria-label="Download resume">
        <Download />
      </Button>
    </div>
  );
}

export function States() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Button size="lg" disabled>
        <Loader2 className="animate-spin" aria-hidden />
        Sending...
      </Button>
      <Button size="lg" variant="outline" disabled>
        Try again
      </Button>
    </div>
  );
}
