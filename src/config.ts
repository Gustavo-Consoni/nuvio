/**
 * Configuração do site. É o único arquivo a editar ao iniciar um cliente novo
 * (além de trocar os favicons em `public/`).
 */
export const site = {
  /** Nome da marca. Aparece no <title> e no og:site_name. */
  name: "Nuvio Studio",

  /** Descrição padrão, usada quando a página não informa a sua. */
  description:
    "Seu negócio achado no Google, escolhido pelo celular e bem avaliado no balcão. Perfil no Google, página de links, cartão e plaquinha de aproximação e site, com a cara da sua marca e preço fechado.",

  /** Idioma do conteúdo. */
  locale: "pt-BR",

  /** Imagem de compartilhamento padrão, dentro de `public/`. Deve ser 1200x630. */
  ogImage: "/og-image.png",

  /** Texto alternativo da imagem de compartilhamento. */
  ogImageAlt: "Nuvio Studio",

  /** Cor da barra do navegador no mobile. */
  themeColor: "#05060b",

  /**
   * Folha do Google Fonts carregada em todas as páginas. `null` desliga.
   * A família precisa bater com `--font-sans` no `global.css`.
   */
  googleFonts:
    "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" as
      | string
      | null,

  /** Contato exibido no site (formulário, rodapé, botão flutuante). */
  contact: {
    email: "nuviostudio721@gmail.com",
    /** Só dígitos, com DDI: é o que o wa.me espera. */
    whatsapp: "5513991131555",
    /** Como o número aparece escrito na página. */
    phoneDisplay: "(13) 99113-1555",
    /** Mensagem que já vem digitada ao abrir o WhatsApp pelo botão flutuante. */
    whatsappMessage: "Olá! Vim pelo site da Nuvio e quero saber mais.",
  },

  /** Redes sociais do rodapé. `href: "#"` enquanto não houver perfil real. */
  socials: [
    { name: "Instagram", href: "https://www.instagram.com/nuviostudio.br" },
    { name: "TikTok", href: "#" },
  ] as { name: "Instagram" | "TikTok"; href: string }[],

  /**
   * Rotas que não devem ser indexadas.
   * Fonte única: o Base.astro marca `noindex` e o sitemap exclui a rota,
   * evitando o sinal contraditório de "noindex na página, indexe no sitemap".
   *
   * Termine com `/*` para valer para a rota e tudo abaixo dela.
   *
   * `/demos/*` são negócios fictícios.
   */
  noindexPaths: ["/demos/*"] as string[],

  /** Domínio do site (canonical, Open Graph, sitemap e robots.txt). */
  url: "https://nuviostudio.com.br",
} as const;

/**
 * Diz se a rota (sem barra final, ex.: "/demos/barbearia/cortes") está em
 * `site.noindexPaths`. Usada pelo Base.astro e pelo filtro do sitemap.
 */
export function semIndice(rota: string) {
  return site.noindexPaths.some((p) =>
    p.endsWith("/*") ? rota === p.slice(0, -2) || rota.startsWith(p.slice(0, -1)) : rota === p,
  );
}
