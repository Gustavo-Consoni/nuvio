/* SpacePro: só comportamento. Todo o conteúdo está no index.html. */
document.addEventListener('alpine:init', () => {
  Alpine.data('space', () => ({
    menu: false,
    scrolled: false,
    ciclo: 'mensal',   // 'mensal' | 'trimestral'
    aberta: null,      // índice da pergunta aberta no FAQ; null fecha todas

    init() {
      this.onScroll();
      window.addEventListener('scroll', () => this.onScroll(), { passive: true });
      window.addEventListener('resize', () => { if (innerWidth >= 1024) this.menu = false; });
    },
    onScroll() { this.scrolled = scrollY > 40; },

    // Os dois preços vêm do HTML, onde o conteúdo mora. Calcular o trimestral
    // como uma porcentagem do mensal dava número quebrado (R$ 39,92).
    preco(mensal, trimestral) {
      const v = this.ciclo === 'mensal' ? mensal : trimestral;
      return 'R$ ' + v.toFixed(2).replace('.', ',');
    },

    alterna(i) { this.aberta = this.aberta === i ? null : i; },
  }));
});
