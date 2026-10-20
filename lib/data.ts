import { articlePath, articleTitle } from "@/lib/articles/be-deep-enough";
import type { StaticImageData } from "next/image";
import astraIcon from "@/public/images/projects/astra-icon.webp";

type IntroPart = {
  text: string;
  href?: string;
};

export const intro: IntroPart[][] = [
  [
    {
      text: "I'm a B.Tech CSE student. I learn best by building real things, and I try to keep them simple and useful.",
    },
  ],
  [
    { text: "Right now, I'm working on " },
    { text: "Astra", href: "https://astra-mu-orcin.vercel.app/" },
    {
      text: ", a tool where you draw how work moves through a place and run a simulation to see where people wait.",
    },
  ],
  [
    { text: "I'm mostly active on " },
    { text: "X / Twitter", href: "https://x.com/ridhamvverma" },
    { text: ". That's where I share what I'm building and what I'm learning." },
  ],
];

export type Project = {
  title: string;
  description: string;
  href: string;
  image: string | StaticImageData;
};

export const projects: Project[] = [
  {
    title: "Astra",
    description: "Build process flows, run simulations, and spot where people wait.",
    href: "https://astra-mu-orcin.vercel.app/",
    image: astraIcon,
  },
];

export type Post = { title: string; date?: string; href: string }; // Optional date format: "YYYY-MM-DD"

// Fixed publication date supplied by the author.
export const posts: Post[] = [{ title: articleTitle, href: articlePath, date: "2026-10-20" }];

// Preview only: shown only in development when posts is empty.
export const samplePosts: Post[] = [
  { title: "Sample post title one", date: "2026-10-12", href: "#" },
  { title: "Sample post title two", date: "2026-09-28", href: "#" },
  { title: "Sample post title three", date: "2026-08-15", href: "#" },
];

export const background: string[] = [
  "I'm a B.Tech student studying computer science. I like to learn by building, not just by reading.",
  "My main project so far is Astra. It's a tool where you draw how work moves through a place, like a bank, a hospital, or a restaurant. Then you run a simulation to see where people have to wait. I built it to understand how processes work, and how small changes can make them better.",
  "I'm still learning every day, and I want to keep building things that are simple and useful.",
];

export const links = {
  email: "ridhamvverma@gmail.com",
  x: "https://x.com/ridhamvverma",
  code: "",
};
