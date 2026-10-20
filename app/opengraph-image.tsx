import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Ridham Verma — B.Tech CSE student";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const regularFont = readFile(join(process.cwd(), "app/fonts/PlusJakartaSans-Regular.ttf"));
const boldFont = readFile(join(process.cwd(), "app/fonts/PlusJakartaSans-Bold.ttf"));

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", width: "100%", height: "100%", padding: 80, background: "#ffffff", fontFamily: "Plus Jakarta Sans" }}>
        <div style={{ fontSize: 72, fontWeight: 700, color: "#17181a", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
          Ridham Verma
        </div>
        <div style={{ marginTop: 16, fontSize: 32, fontWeight: 400, color: "#6f7477", lineHeight: 1.4 }}>
          B.Tech CSE student
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Plus Jakarta Sans", data: new Uint8Array(await regularFont).buffer, weight: 400, style: "normal" },
        { name: "Plus Jakarta Sans", data: new Uint8Array(await boldFont).buffer, weight: 700, style: "normal" },
      ],
    },
  );
}
