/* Mesa Farta: só comportamento. Todo o conteúdo está no index.html. */
document.addEventListener('alpine:init', () => {
  Alpine.data('mesa', () => ({
    menu: false,
    busca: false,
    termo: '',         // filtro da busca do topo
    vazio: false,      // a busca não achou nenhuma receita?
    cozinha: 0,        // item selecionado em "Sabores do mundo"
    email: '',
    erro: '',
    inscrito: false,

    temFolga: false,   // o trilho tem mais conteúdo do que largura?

    init() {
      window.addEventListener('resize', () => {
        if (innerWidth >= 1024) this.menu = false;
        this.medirTrilho();
      });
      // espera as imagens assentarem antes de medir
      setTimeout(() => this.medirTrilho(), 400);
      window.addEventListener('load', () => this.medirTrilho());
      this.$watch('termo', () => this.$nextTick(() => this.medirVazio()));
    },

    alternarBusca() {
      this.busca = !this.busca;
      if (this.busca) this.$nextTick(() => this.$refs.termo?.focus());
      else this.termo = '';
    },

    fecharBusca() {
      this.busca = false;
      this.termo = '';
    },

    // Filtro das receitas. Lê o texto do próprio card em vez de repetir o
    // título aqui: o conteúdo continua morando só no HTML. innerText devolve o
    // texto renderizado, então os dois lados vão para minúsculas antes de comparar.
    combina(el) {
      const t = this.termo.trim().toLowerCase();
      return !t || el.innerText.toLowerCase().includes(t);
    },

    // roda depois que o x-show já aplicou, via $watch no init
    medirVazio() {
      const t = this.$refs.trilho;
      if (!t) return;
      this.vazio = ![...t.querySelectorAll('article')].some(a => a.offsetParent !== null);
      this.medirTrilho();
    },

    // em telas largas os 4 cards cabem inteiros: aí não há o que rolar
    // e as setas ficam desabilitadas em vez de mortas
    medirTrilho() {
      const t = this.$refs.trilho;
      this.temFolga = t ? t.scrollWidth > t.clientWidth + 4 : false;
    },

    // carrossel de receitas: rola o trilho por um card
    rolar(dir) {
      const t = this.$refs.trilho;
      if (!t) return;
      const card = t.querySelector('article');
      const passo = card ? card.getBoundingClientRect().width + 20 : t.clientWidth * 0.8;
      t.scrollBy({ left: dir * passo, behavior: 'smooth' });
    },

    inscrever() {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.email)) {
        this.erro = 'Confira o e-mail';
        return;
      }
      this.erro = '';
      // TODO: site estático não tem backend. Ligue num Formspree, Netlify Forms
      // ou no seu provedor de newsletter antes de publicar.
      this.inscrito = true;
    },
  }));
});
