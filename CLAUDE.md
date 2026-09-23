# Site da Nuvio Studio

Site da Nuvio Studio, no ar em `nuviostudio.com.br`. Foi criado a partir do
template Astro próprio, mas não é o template: valores fixos da Nuvio são
esperados aqui. Generalize só onde há reuso real (ex.: `Landing.astro`, que
serve a home e as páginas de segmento).

## Stack

| Pacote            | Versão | Observação                              |
| ----------------- | ------ | --------------------------------------- |
| astro             | 7.3.3  |                                         |
| tailwindcss       | 4.3.3  | via `@tailwindcss/vite`                 |
| @tailwindcss/vite | 4.3.3  |                                         |
| vite              | 8.3.0  | transitivo — não instalar como direto   |
| typescript        | 6.0.3  | **não subir para 7** — ver abaixo       |
| @astrojs/check    | 0.9.10 |                                         |
| @astrojs/sitemap  | 3.7.4  |                                         |

### TypeScript preso na 6

`@astrojs/check@0.9.10` declara `peerDependencies: typescript "^5 || ^6"`.
Instalar `typescript@7` quebra o `npm install` com `ERESOLVE` e deixa o
`astro check` sem funcionar. `npm outdated` vai apontar `6.0.3 → 7.0.2`:
isso é esperado, não atualize. Só subir quando `@astrojs/check` publicar
suporte à 7.

### Vite

Não é dependência direta. Vem de `astro` e `@tailwindcss/vite`, ambos
resolvendo para a mesma versão (deduped). Deixe o Astro controlar isso.

## Comandos

```sh
npm run dev            # servidor local em :4321
npm run build          # build de produção (o mesmo que o deploy roda)
npm run preview        # pré-visualiza o build local
npm run check          # type-check (sai com código 1 se houver erro)
```

Para o servidor de desenvolvimento, use modo background:

```sh
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## Convenções

**Layouts.** Toda página deve usar `src/layouts/Base.astro`, que contém o
`<html>`, `<head>`, meta tags e Open Graph. Ele também faz o
`import "../styles/global.css"` — páginas não devem importar o CSS de novo.

```astro
---
import Base from "../layouts/Base.astro";
---
<Base title="Título" description="Descrição opcional.">
  <h1>Conteúdo</h1>
