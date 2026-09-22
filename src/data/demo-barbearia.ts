/**
 * Demo Blade & Co. (barbearia fictícia). Mesmos serviços, preços, endereço e
 * horários do site demo estático em public/demos/barbearia, para as três
 * páginas contarem a mesma história numa visita de venda.
 */

/** Fotos do demo estático, reaproveitadas. Caminho sem o `base`. */
const foto = (arquivo: string) => `/demos/barbearia/static/images/${arquivo}`;

export const blade = {
  nome: "Blade & Co.",
  bio: "Barbearia na Vila Madalena, desde 2018",
  whatsapp: "5511999999999",
  endereco: "Rua das Oficinas, 128, Vila Madalena, São Paulo",
  horarios: ["Ter a sex: 10h às 20h", "Sábado: 9h às 18h"],
  capa: foto("atmosfera.webp"),
};

export const categorias = [
  { id: "cabelo", nome: "Cabelo" },
  { id: "barba", nome: "Barba" },
  { id: "cuidados", nome: "Combos e cuidados" },
];

export const servicos = [
  {
    nome: "Corte exclusivo",
    categoria: "cabelo",
    descricao: "Corte sob medida, com consulta antes da tesoura, toalha quente e finalização precisa.",
    preco: "45",
    duracao: "45 min",
    foto: foto("degrade.webp"),
  },
  {
    nome: "Design capilar",
    categoria: "cabelo",
    descricao: "Degradês, padrões e desenhos feitos à mão livre na navalha, do risco simples ao gráfico.",
    preco: "60",
    duracao: "60 min",
    foto: foto("estilizacao.webp"),
  },
  {
    nome: "Barbear na navalha",
    categoria: "barba",
    descricao: "Barbear tradicional na navalha, com toalha quente, espuma premium e bálsamo no fim.",
    preco: "55",
    duracao: "50 min",
    foto: foto("interior.webp"),
  },
  {
    nome: "Modelagem de barba",
    categoria: "barba",
    descricao: "Desenho, aparo e condicionamento com óleos escolhidos para o formato do seu rosto.",
    preco: "35",
    duracao: "30 min",
    foto: foto("ferramentas.webp"),
  },
  {
    nome: "O completo",
    categoria: "cuidados",
    descricao: "Corte, barbear na navalha, cuidado de barba, limpeza facial e massagem no couro cabeludo.",
    preco: "95",
    duracao: "90 min",
    foto: foto("barba.webp"),
  },
  {
    nome: "Cuidado facial",
    categoria: "cuidados",
    descricao: "Limpeza, esfoliação, máscara e hidratação para a pele do rosto, com produto de primeira.",
    preco: "65",
    duracao: "50 min",
    foto: foto("toalha.webp"),
  },
];

/** Link de WhatsApp com a mensagem já escrita. */
export const whatsapp = (mensagem: string) =>
  `https://wa.me/${blade.whatsapp}?text=${encodeURIComponent(mensagem)}`;
