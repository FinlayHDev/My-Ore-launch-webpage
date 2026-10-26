// To revert to the original Hopper, import "@/assets/hopper-dark.svg.asset.json" here instead.
import hopperDark from "@/assets/hopper-v2.svg.asset.json";
import hopperLight from "@/assets/hopper-light.svg.asset.json";
import { cn } from "@/lib/utils";

/** Hopper, the My Ore mascot. `tone="dark"` = black cart for light backgrounds. */
export function Hopper({
  tone = "dark",
  className,
  alt = "",
}: {
  tone?: "dark" | "light";
  className?: string;
  alt?: string;
}) {
  return (
    <img
      src={tone === "dark" ? hopperDark.url : hopperLight.url}
      alt={alt}
      draggable={false}
      className={cn("select-none", className)}
    />
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <Hopper className="h-8 w-auto shrink-0" alt="" />
      <span className="font-display text-lg font-bold tracking-[0.2em]">MY ORE</span>
    </span>
  );
}
