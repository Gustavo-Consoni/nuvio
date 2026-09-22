/**
 * Demo Casa Olívia (restaurante fictício): cardápio digital e página de links.
 * As fotos são as do demo estático em public/demos/restaurante, reaproveitadas.
 */

/** Fotos do demo estático, reaproveitadas. */
const foto = (arquivo: string) => `/demos/restaurante/static/images/${arquivo}`;

export const olivia = {
  nome: "Casa Olívia",
  bio: "Cozinha de casa em Pinheiros, desde 2016",
  whatsapp: "5511999999999",
  endereco: "Rua dos Pinheiros, 740, Pinheiros, São Paulo",
  horarios: ["Ter a sex: 12h às 15h e 19h às 23h", "Sáb e dom: 12h às 17h"],
  capa: foto("hero-capa.webp"),
};

export const categorias = [
  { id: "entradas", nome: "Entradas" },
  { id: "principais", nome: "Principais" },
  { id: "sobremesas", nome: "Sobremesas" },
];

export const pratos = [
  {
    nome: "Caprese da casa",
    categoria: "entradas",
    descricao: "Tomates da feira, muçarela de búfala, manjericão, flores comestíveis e azeite de oliva.",
    preco: "42",
    serve: "Serve 2",
    foto: foto("receita-2.webp"),
  },
  {
    nome: "Massa ao sugo",
    categoria: "principais",
    descricao: "Massa fresca curta, molho de tomate cozido por horas, manjericão e parmesão ralado na hora.",
    preco: "64",
    serve: "Serve 1",
    foto: foto("receita-1.webp"),
  },
  {
    nome: "Costela no bafo",
    categoria: "principais",
    descricao: "Costela suína assada devagar, pincelada com barbecue da casa, servida na tábua.",
    preco: "89",
    serve: "Serve 2",
    foto: foto("receita-4.webp"),
  },
  {
    nome: "Picadinho da vó",
    categoria: "principais",
    descricao: "Carne em cubos cozida no próprio caldo com legumes, ervas frescas e pão da casa.",
    preco: "68",
    serve: "Serve 1",
    foto: foto("hero-capa.webp"),
  },
  {
    nome: "Trio de doces",
    categoria: "sobremesas",
    descricao: "Três docinhos do dia escolhidos pela confeitaria: pergunte ao garçom quais saíram hoje.",
    preco: "28",
    serve: "3 unidades",
    foto: foto("receita-3.webp"),
  },
];

/** Link de WhatsApp com a mensagem já escrita. */
export const whatsapp = (mensagem: string) =>
  `https://wa.me/${olivia.whatsapp}?text=${encodeURIComponent(mensagem)}`;
