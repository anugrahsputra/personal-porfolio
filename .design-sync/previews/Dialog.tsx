import { Lock } from "lucide-react";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "downormal-ui";

export function ProjectDetails() {
  return (
    <Dialog defaultOpen>
      <DialogContent className="max-h-[85svh] overflow-y-auto">
        <DialogHeader className="pr-10 text-left">
          <DialogTitle className="text-2xl/[30px] tracking-[-0.02em]">
            Quraani - Quran Mobile App
          </DialogTitle>
          <DialogDescription className="text-xs/4 text-foreground/60">
            Personal Project · Apr 2024 to May 2024
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm/[22px] text-pretty text-foreground/70">
          Simple and easy-to-use Quran app for Android built with Flutter.
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {["Flutter", "Dio", "Bloc", "SQLite"].map((tech) => (
            <li key={tech}>
              <Badge variant="secondary">{tech}</Badge>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2 pt-1">
          <Button variant="outline" size="sm">
            Releases
          </Button>
          <Button variant="ghost" size="sm">
            Source
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function UnderNda() {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader className="pr-10 text-left">
          <DialogTitle className="text-2xl/[30px] tracking-[-0.02em]">
            Cosmic App KIOSK Touchscreen
          </DialogTitle>
          <DialogDescription className="text-xs/4 text-foreground/60">
            PT. Semesta Arus Teknologi · Oct 2024 to Feb 2025
          </DialogDescription>
        </DialogHeader>
        <p className="flex gap-2 text-sm/[22px] text-foreground">
          <Lock className="mt-0.5 size-4 shrink-0" aria-hidden />
          This project is under an NDA, so I can&apos;t share its source code or
          screenshots.
        </p>
        <p className="text-sm/[22px] text-pretty text-foreground/70">
          Interactive KIOSK information display app for DPR RI built with
          Kotlin and Jetpack Compose. Developed automated power-scheduling and
          WebView reset mechanisms for reliable unattended operation.
        </p>
      </DialogContent>
    </Dialog>
  );
}
