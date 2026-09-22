/* Casa Vértice: só comportamento. Todo o conteúdo está no index.html. */
document.addEventListener('alpine:init', () => {
  Alpine.data('vertice', () => ({
    menu: false,
    nota: 0,           // depoimento aberto em "Notas de clientes"
    form: { email: '', tipo: 'Celebração privada', loading: false, sent: false },
    erro: '',

    init() {
      window.addEventListener('resize', () => { if (innerWidth >= 1024) this.menu = false; });
    },

    async enviar() {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(this.form.email)) {
        this.erro = 'Confira o e-mail';
        return;
      }
      this.erro = '';
      this.form.loading = true;
      // TODO: site estático não tem backend. Aponte para Formspree, Netlify Forms
      // ou um webhook antes de publicar de verdade.
      await new Promise(r => setTimeout(r, 900));
      this.form.loading = false;
      this.form.sent = true;
    },

    resetForm() {
      this.form = { email: '', tipo: 'Celebração privada', loading: false, sent: false };
      this.erro = '';
    },
  }));
});
