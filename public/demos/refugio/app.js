/* Noor: só comportamento. Todo o conteúdo está no index.html. */
document.addEventListener('alpine:init', () => {
  Alpine.data('noor', () => ({
    menu: false,
    rolou: false,     // barra ganhou fundo
    noite: false,     // a página já entrou no clima noturno
    enviando: false,
    enviado: false,
    erro: '',
    form: { nome: '', email: '', chegada: '' },

    init() {
      this.aoRolar();
      window.addEventListener('scroll', () => this.aoRolar(), { passive: true });
      window.addEventListener('resize', () => { if (innerWidth >= 768) this.menu = false; });
    },

    // A faixa de transição é o divisor: quando o topo dela passa por baixo da
    // barra, tudo dali para a frente é noite e a barra inverte junto.
    aoRolar() {
      this.rolou = scrollY > 40;
      const faixa = document.getElementById('transicao');
      if (faixa) this.noite = faixa.getBoundingClientRect().top < 80;

      // paralaxe leve no fundo do hero, só enquanto ele está na tela
      const fundo = this.$refs.fundoHero;
      if (fundo && scrollY <= innerHeight) fundo.style.translate = `0 ${scrollY * 0.25}px`;
    },

    // O número final já está escrito no HTML; aqui ele só sobe até lá.
    // Sem JS o visitante lê o valor certo do mesmo jeito.
    conta(el) {
      const alvo = parseInt(el.textContent.trim(), 10);
      if (Number.isNaN(alvo)) return;
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const io = new IntersectionObserver((entradas) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          io.disconnect();
          const inicio = performance.now();
          const passo = (agora) => {
            const t = Math.min(1, (agora - inicio) / 1600);
            el.textContent = String(Math.round(alvo * (1 - Math.pow(1 - t, 3))));
            if (t < 1) requestAnimationFrame(passo); else el.textContent = String(alvo);
          };
          requestAnimationFrame(passo);
        });
      }, { threshold: 0.5 });
      io.observe(el);
    },

    enviar() {
      this.erro = '';
      this.enviado = false;
      if (!this.form.nome.trim()) return (this.erro = 'Escreva seu nome para a gente saber quem chega.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) return (this.erro = 'Confira o e-mail: é por ele que respondemos.');
      if (!this.form.chegada) return (this.erro = 'Escolha a data de chegada.');

      this.enviando = true;

      // DEMO: o envio é simulado. Num site real, troque este bloco por um
      // fetch para Formspree, Netlify Forms, Web3Forms ou um webhook seu.
      setTimeout(() => {
        this.enviando = false;
        this.enviado = true;
        this.form = { nome: '', email: '', chegada: '' };
      }, 900);
    },
  }));
});
