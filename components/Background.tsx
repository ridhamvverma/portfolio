import { Text } from "@/lib/i18n/language-context";

export function Background() {
  return (
    <section aria-labelledby="background-title" className="section-spacing reveal" style={{ animationDelay: "300ms" }}>
      <h2
        id="background-title"
        className="text-headline-md text-ink"
      >
        <Text id="background" />
      </h2>
      <div className="mt-[16px] flex flex-col gap-[14px] text-left text-body text-muted">
        {(["background1", "background2", "background3"] as const).map(id => (
          <p key={id}><Text id={id} /></p>
        ))}
      </div>
    </section>
  );
}
