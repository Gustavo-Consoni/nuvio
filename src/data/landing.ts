/**
 * Conteúdo da landing page.
 *
 * Tudo aqui é renderizado no build: vira HTML estático e continua legível e
 * indexável sem JavaScript. Os `<script>` dos componentes cuidam só de
 * estado e interação.
 *
 * Posicionamento: presença digital completa, vendida pelo resultado (o
 * cliente acha, escolhe e avalia sem o dono parar o atendimento), não pela
 * aparência. Cinco produtos, cada um com seu preço
 * no card. A venda fecha na visita: a página apoia a conversa (mostrada no
 * celular) e serve para indicação, então é visual, direta e com preço claro.
 *
 * Regras de escrita: nunca usar travessão nem meia-risca; em intervalos,
 * "Dias 2 a 4"; em títulos, o separador aceito é `|`. Não citar "NFC" no
 * texto: para o cliente é "cartão" e "plaquinha" de aproximação.
 * "Cardápio" é qualquer lista de produtos ou serviços (cortes, tratamentos...).
 */

/** `id` da seção de cada item do menu. */
export const nav = [
  { id: "teste", label: "Teste agora" },
  { id: "produtos", label: "Produtos" },
  { id: "projetos", label: "Exemplos" },
  { id: "faq", label: "Dúvidas" },
];

/* ------------------------------------------------------------------
   Preços. Fonte única: os cards de produto e o topo leem daqui.
------------------------------------------------------------------ */

export const precos = {
  google: 200,
  linktree: 250,
  plaquinha: 150,
  cartao: 100,
  cartaoKit3: 240,
  sitePagina: 1000,
  siteVarias: 1500,
};

/** 1500 → "1.500" */
export const reais = (valor: number) => valor.toLocaleString("pt-BR");

/* ------------------------------------------------------------------
   Conteúdo que muda por segmento (ver nichos.ts)
------------------------------------------------------------------ */

export interface ConteudoHero {
  selo: string;
  /** O título é montado como `antes` + `destaque` (em gradiente) + `depois`. */
  titulo: { antes: string; destaque: string; depois: string };
  texto: string;
}

export interface Conteudo {
  hero: ConteudoHero;
}

export const conteudoPadrao: Conteudo = {
  hero: {
    selo: "Presença digital para empresas",
    titulo: { antes: "O cliente", destaque: "te acha, escolhe e avalia", depois: " sem você parar o atendimento." },
    texto:
      "Seu negócio aparece no Google para quem procura por perto, mostra serviços e preços antes da pergunta no direct e ganha avaliação com um toque no balcão. Tudo com a cara da sua marca.",
  },
};

/* ------------------------------------------------------------------
   Conteúdo fixo
------------------------------------------------------------------ */

/** Faixa rolante logo abaixo do topo. */
export const segmentos = [
  "Barbearias",
  "Restaurantes",
  "Cafeterias",
  "Salões de beleza",
  "Clínicas",
  "Academias",
  "Estúdios de tatuagem",
  "Pet shops",
  "Lojas",
];

/**
 * Os cinco produtos. `preco` e `extra` são montados a partir de `precos`;
 * `unidade` aparece ao lado do preço ("R$ 100 cada").
 */
