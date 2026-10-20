import { Text } from "@/lib/i18n/language-context";
import { SelectionFrame } from "@/components/SelectionFrame";
import { Avatar } from "@/components/Avatar";
import { CreativeToggle } from "@/components/CreativeToggle";
import { PterosaurAnimation } from "@/components/PterosaurAnimation";

export function Hero() {
  return (
    <section aria-labelledby="hero-name" className="reveal" style={{ animationDelay: "60ms", position: "relative" }}>
      <PterosaurAnimation />
      <div className="flex flex-col items-start gap-[24px] min-[520px]:flex-row min-[520px]:items-end min-[520px]:justify-between">
        <Avatar />
        <div className="hero-controls flex min-w-0 items-end gap-[8px]">
          <CreativeToggle />
          <div className="hero-message flex min-w-0 flex-col items-center gap-[10px]">
            <p className="w-0 min-w-full min-h-[36px] content-end text-right text-[11px] leading-[1.5] font-normal tracking-normal whitespace-normal wrap-break-word text-muted min-[520px]:min-h-[39px]">
              <Text id="caption1" /><br />
              <Text id="caption2" />
            </p>
            <a
              href="#contact"
              data-selection-active="true"
              className="selection-target send-message inline-flex h-[44px] shrink-0 items-center justify-center gap-[8px] rounded-[8px] border border-border bg-surface px-[16px] text-label leading-[1.5] font-medium whitespace-nowrap text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Text id="send" />
              <svg
                aria-hidden="true"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
              <SelectionFrame />
            </a>
          </div>
        </div>
      </div>
      <h1
        id="hero-name"
        className="mt-[16px] text-display text-ink"
      >
        Ridham Verma
      </h1>
    </section>
  );
}
