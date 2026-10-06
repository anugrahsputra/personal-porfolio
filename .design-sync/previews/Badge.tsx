import { Lock } from "lucide-react";
import { Badge } from "downormal-ui";

export function TechStack() {
  return (
    <ul className="flex flex-wrap gap-1.5 p-6" aria-label="Tech stack">
      {["Dart", "Kotlin", "Go", "Flutter", "Compose Multiplatform", "Jetpack Compose"].map((tech) => (
        <li key={tech}>
          <Badge variant="secondary">{tech}</Badge>
        </li>
      ))}
    </ul>
  );
}

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-6">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}

export function UnderNda() {
  return (
    <div className="p-6">
      <Badge variant="outline">
        <Lock />
        Under NDA
      </Badge>
    </div>
  );
}
