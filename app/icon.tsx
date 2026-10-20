import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const boldFont = readFile(join(process.cwd(), "app/fonts/PlusJakartaSans-Bold.ttf"));

export default async function Icon() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", borderRadius: 8, background: "#17181a", color: "#ffffff", fontFamily: "Plus Jakarta Sans", fontSize: 24, fontWeight: 700 }}>
        R
      </div>
    ),
    { ...size, fonts: [{ name: "Plus Jakarta Sans", data: new Uint8Array(await boldFont).buffer, weight: 700, style: "normal" }] },
  );
}
