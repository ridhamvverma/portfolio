export type Theme = "light" | "dark" | "system";
export const THEME_STORAGE_KEY = "portfolio-theme";
// Runs in the document head before paint; never reads user input as executable code.
export const themeInitScript = `(()=>{let t='system';try{const s=localStorage.getItem('${THEME_STORAGE_KEY}');if(['light','dark','system'].includes(s))t=s}catch{}const d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.style.colorScheme=d?'dark':'light'})()`;
