# Paula Viana Odontologia — site institucional

Landing page de página única para o consultório da **Dra. Paula Viana**, dentista em
Cuiabá/MT (bairro Lixeira). Site estático, sem build e sem dependências: é só publicar
os arquivos em qualquer hospedagem.

## Estrutura

```
index.html                  página única (todas as seções)
assets/css/styles.css       folha de estilo única, mobile-first
assets/js/main.js           interações (menu, animações, formulário)
assets/img/                 fotos otimizadas (.webp com fallback .jpg) + favicon
robots.txt, sitemap.xml     SEO
```

## Como rodar localmente

Não há etapa de build. Abra `index.html` no navegador ou sirva a pasta:

```bash
python3 -m http.server 8000
# acesse http://localhost:8000
```

## Seções

Hero · Serviços · Sorrisos · Sobre · Diferenciais · Depoimentos · Contato · CTA final · Rodapé

## Conteúdo: o que é verificado e o que é placeholder

Nada de qualificação, especialidade, prêmio ou certificação foi inventado. As
informações abaixo vêm de fontes públicas:

| Dado | Origem |
| --- | --- |
| Endereço, telefone/WhatsApp | Fornecidos pela cliente e conferidos em listagens públicas |
| Nota 4,9 com 60 avaliações | Perfil público no Google (via DentMap) |
| Depoimentos (3) | Avaliações públicas reais no Google — **não foram inventadas** |
| Serviços | Lista fornecida pela cliente |
| Fotos | Fornecidas pela cliente |

Os depoimentos são de **Fer Steinmetz**, **Diana Dalila** e **Bianca Barreto**,
reproduzidos de forma concisa preservando o sentido original. Fonte:
<https://dentmap.com.br/dentistas/cuiaba/dra-paula-viana-dentista-bairro-lixeira-cuiaba-sapt4omc>

### Pendências antes de publicar

Cada item abaixo está marcado com um comentário `TODO` no código:

- [ ] **E-mail profissional** — hoje está o placeholder `contato@drapaulaviana.com.br`,
      sinalizado como provisório na própria página (`index.html`, seção de contato).
- [ ] **Domínio** — trocar `https://www.drapaulaviana.com.br/` nas tags `canonical`,
      `og:`, `twitter:`, no JSON-LD, no `robots.txt` e no `sitemap.xml`.
- [ ] **CRO-MT** — número de registro não foi incluído por não estar confirmado.
      O rodapé tem um `TODO` no lugar.
- [ ] **Horário de funcionamento** — está como "atendimento com hora marcada".
      Ao confirmar os horários reais, atualizar a seção de contato e acrescentar
      `openingHoursSpecification` ao JSON-LD.
- [ ] **Redes sociais** — os links do rodapé apontam para as páginas iniciais do
      Instagram e do Facebook; substituir pelos perfis oficiais.

### Ponto de atenção sobre as fotos de pacientes

A seção "Sorrisos" usa as fotos enviadas, apresentadas como registros isolados de
trabalhos realizados — **não** como "antes e depois" e sem promessa de resultado.
Vale confirmar com a Dra. Paula se há autorização de uso de imagem assinada de cada
paciente e se a seção está de acordo com as regras de publicidade odontológica do
CFO, que restringem imagens de "antes e depois" e promessas de resultado.

## Formulário de agendamento

O formulário valida os campos no navegador e monta uma mensagem pronta no WhatsApp
(`wa.me/5565996218598`), então funciona sem back-end.

Para receber os pedidos também por e-mail, aponte o `action` do `<form>` para um
serviço de formulário (Formspree, Basin, Netlify Forms) e remova o atributo
`data-whatsapp-form` — o JS deixa de interceptar o envio.

## Acessibilidade e performance

- Auditoria **axe-core** (WCAG 2.1 A/AA): **0 violações** em desktop (1440px) e mobile (390px).
- Contraste: paleta ajustada para passar AA — inclusive os botões de WhatsApp, que
  usam um verde mais escuro (5,03:1 com texto branco) em vez do verde de marca (2,74:1).
- Navegação por teclado, `:focus-visible`, skip link e menu mobile que fecha com `Esc`.
- `prefers-reduced-motion` desliga todas as animações.
- Sem JavaScript o conteúdo continua visível: o estado inicial das animações é
  aplicado apenas quando o JS está ativo.
- Imagens em `.webp` com fallback `.jpg`, dimensões declaradas (sem layout shift),
  `loading="lazy"` abaixo da dobra e o mapa carregado de forma preguiçosa.
- Zero dependências de runtime; só a fonte vem de fora (Google Fonts, carregada sem bloquear a renderização).

## SEO

Meta tags de título/descrição/keywords, Open Graph, Twitter Card, `canonical`,
`robots.txt`, `sitemap.xml` e JSON-LD `Dentist` com endereço, serviços e as três
avaliações reais.
