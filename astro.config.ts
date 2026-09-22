// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { semIndice, site } from "./src/config";

/**
 * `npm run build`         → domínio do cliente (entrega)
 * `npm run build:preview` → GitHub Pages em subpasta (prévia, com noindex)
 */
const isPreview = process.env.PUBLIC_PREVIEW === "true";
const base = isPreview ? site.preview.base : "";

export default defineConfig({
  site: isPreview ? site.preview.url : site.url,
  base: isPreview ? site.preview.base : undefined,

  // Na prévia não há sitemap: ela é noindex, e com `base` o @astrojs/sitemap
  // ainda emite a rota duplicada (com e sem barra final).
  integrations: isPreview
    ? []
    : [
        sitemap({
          // Mesma fonte de verdade do `noindex` no Base.astro.
          filter: (page) => {
            const route =
              new URL(page).pathname.replace(base, "").replace(/\/$/, "") || "/";
            return !semIndice(route);
          },
        }),
      ],

  // Libera o `astro dev` para túneis do Cloudflare (o subdomínio muda a cada
  // `cloudflared tunnel`; o ponto inicial aceita qualquer um).
  server: {
    allowedHosts: [".trycloudflare.com"],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
