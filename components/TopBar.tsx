import Clock from "@/components/Clock";
import { Text } from "@/lib/i18n/language-context";
import { HeaderControls } from "./HeaderControls";

export function TopBar() {
  return (
    <header className="top-bar text-muted reveal" style={{ animationDelay: "0ms" }}>
      <div className="location-time">
        <span><Text id="location" /></span>
        <span className="time-separator">/</span>
        <span className="local-time"><Clock /></span>
      </div>
      <HeaderControls />
    </header>
  );
}