export const produtos = [
  {
    icone: "📍",
    nome: "Google Meu Negócio",
    onde: "No Google e no Maps",
    texto: "Criamos ou arrumamos seu perfil: fotos, horário, serviços e contato. É ele que aparece quando procuram pelo seu negócio.",
    itens: ["Criação ou ajuste completo", "Fotos, horários e serviços", "Link direto de avaliação"],
    preco: precos.google,
    unidade: null,
    extra: null,
  },
  {
    icone: "🔗",
    nome: "Linktree customizado",
    onde: "No link da bio",
    texto: "Uma página de links com a sua identidade, sem a marca de ninguém. Os botões que importam, na ordem que importa.",
    itens: ["Visual com a sua marca", "Agendar, WhatsApp, cardápio e mapa", "Funciona no Instagram e no WhatsApp"],
    preco: precos.linktree,
    unidade: null,
    extra: null,
  },
  {
    icone: "⭐",
    nome: "Plaquinha de balcão",
    onde: "No caixa",
    texto: "O cliente encosta o celular e abre o link que você quiser. O mais comum: a tela de avaliar seu negócio no Google.",
    itens: ["Arte personalizada", "Abre avaliação, site ou linktree", "Sem app, em iPhone e Android"],
    preco: precos.plaquinha,
    unidade: null,
    extra: null,
  },
  {
    icone: "💳",
    nome: "Cartão de aproximação",
    onde: "Na espera, na mesa ou na carteira",
    texto: "Mesmo toque da plaquinha, no formato de cartão. Fica na sala de espera abrindo o cardápio, ou vai com o cliente.",
    itens: ["Arte frente e verso", "Abre cardápio, site, linktree ou avaliação", "Sem app, em iPhone e Android"],
    preco: precos.cartao,
    unidade: "cada",
    extra: `kit com 3 por R$ ${reais(precos.cartaoKit3)}`,
  },
  {
    icone: "🌐",
    nome: "Site",
    onde: "Em qualquer lugar",
    texto: "De uma página, como um cardápio de cortes ou serviços com foto e preço, até um site completo com várias páginas.",
    itens: ["Cardápio de qualquer serviço ou produto", "Pensado para o celular", "Botão de agendar ou pedir"],
    preco: precos.sitePagina,
    unidade: "uma página",
    extra: `várias páginas a partir de R$ ${reais(precos.siteVarias)}`,
  },
];

/**
 * Demo "Teste agora": cada peça abre um destino. `tela` diz o que o celular
 * mostra: uma página demo (iframe) ou a tela de avaliação do Google (mock).
 */
export const teste = [
  {
    id: "espera",
    peca: "Cartão na sala de espera",
    abre: "Cardápio de cortes",
    notificacao: "Toque para abrir o cardápio",
    tela: "/demos/barbearia/cortes/",
  },
  {
    id: "caixa",
    peca: "Plaquinha no caixa",
    abre: "Avaliação no Google",
    notificacao: "Toque para avaliar no Google",
    tela: "google",
  },
  {
    id: "bio",
    peca: "Cartão na carteira",
    abre: "Linktree customizado",
    notificacao: "Toque para abrir os links",
    tela: "/demos/barbearia/links/",
  },
];

/**
 * Exemplos (portfólio).
 *
 * `url`: o que abre no visualizador (e o link para quem está sem JS).
 *        Página local: caminho a partir da raiz, sem o `base` (ele é somado no
 *        componente). URL externa: começa com http.
 * `shot`: print em `public/images/projetos/`.
 * `resultado.destaque: false` pinta o rótulo de âmbar (demonstrativo);
 *        `true` pinta de verde (resultado real de cliente).
 *
 * Rotule demo como "Projeto demonstrativo", nunca como trabalho de cliente.
 * A ordem é misturada de propósito (sites, cardápios e linktrees alternados).
 */