</Base>
```

Props, todas opcionais: `title` (vira `Título | Marca`; omita na home),
`description`, `ogImage`, `noindex`, `lang`. Os defaults vêm de `src/config.ts`.
Há um `<slot name="head" />` para tags extras por página (ex.: JSON-LD).

**Páginas que não devem ser indexadas** entram em `site.noindexPaths` no
`src/config.ts`, não na prop `noindex`. Essa lista é fonte única: o layout marca
a meta tag e o sitemap exclui a rota. Usar só a prop deixaria a página com
`noindex` mas ainda listada no sitemap — sinais contraditórios para o Google.

**Transições entre páginas.** O `Base.astro` inclui `<ClientRouter />`
(`astro:transitions`), então a navegação troca o conteúdo sem recarregar, com
fade. Em navegador sem suporte, cai no recarregamento normal.

Consequência: a página não recarrega, então `<script>` roda **uma vez só**.
Código que precisa rodar a cada navegação deve escutar `astro:page-load`, não
`DOMContentLoaded`. Para persistir um elemento entre páginas use
`transition:persist`; para animar um elemento específico, `transition:name`.

Na v7 o componente chama-se `ClientRouter`. `ViewTransitions` foi removido —
tutoriais antigos que o usam não funcionam.

**Tailwind v4.** Configurado pelo plugin Vite em `astro.config.ts`. Não existe
`tailwind.config.js` nem PostCSS — isso é intencional. Todo o Tailwind entra
por `@import "tailwindcss"` em `src/styles/global.css`; customização de tema se
faz com `@theme` nesse mesmo arquivo.

**TypeScript.** `tsconfig.json` estende `astro/tsconfigs/strict`. O
`astro build` **não** verifica tipos por si (o esbuild apenas remove as
anotações), por isso o script `build` roda `astro check` antes — erro de tipo
barra o build e, com ele, o deploy.

## Configuração e deploy

`src/config.ts` concentra os dados do site: nome, descrição padrão, locale,
imagem OG, domínio e rotas `noindex`. O `astro.config.ts` importa dali — não
duplique esses valores.

**Deploy.** Push na `main` dispara `.github/workflows/deploy.yml`, que roda
`npm run build` e publica no GitHub Pages, servido em `nuviostudio.com.br`
(o domínio vem de `public/CNAME`; sem ele um deploy pode derrubar o domínio).

O site fica na **raiz do domínio**: links e arquivos de `public/` usam caminho
absoluto a partir de `/`, sem prefixo de `base`. Não existe build de prévia em
subpasta: um `base` como `/nuvio` prefixa o CSS e ele dá 404 no domínio.

## Estrutura

```
src/
├── config.ts                 # dados do site (nome, domínio, noindex) + semIndice()
├── data/landing.ts           # preços, produtos, textos (conteudoPadrao)
├── data/nichos.ts            # texto do topo por segmento (barbearia...)
├── data/demo-barbearia.ts    # serviços e dados da Blade & Co. (fictícia)
├── data/demo-restaurante.ts  # pratos e dados da Casa Olívia (fictícia)
├── layouts/Base.astro        # <html>, <head>, SEO, Open Graph, fontes
├── layouts/DemoBlade.astro   # visual das páginas demo da barbearia
├── layouts/DemoOlivia.astro  # visual das páginas demo do restaurante
├── components/landing/       # uma seção por arquivo + Landing.astro que monta
├── components/icons/         # SVGs reaproveitados (check, seta, WhatsApp)
├── scripts/pagina.ts         # aCadaPagina(): ciclo de vida com o ClientRouter
├── pages/index.astro         # landing completa
├── pages/barbearia.astro     # landing com os textos do segmento barbearia
├── pages/demos/barbearia/    # catálogo de cortes e página de links (noindex)
├── pages/demos/casa-olivia/  # cardápio e página de links do restaurante (noindex)
├── pages/404.astro           # página de erro
├── pages/robots.txt.ts       # robots.txt gerado no build
└── styles/global.css         # Tailwind, tokens (@theme) e componentes
public/
├── demos/                    # 5 sites demo prontos (HTML + CSS compilado)
├── images/logo.webp          # logo do header e rodapé (108px, gerado de nuvio.png)
├── images/projetos/          # prints dos cards de exemplos
└── favicon.ico, icon-192.png, apple-touch-icon.png  # gerados de nuvio.png
```

## Landing page (Nuvio Studio)

**Posicionamento:** presença digital completa, vendida pelo resultado ("o
cliente te acha, escolhe e avalia sem você parar o atendimento"), não pela
aparência. Cinco produtos: site (uma ou várias
páginas), linktree customizado, cartão e plaquinha de aproximação e Google
Meu Negócio. Cada um com seu preço no card (sem combos). **Nunca escrever "NFC" no texto**:
para o cliente é "cartão" e "plaquinha". "Cardápio" é qualquer lista de
serviços ou produtos (cortes, tratamentos...), e é uma página do site.

**A venda fecha na visita.** A página apoia a conversa (mostrada no celular) e
serve para indicação: visual, direta e com preço claro. Sem garantia no texto.

**Condições (podem e devem aparecer no texto):** pagamento único, sem
mensalidade; site e linktree sem custo de hospedagem, no domínio `.com.br` do
cliente (só o domínio se renova, pago ao Registro.br); entrega em até 7 dias;
30 dias de ajustes de texto grátis, depois cobrado pelo tamanho da mudança.
Plaquinha tem arte padrão com QR code ou arte personalizada.

**Preços:** fonte única em `precos` (`landing.ts`). Os cards de produto leem
dali.

**As peças gravam o link final direto** (sem redirecionamento). Não prometer
no site troca de destino à distância.

**Segmentos:** `Landing.astro` recebe `conteudo` (texto do topo). Para
um segmento novo, copie o bloco da barbearia em `nichos.ts` e crie a página
igual a `barbearia.astro`.

**"Teste agora"** (`TesteCartao.astro`): animação em loop
só com o cartão (encosta, notificação, dedo toca, cardápio abre e rola). Não
tem botão nem recebe clique; roda só com o celular na tela e a aba à vista, e
com `prefers-reduced-motion` mostra o cardápio aberto parado. Estado em
`data-estado` na raiz, visual por `group-data-[estado=...]`. A demo abre num
iframe desenhado em 390px e encolhido para a tela do celular.

**`noindexPaths` aceita prefixo** (`/demos/*`); use sempre `semIndice()` do
`config.ts`, que é o que o Base e o sitemap consultam.

Migrada do site em HTML puro de `../vender-sites/website-seller`. O Alpine.js
foi removido: a interação é feita com `<script>` do Astro dentro de cada
componente.

**Conteúdo mora em `src/data/landing.ts`, não em JavaScript de cliente.** Os
arrays são renderizados no build e viram HTML estático, então a página é
legível e indexável sem JS. Para adicionar um projeto ou pergunta, acrescente
um item no array: links e contagens se ajustam.

**Scripts de componente usam `aCadaPagina()`** (`src/scripts/pagina.ts`), que
roda no `astro:page-load` e entrega um `AbortSignal` abortado antes da próxima
troca de página. Passe `{ signal }` a todo `addEventListener` em `window` e
limpe timers no `abort`, senão eles acumulam a cada navegação.

**A classe `.js` no `<html>`.** Um script inline (em `Landing.astro`) põe a
classe e a remove se `data-pronto` não aparecer em 3s. O CSS só esconde algo
(menu mobile, `.reveal`, itens fora do filtro das demos) sob `.js`. Sem
isso, uma falha de JS deixaria conteúdo invisível.

**Estado via atributo, visual via Tailwind.** Os scripts só ligam atributos
(`data-rolou`, `data-aberto`, `aria-pressed`) e o estilo sai de
variantes (`data-rolou:py-3`, `aria-pressed:bg-brand-600`). Quando o elemento
precisa sumir, o `display` fica no `global.css`, nunca como utilitária no
HTML: utilitária vence `@layer components` no v4.

**Exemplos** (`projetos` em `landing.ts`): 5 sites, 2 cardápios digitais
(cortes da Blade & Co., pratos da Casa Olívia) e 2 linktrees, em ordem
misturada de propósito. Prints de 800×600 em `public/images/projetos/`.

**FAQ é `<details name="faq">`**: acordeão exclusivo nativo, sem JS.

**Demos** (`public/demos/`) são sites independentes com o próprio CSS já
compilado e Alpine via CDN; o Astro só os copia. O fonte (`input.css`) e o
build deles continuam no projeto original. Cada `index.html` tem um `<style>`
com a mesma fonte base fluida do site; demo nova ou recopiada precisa recebê-lo
também. O `@source "../"` no `global.css`
existe para o Tailwind não varrer esses HTMLs.

**Regras de texto herdadas:** nunca usar travessão (—) nem meia-risca (–);
em intervalos, "Dias 2 a 4". Todo `<button>` precisa de `cursor-pointer` e
`type="button"` fora de formulários. Transições de no mínimo 300ms.

**Escala de espaçamento.** `gap`, `space-x/y`, margin e padding usam só
0.5, 1, 2, 4, 8, 16, 32, 64 (unidades do Tailwind). Seções usam
`py-16 lg:py-32` (a hero, `pt-32 pb-16 lg:pb-32`, por causa do header fixo).
Tamanhos (`w-`, `h-`) e posições (`top-`, `inset-`) não entram na regra.

**Armadilha do compilador:** quebra de linha entre texto e tag inline é
removida (`estar\n<span>` vira "estarvendendo"). Use `{" "}` no fim da linha.

**Reels (`reels/`).** Vídeos 9:16 para Instagram mostrando o cartão e a
plaquinha: `reel.html?v=cardapio|google|links` (abra no navegador para ver em
loop), `node telas.mjs` recaptura as demos com o dev server no ar e
`node gravar.mjs` gera os MP4 em `reels/saida/` (Chrome + ffmpeg). Pasta fora
do `src`, com `package.json` próprio: o Astro não a enxerga. Não é versionada
(entra no `.gitignore`): é ferramenta de gravação, não faz parte do site.

`.astro/` é gerado pelo Astro a cada build e está no `.gitignore` — não editar
nem versionar.

## Pendências conhecidas

- **`public/og-image.png` não existe.** O `Base.astro` já aponta para ele, mas
  o arquivo precisa ser criado (1200×630) ou os compartilhamentos saem sem
  imagem. É a pendência de maior impacto.
- **Formulário de contato só simula o envio** (bloqueante). O `submit` em
  `Contato.astro` precisa apontar para Formspree, Web3Forms ou um webhook; o
  `fetch` comentado mostra onde.
- **TikTok com `href="#"`** em `site.socials` (`src/config.ts`). As demos fictícias
  (Blade & Co., Casa Olívia) usam o WhatsApp de exemplo `5511999999999`.
- **Sem depoimentos.** A seção (carrossel em `Depoimentos.astro`) foi removida
  porque os textos eram inventados. Com depoimentos reais, recupere do git:
  `git show e444012:src/components/landing/Depoimentos.astro` (e o array
  `depoimentos` em `src/data/landing.ts` do mesmo commit).
- **Prints do portfólio** eram gerados por `scripts/shots.mjs` no projeto
  original (puppeteer). Não foi portado; os `.webp` foram copiados.
- **Sem JSON-LD.** Dados estruturados (`LocalBusiness`, `Organization`) rendem
  rich snippets. Adicionar via `<slot name="head" />`.
