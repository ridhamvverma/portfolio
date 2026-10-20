# Ridham Verma

A one-page portfolio built with Next.js App Router, TypeScript, Tailwind CSS, and Geist Sans.

## Run locally

```sh
npm install
npm run dev
```

Open `http://localhost:3000`.

## Edit content and images

- Add posts to the `posts` array in `lib/data.ts`, with `title`, an ISO date (`YYYY-MM-DD`), and `href`. Posts sort newest first. Sample posts appear only in development when the array is empty; production shows the empty state.
- Replace the portrait at `public/images/portrait.webp` with a square 1200×1200 image. The avatar shows RV when the file is absent. Restart development or rebuild after adding it.
- Add the Astra preview at `public/images/astra.webp`. Without it, the project shows the flow icon. Restart development or rebuild after adding it.
- Other section text and project information are also in `lib/data.ts`.

## Site URL

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your full deployment URL, without a trailing path. It controls canonical, sitemap, robots, and sharing URLs. The fallback is `http://localhost:3000`. Restart or rebuild after changing it.

## Checks and production

```sh
npm run lint
npx tsc --noEmit
npm run build
npm start
```

The lint command uses the installed TypeScript compiler to check unused declarations, unreachable code, unused labels, and switch fallthrough, alongside type checking; no lint library is added.

## Deploy to Vercel

Push the project to a Git repository and import it into Vercel. Select the Next.js preset, use `npm run build`, and keep the default output settings. Set `NEXT_PUBLIC_SITE_URL` in the Vercel project's environment variables to the final public URL, then deploy (or redeploy after changing it).