export const projetos = [
  {
    titulo: "Casa Olívia | Cardápio",
    categoria: "Cardápio digital",
    descricao: "O cardápio com foto e preço que abre quando o cliente encosta o celular na plaquinha da mesa.",
    url: "/demos/casa-olivia/cardapio/",
    shot: "/images/projetos/olivia-cardapio.webp",
    resultado: { texto: "Projeto demonstrativo", detalhe: "Teste no celular", destaque: false },
  },
  {
    titulo: "Blade & Co.",
    categoria: "Site",
    descricao: "Site completo da barbearia com agendamento online.",
    url: "/demos/barbearia/index.html",
    shot: "/images/projetos/barbearia.webp",
    resultado: { texto: "Projeto demonstrativo", detalhe: "Navegável", destaque: false },
  },
  {
    titulo: "Blade & Co. | Links",
    categoria: "Linktree",
    descricao: "A página de links da barbearia, no lugar de um linktree genérico.",
    url: "/demos/barbearia/links/",
    shot: "/images/projetos/barbearia-links.webp",
    resultado: { texto: "Projeto demonstrativo", detalhe: "Teste no celular", destaque: false },
  },
  {
    titulo: "Noor",
    categoria: "Site",
    descricao: "Hotel de deserto que vira noite conforme a página rola.",
    url: "/demos/refugio/index.html",
    shot: "/images/projetos/refugio.webp",
    resultado: { texto: "Projeto demonstrativo", detalhe: "Navegável", destaque: false },
  },
  {
    titulo: "Blade & Co. | Cortes",
    categoria: "Cardápio digital",
    descricao: "Os cortes com foto e preço, para o cliente escolher enquanto espera na cadeira.",
    url: "/demos/barbearia/cortes/",
    shot: "/images/projetos/barbearia-cortes.webp",
    resultado: { texto: "Projeto demonstrativo", detalhe: "Teste no celular", destaque: false },
  },
  {
    titulo: "Mesa Farta",
    categoria: "Site",
    descricao: "Site de receitas com clube por assinatura.",
    url: "/demos/restaurante/index.html",
    shot: "/images/projetos/restaurante.webp",
    resultado: { texto: "Projeto demonstrativo", detalhe: "Navegável", destaque: false },
  },
  {
    titulo: "Casa Olívia | Links",
    categoria: "Linktree",
    descricao: "Reserva, cardápio, pedido para levar e avaliação, tudo num link só.",
    url: "/demos/casa-olivia/links/",
    shot: "/images/projetos/olivia-links.webp",
    resultado: { texto: "Projeto demonstrativo", detalhe: "Teste no celular", destaque: false },
  },
  {
    titulo: "SpacePro",
    categoria: "Site",
    descricao: "Plataforma de treinos prontos para seguir na academia, renovados a cada 45 dias.",
    url: "/demos/treino/index.html",
    shot: "/images/projetos/treino.webp",
    resultado: { texto: "Projeto demonstrativo", detalhe: "Navegável", destaque: false },
  },
  {
    titulo: "Casa Vértice",
    categoria: "Site",
    descricao: "Ateliê de eventos com briefing e consulta de agenda.",
    url: "/demos/eventos/index.html",
    shot: "/images/projetos/eventos.webp",
    resultado: { texto: "Projeto demonstrativo", detalhe: "Navegável", destaque: false },
  },
];

/**
 * Depoimentos: a seção só aparece com `mostrarDepoimentos = true`.
 * Os textos abaixo são inventados (vieram do template). Troque por
 * depoimentos reais de clientes antes de ligar.
 */
export const mostrarDepoimentos = false;

