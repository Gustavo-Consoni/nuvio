/**
 * Textos por segmento. Cada nicho vira uma página própria (ex.: /barbearia)
 * que reaproveita a landing inteira e troca só o texto do topo.
 *
 * Para criar um segmento novo: copie o bloco da barbearia, reescreva os
 * textos e crie `src/pages/<segmento>.astro` igual ao `barbearia.astro`.
 */
import type { Conteudo } from "./landing";

export interface Nicho extends Conteudo {
  /** <title> e descrição da página do segmento. */
  title: string;
  description: string;
}

export const barbearia: Nicho = {
  title: "Para barbearias",
  description:
    "Google Meu Negócio, linktree customizado, cardápio de cortes, plaquinha de avaliação e cartão de aproximação com a cara da sua barbearia.",

  hero: {
    selo: "Para barbearias",
    titulo: { antes: "O cliente", destaque: "acha, escolhe o corte e te avalia", depois: " sem você largar a tesoura." },
    texto:
      "Sua barbearia aparece no Maps para quem procura por perto, o cliente escolhe o corte pelo celular enquanto espera e, na saída, te avalia com um toque. Mais avaliações e menos pergunta de preço no direct.",
  },
};
