"use client";

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { encode } from "qss";
import { useState, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/language-context";

type LinkPreviewProps = {
  children: ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
} & Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target" | "rel" | "title" | "aria-label"> & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
  ...linkProps
}: LinkPreviewProps) => {
  const { t } = useLanguage();
  const linkName = typeof children === "string" ? children : url;
  const src = isStatic
    ? imageSrc
    : `https://api.microlink.io/?${encode({
        url,
        screenshot: true,
        meta: false,
        embed: "screenshot.url",
        colorScheme: "dark",
        "viewport.isMobile": true,
        "viewport.deviceScaleFactor": 1,
        "viewport.width": width * 3,
        "viewport.height": height * 3,
      })}`;
  const [isOpen, setOpen] = useState(false);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetFromCenter = (offsetX - rect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <HoverCardPrimitive.Root
      open={isOpen}
      openDelay={50}
      closeDelay={100}
      onOpenChange={setOpen}
    >
      <HoverCardPrimitive.Trigger
        {...linkProps}
        href={url}
        className={cn("text-black dark:text-white", className)}
        onMouseMove={handleMouseMove}
        onFocus={(event) => {
          // Keep keyboard previews without opening one on touch-generated focus.
          if (!event.currentTarget.matches(":focus-visible")) event.preventDefault();
        }}
        onTouchStartCapture={(event) => {
          // Radix otherwise prevents touchstart, interrupting single-tap navigation.
          event.stopPropagation();
        }}
      >
        {children}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal forceMount>
        {/* Presence owns removal so Radix cannot cut off the original exit motion. */}
        <AnimatePresence>
          {isOpen && (
            <HoverCardPrimitive.Content
              key="preview"
              forceMount
              side="top"
              align="center"
              sideOffset={10}
              collisionPadding={16}
              className="z-50 [transform-origin:var(--radix-hover-card-content-transform-origin)]"
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 260, damping: 20 },
                }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.6 }}
                transition={reduceMotion ? { duration: 0 } : undefined}
                className="shadow-xl rounded-xl"
                style={{ x: reduceMotion ? 0 : translateX }}
              >
                <a
                  href={url}
                  {...linkProps}
                  aria-label={t("openLink", {name: linkName})}
                  className="block p-1 bg-surface border-2 border-transparent shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                >
                  {failedSrc === src ? (
                    <span
                      role="status"
                      className="flex items-center justify-center rounded-lg px-3 text-center font-sans text-[13px] leading-[1.5] font-normal text-muted"
                      style={{ width, height }}
                    >
                      {t("previewUnavailable")}
                    </span>
                  ) : (
                    <img
                      src={src}
                      width={width}
                      height={height}
                      className="rounded-lg"
                      alt={t("previewAlt", {name: linkName})}
                      decoding="async"
                      onError={() => setFailedSrc(src)}
                    />
                  )}
                </a>
              </motion.div>
            </HoverCardPrimitive.Content>
          )}
        </AnimatePresence>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
};