export const depoimentos = [
  {
    texto: "Em três semanas o site já tinha pago o próprio investimento. O time entendeu o meu público melhor do que eu conseguia explicar.",
    nome: "Juliana Mendes",
    cargo: "Sócia · Bellafit Studio",
  },
  {
    texto: "O site antigo demorava uma eternidade para abrir e a gente perdia gente no meio do caminho. Depois da reconstrução, os contatos dobraram.",
    nome: "André Ferreira",
    cargo: "CEO · Vitali Suplementos",
  },
  {
    texto: "Antes o paciente ligava para perguntar o que já devia estar no site. Agora ele chega sabendo. Prazo cumprido à risca e suporte que responde de verdade.",
    nome: "Renata Castro",
    cargo: "Diretora · Odonto Prime",
  },
  {
    texto: "Eu já tinha sido queimado por duas agências antes. Aqui foi a primeira vez que o entregue bateu com o prometido.",
    nome: "Lucas Siqueira",
    cargo: "Fundador · Craft & Co.",
  },
  {
    texto: "Precisava de um site que passasse seriedade sem ficar datado em dois anos. Recebi a primeira versão em cinco dias e mudei duas frases. Só isso.",
    nome: "Marina Villela",
    cargo: "Sócia · Lumen Advocacia",
  },
  {
    texto: "Eu vendia só pelo Instagram e vivia repetindo preço no direct. Hoje mando o link e a pessoa chega decidida.",
    nome: "Bruno Tavares",
    cargo: "Fundador · Studio Raiz",
  },
  {
    texto: "O cliente acha horário, endereço e valor sem falar com ninguém. Isso sozinho cortou metade das ligações que chegavam na recepção.",
    nome: "Camila Reis",
    cargo: "Proprietária · Espaço Aurora",
  },
  {
    texto: "Cardápio em PDF no celular era um castigo. Virou uma página que abre na hora, e hoje a maioria das reservas entra pelo site.",
    nome: "Paulo Miranda",
    cargo: "Chef · Cantina do Porto",
  },
  {
    texto: "Pedi três ajustes depois de entregue e não vi cara feia em nenhum. Isso pesa mais do que qualquer proposta bonita.",
    nome: "Fernanda Duarte",
    cargo: "Gerente · Clínica Vera Luz",
  },
  {
    texto: "A gente só aparecia para quem já sabia o nome da loja. Dois meses depois começou a ligar gente que nunca tinha ouvido falar da gente.",
    nome: "Ricardo Sampaio",
    cargo: "Sócio · Marcenaria Norte",
  },
];

export const faq = [
  {
    pergunta: "Como funcionam o cartão e a plaquinha?",
    resposta: "Os dois têm um chip com o seu link gravado. Quando o cliente aproxima o celular, aparece uma notificação na tela e um toque abre o link. Não precisa baixar aplicativo: funciona no iPhone (do XS em diante) e na maioria dos Android, que já vêm com a leitura por aproximação ligada.",
  },
  {
    pergunta: "O que o cartão e a plaquinha podem abrir?",
    resposta: "Qualquer link: a tela de avaliação do Google, seu linktree, seu site, o cardápio, o WhatsApp ou o Instagram. Cada peça abre um link, então dá para ter a plaquinha no caixa abrindo a avaliação e o cartão na espera abrindo o cardápio.",
  },
  {
    pergunta: "Qual a diferença do linktree customizado para o Linktree comum?",
    resposta: "O comum tem a cara e a marca do Linktree, igual ao de todo mundo. O customizado é uma página só sua, com suas cores, sua logo e os botões na ordem que faz sentido para o seu negócio.",
  },
  {
    pergunta: "Meu negócio ainda não está no Google. Tem problema?",
    resposta: "Nenhum, a gente cria. Só saiba que o Google pede uma verificação do negócio (por vídeo, ligação ou carta), e ela pode levar alguns dias para ser aprovada. Isso é do Google, não da gente.",
  },
  {
    pergunta: "Preciso ter um site?",
    resposta: "Não. Dá para começar pelo Google e pela plaquinha, ou pelo linktree. O site entra quando fizer sentido para o seu negócio.",
  },
  {
    pergunta: "O que é o cardápio?",
    resposta: "Uma página com seus serviços ou produtos, com foto, descrição e preço. Na barbearia é o cardápio de cortes, na clínica o de tratamentos, na loja o de produtos. O cliente olha no celular enquanto espera ou antes de te chamar.",
  },
];

export const contato = {
  beneficios: [
    { icone: "🔎", titulo: "Diagnóstico gratuito", texto: "Olhamos seu Google, seu Instagram e seu balcão, sem compromisso." },
    { icone: "📱", titulo: "Você vê antes", texto: "Mostramos os exemplos funcionando no seu celular." },
    { icone: "🤝", titulo: "Preço fechado", texto: "Você sabe o valor de cada item antes de decidir." },
  ],
  /** O primeiro vem selecionado no formulário. */
  tiposDeProjeto: [
    "Google Meu Negócio",
    "Linktree customizado",
    "Plaquinha de balcão",
    "Cartão de aproximação",
    "Site",
    "Mais de um item",
    "Ainda não sei",
  ],
};
