"use client";

import { useId } from "react";

// Manu's separator: a 4px SVG strip with 1px dots repeating every 6px.
export function DottedSeparator() {
  const id = useId().replace(/:/g, "");
  return (
    <div aria-hidden="true" className="w-full shrink-0 [contain:inline-size]">
      <svg className="pointer-events-none relative block w-full text-neutral-400 opacity-40" style={{ height: 4 }} preserveAspectRatio="none">
        <defs>
          <pattern id={id} width={6} height={4} patternUnits="userSpaceOnUse">
            <circle cx={3} cy={2} r={1} fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
