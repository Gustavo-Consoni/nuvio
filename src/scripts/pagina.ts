/**
 * Roda `iniciar` a cada página exibida.
 *
 * Com o <ClientRouter /> a página não recarrega: um <script> executa uma vez
 * só, e o que ele liga em `window` sobrevive à troca de página. Por isso cada
 * componente se inicia no `astro:page-load` e recebe um `AbortSignal` que é
 * disparado antes da próxima troca. Passe o sinal para `addEventListener` e
 * use-o para limpar timers:
 *
 *   aCadaPagina((signal) => {
 *     window.addEventListener("scroll", fn, { signal });
 *     signal.addEventListener("abort", () => clearInterval(id));
 *   });
 */
export function aCadaPagina(iniciar: (signal: AbortSignal) => void) {
  document.addEventListener("astro:page-load", () => {
    const controle = new AbortController();
    document.addEventListener("astro:before-swap", () => controle.abort(), {
      once: true,
    });

    // A página nova chega sem a `.js` no <html> (o ClientRouter copia os
    // atributos dela). E o `data-pronto` avisa o script inline do <head>
    // que o JavaScript subiu, para ele não desligar a `.js` depois de 3s.
    const html = document.documentElement;
    html.classList.add("js");
    html.dataset.pronto = "";

    iniciar(controle.signal);
  });
}
