import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Projects } from "@/components/Projects";
import { Writing } from "@/components/Writing";
import { Background } from "@/components/Background";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { DottedDivider } from "@/components/DottedDivider";
import { CreativeAnnotations } from "@/components/CreativeAnnotations";
import { ScrollReveal, type RevealGroup } from "@/components/ScrollReveal";
import styles from "./home-entrance.module.css";

const reveals: readonly RevealGroup[] = [
  { id: "projects", trigger: "#projects-title", items: [
    { selector: "#projects-title", delay: 0 },
    { selector: '[aria-labelledby="projects-title"] li', delay: 140 },
  ] },
  { id: "writing", trigger: "#writing-title", items: [
    { selector: "#writing-title", delay: 0 },
    { selector: "#writing li", delay: 140 },
  ] },
  { id: "background", trigger: "#background-title", items: [
    { selector: "#background-title", delay: 0 },
    { selector: '[aria-labelledby="background-title"] p', delay: 0, lines: true },
  ] },
  { id: "contact", trigger: "#contact-title", items: [
    { selector: "#contact-title", delay: 0 },
    { selector: "#contact > p", delay: 90, lines: true },
    { selector: "#contact > button", delay: 180 },
    { selector: "#contact > div", delay: 270 },
  ] },
  { id: "footer", trigger: "footer > p:nth-of-type(1)", distance: 10, duration: 550, items: [
    { selector: "footer > p:nth-of-type(1)", delay: 0 },
    { selector: "footer > p:nth-of-type(2)", delay: 110 },
  ] },
  // The image keeps its visual position, but its own viewport-ready phase is
  // released only after both footer text animations report completion.
  { id: "signature", trigger: "footer > img", followPrevious: true, distance: 10, duration: 550, items: [
    { selector: "footer > img", delay: 0 },
  ] },
];

export default function Home() {
  return (
    <div className={`page-shell min-h-screen ${styles.page}`}>
      <ScrollReveal groups={reveals} />
      <div className="page-container">
        <TopBar />
        <main id="main" tabIndex={-1} className="relative isolate">
          <CreativeAnnotations />
          <Hero />
          <Intro />
          <DottedDivider />
          <Projects />
          <DottedDivider />
          <Writing />
          <DottedDivider />
          <Background />
          <DottedDivider />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
