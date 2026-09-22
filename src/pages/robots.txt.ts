import type { APIRoute } from "astro";

/**
 * robots.txt gerado no build. Na prévia do GitHub Pages bloqueia tudo, para a
 * prévia não concorrer com o site final do cliente nos buscadores.
 */
export const GET: APIRoute = ({ site }) => {
  const isPreview = import.meta.env.PUBLIC_PREVIEW === "true";

  const body = isPreview
    ? `User-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
