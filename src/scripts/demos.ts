/**
 * Comportamentos que os sites demo (src/pages/demos/<nome>/index.astro)
 * repetem. Cada função recebe o `signal` do aCadaPagina() e se desliga
 * sozinha na troca de página.
 */

export const semMovimento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

export const emailValido = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

/** Espera `ms`, mas desiste se a página for trocada no meio. */
export const esperar = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal.addEventListener("abort", () => (clearTimeout(id), reject(signal.reason)), { once: true });
  });

/**
 * Liga `data-rolou` nos elementos quando a página desce 40px (o cabeçalho
 * ganha fundo). `extra` roda junto a cada rolagem.
 */
export function rolagem(elementos: Iterable<Element>, signal: AbortSignal, extra?: () => void) {
  const lista = [...elementos];
  const aoRolar = () => {
    const rolou = window.scrollY > 40;
    lista.forEach((el) => el.toggleAttribute("data-rolou", rolou));
    extra?.();
  };
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true, signal });
}

/**
 * Botão que abre e fecha o painel apontado pelo seu `aria-controls`: alterna
 * `aria-expanded` no botão e `data-aberto` no painel (o visual sai do CSS,
 * ver .recolhe em src/styles/demos/comum.css). Fechado, o painel fica
 * `inert`. Devolve a função que abre ou fecha, para quem precisar.
 */
export function alternar(
  botao: HTMLElement,
  signal: AbortSignal,
  { fecharAcimaDe, aoMudar }: { fecharAcimaDe?: number; aoMudar?: (aberto: boolean) => void } = {},
) {
  const painel = document.getElementById(botao.getAttribute("aria-controls") ?? "");
  if (!painel) return () => {};
  const rotulo = botao.getAttribute("aria-label");

  const abrir = (aberto: boolean) => {
    botao.setAttribute("aria-expanded", String(aberto));
    if (rotulo) botao.setAttribute("aria-label", aberto ? rotulo.replace("Abrir", "Fechar") : rotulo);
    painel.toggleAttribute("data-aberto", aberto);
    painel.inert = !aberto;
    aoMudar?.(aberto);
  };
  abrir(false);

  botao.addEventListener("click", () => abrir(botao.getAttribute("aria-expanded") !== "true"), { signal });
  if (fecharAcimaDe) {
    window.addEventListener("resize", () => window.innerWidth >= fecharAcimaDe && abrir(false), { signal });
  }
  return abrir;
}

/**
 * Menu mobile: um alternar() em que clicar num link do painel fecha o menu.
 * Some sozinho a partir de `fecharAcimaDe` px, onde a nav normal aparece.
 */
export function menu(signal: AbortSignal, fecharAcimaDe: number, aoMudar?: (aberto: boolean) => void) {
  const botao = document.querySelector<HTMLElement>("[data-menu-botao]");
  if (!botao) return;
  const abrir = alternar(botao, signal, { fecharAcimaDe, aoMudar });
  document
    .getElementById(botao.getAttribute("aria-controls") ?? "")
    ?.querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", () => abrir(false), { signal }));
}

/**
 * Entrada ao rolar: põe `.rv-in` em cada `[data-revelar]` quando ele aparece
 * na tela (o estado escondido é `.js .rv` no CSS da demo). Opcionais:
 * `data-atraso` em ms, para escalonar vizinhos, e `data-margem`, o
 * rootMargin do observador (ex.: "-10%" só revela já dentro da tela).
 */
export function revelar(signal: AbortSignal) {
  const timers: ReturnType<typeof setTimeout>[] = [];
  const observadores = new Map<string, IntersectionObserver>();

  document.querySelectorAll<HTMLElement>("[data-revelar]").forEach((el) => {
    const margem = el.dataset.margem ?? "0px";
    let olho = observadores.get(margem);
    if (!olho) {
      olho = new IntersectionObserver(
        (entradas, o) => {
          entradas.forEach((e) => {
            if (!e.isIntersecting) return;
            o.unobserve(e.target);
            const atraso = Number((e.target as HTMLElement).dataset.atraso ?? 0);
            timers.push(setTimeout(() => e.target.classList.add("rv-in"), atraso));
          });
        },
        { rootMargin: margem },
      );
      observadores.set(margem, olho);
    }
    olho.observe(el);
  });

  signal.addEventListener("abort", () => {
    observadores.forEach((o) => o.disconnect());
    timers.forEach(clearTimeout);
  });
}

/**
 * Conta de zero até o número escrito em cada `[data-contar]` quando ele
 * aparece. O valor final já está no HTML: sem JavaScript, ou com
 * movimento reduzido, o visitante lê o número certo. Aceita decimal e
 * sufixo ("4.9", "12k").
 */
export function contar(signal: AbortSignal) {
  const numeros = document.querySelectorAll<HTMLElement>("[data-contar]");
  if (!numeros.length || semMovimento()) return;

  const conta = (el: HTMLElement) => {
    const original = el.textContent?.trim() ?? "";
    const m = original.match(/^([\d.,]+)(.*)$/);
    if (!m) return;
    const alvo = parseFloat(m[1].replace(",", "."));
    if (!isFinite(alvo)) return;
    const casas = (m[1].split(/[.,]/)[1] || "").length;
    const separador = m[1].includes(",") ? "," : ".";
    const inicio = performance.now();
    const passo = (agora: number) => {
      if (signal.aborted) return;
      const t = Math.min((agora - inicio) / 1500, 1);
      const v = alvo * (1 - Math.pow(1 - t, 3)); // desacelera no fim
      el.textContent = t < 1 ? v.toFixed(casas).replace(".", separador) + m[2] : original;
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  const olho = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        olho.unobserve(e.target);
        conta(e.target as HTMLElement);
      });
    },
    { threshold: 0.5 },
  );
  numeros.forEach((n) => olho.observe(n));
  signal.addEventListener("abort", () => olho.disconnect());
}

/**
 * Paralaxe: desloca `el` em `fator` da rolagem enquanto o topo da página
 * está na tela. Escreve em `translate`, e não em `transform`, para não
 * apagar um `scale` de animação de entrada.
 */
export function paralaxe(el: HTMLElement | null, fator: number, signal: AbortSignal) {
  if (!el || semMovimento()) return;
  const aoRolar = () => {
    if (window.scrollY <= window.innerHeight) el.style.translate = `0 ${window.scrollY * fator}px`;
  };
  window.addEventListener("scroll", aoRolar, { passive: true, signal });
}

/** Telefone no formato (11) 99999-9999 conforme a pessoa digita. */
export function mascaraTelefone(valor: string) {
  const v = valor.replace(/\D/g, "").slice(0, 11);
  if (v.length > 6) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  if (v.length > 0) return `(${v}`;
  return "";
}
