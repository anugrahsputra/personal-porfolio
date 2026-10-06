import { Lock } from "lucide-react";
import { Badge, MotionGlobalConfig, RevealImage } from "downormal-ui";

if (navigator.webdriver) MotionGlobalConfig.instantAnimations = true;

export function ProjectMedia() {
  return (
    <div className="max-w-xl p-6">
      <span className="relative block aspect-[16/10] overflow-hidden rounded-md bg-card">
        <RevealImage className="absolute inset-0">
          <span className="absolute inset-0 flex flex-col justify-between rounded-md border p-[clamp(1.25rem,2.5vw,2rem)]">
            <Badge variant="outline" className="self-start">
              <Lock />
              Under NDA
            </Badge>
            <span className="line-clamp-4 max-w-[28ch] text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.25] tracking-[-0.02em] text-foreground/90">
              Interactive KIOSK information display app for DPR RI built with
              Kotlin and Jetpack Compose.
            </span>
          </span>
        </RevealImage>
      </span>
      <span className="mt-3 flex items-baseline gap-2">
        <span className="text-xs/4 text-foreground/60">01</span>
        <span className="text-[clamp(1.125rem,1.4vw,1.375rem)] leading-tight tracking-[-0.02em]">
          Cosmic App KIOSK Touchscreen
        </span>
      </span>
      <span className="mt-1 block text-sm/5 text-foreground/60">
        Oct 2024 to Feb 2025 · Kotlin, Jetpack Compose, Android
      </span>
    </div>
  );
}
