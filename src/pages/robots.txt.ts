import type { APIRoute } from "astro";

/** robots.txt gerado no build, apontando para o sitemap do domínio. */
export const GET: APIRoute = ({ site }) => {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site)}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
