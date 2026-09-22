/* Blade & Co.: só comportamento. Todo o conteúdo está no index.html. */
document.addEventListener('alpine:init', () => {
  Alpine.data('blade', () => ({
    menu: false,
    scrolled: false,
    avaliacao: 0,      // depoimento visível no slider
    giro: null,        // timer do rodízio automático
    form: {
      nome: '', sobrenome: '', email: '', tel: '', data: '', hora: '',
      servico: 'Corte exclusivo · R$ 45', barbeiro: 'Sem preferência',
      loading: false, sent: false,
    },
    erros: {},

    init() {
      this.onScroll();
      window.addEventListener('scroll', () => this.onScroll(), { passive: true });
      window.addEventListener('resize', () => { if (innerWidth >= 1024) this.menu = false; });
      this.autoplay();
    },
    onScroll() { this.scrolled = scrollY > 40; },

    // Depoimentos: trocam sozinhos a cada 5s, como na referência. Um clique
    // no dot reinicia a contagem para o visitante não perder o que escolheu.
    autoplay() {
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      clearInterval(this.giro);
      this.giro = setInterval(() => { this.avaliacao = (this.avaliacao + 1) % 3; }, 5000);
    },
    verDepoimento(i) { this.avaliacao = i; this.autoplay(); },

    mascara() {
      let v = this.form.tel.replace(/\D/g, '').slice(0, 11);
      if (v.length > 6)      v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
      else if (v.length > 2) v = `(${v.slice(0,2)}) ${v.slice(2)}`;
      else if (v.length > 0) v = `(${v}`;
      this.form.tel = v;
    },

    validar() {
      const e = {};
      if (this.form.nome.trim().length < 2) e.nome = 'Informe seu nome.';
      if (this.form.sobrenome.trim().length < 2) e.sobrenome = 'Informe seu sobrenome.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.form.email.trim())) e.email = 'E-mail inválido.';
      if (this.form.tel.replace(/\D/g, '').length < 10) e.tel = 'Telefone com DDD.';
      if (!this.form.data) e.data = 'Escolha uma data.';
      if (!this.form.hora) e.hora = 'Escolha um horário.';
      this.erros = e;
      return !Object.keys(e).length;
    },

    async enviar() {
      if (!this.validar()) return;
      this.form.loading = true;
      // TODO: site estático não tem backend. Aponte para Formspree, Netlify Forms
      // ou um webhook antes de publicar de verdade.
      await new Promise(r => setTimeout(r, 1000));
      this.form.loading = false;
      this.form.sent = true;
    },

    resetForm() {
      this.form = {
        nome: '', sobrenome: '', email: '', tel: '', data: '', hora: '',
        servico: 'Corte exclusivo · R$ 45', barbeiro: 'Sem preferência',
        loading: false, sent: false,
      };
      this.erros = {};
    },
  }));
});

/* Os dois efeitos abaixo não têm estado para o Alpine guardar, então moram
   fora dele: mexem direto no elemento. */

// Parallax da foto do hero. Escreve em `translate`, e não em `transform`,
// para não apagar o `scale` que a animação de entrada controla.
(() => {
  const foto = document.querySelector('.img-hero');
  if (!foto || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  addEventListener('scroll', () => {
    if (scrollY < innerHeight) foto.style.translate = `0 ${scrollY * 0.15}px`;
  }, { passive: true });
})();

// Contagem dos números da história. O valor final já está no HTML: o script
// só anima do zero até ele e devolve o texto original no fim.
(() => {
  const nums = document.querySelectorAll('.num-stat');
  if (!nums.length) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const conta = (el) => {
    const original = el.textContent.trim();
    const m = original.match(/^([\d.,]+)(.*)$/);
    if (!m) return;
    const alvo = parseFloat(m[1].replace(',', '.'));
    if (!isFinite(alvo)) return;
    const casas = (m[1].split(/[.,]/)[1] || '').length;
    const sufixo = m[2];
    const inicio = performance.now();
    const passo = (agora) => {
      const t = Math.min((agora - inicio) / 1500, 1);
      const v = alvo * (1 - Math.pow(1 - t, 3));   // desacelera no fim
      el.textContent = v.toFixed(casas).replace('.', m[1].includes(',') ? ',' : '.') + sufixo;
      if (t < 1) requestAnimationFrame(passo);
      else el.textContent = original;
    };
    requestAnimationFrame(passo);
  };

  const olho = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      conta(e.target);
      olho.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  nums.forEach((n) => olho.observe(n));
})();
