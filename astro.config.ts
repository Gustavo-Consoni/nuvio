// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { semIndice, site } from "./src/config";

export default defineConfig({
  site: site.url,

  integrations: [
    sitemap({
      // Mesma fonte de verdade do `noindex` no Base.astro.
      filter: (page) => {
        const route = new URL(page).pathname.replace(/\/$/, "") || "/";
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
