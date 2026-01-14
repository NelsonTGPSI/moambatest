# Moamba d'Angola — Site estático

Site profissional, moderno e responsivo para o restaurante angolano "Moamba d’Angola" feito com HTML5, CSS3 e JavaScript puro (sem frameworks).

Estrutura de ficheiros:

- index.html — página principal com todas as secções (Início, Sobre, Menu, Galeria, Contactos)
- css/styles.css — estilos com cores principais #74694c (marrom) e #c2b179 (dourado)
- js/main.js — interatividade: preloader, navbar responsiva, parallax, reveal, lightbox, lazy-load

Como usar:

1. Abrir o ficheiro `index.html` num browser moderno (Chrome, Firefox, Edge). Não é necessário servidor, funciona localmente.
2. Para personalizar:
   - Substitua imagens por imagens próprias (dentro de `index.html` ou apontando para URLs).
   - Atualize endereço, telefone e email na secção `Contactos` do `index.html`.

Notas técnicas e escolhas:

- Tipografia: Playfair Display (títulos) + Open Sans (texto) via Google Fonts.
- Galeria: layout estilo masonry usando CSS columns; lightbox custom simples.
- Mapa: iframe do Google Maps embutido (sem API key). Para marcador animado foi adicionada uma sobreposição decorativa.
- O site usa IntersectionObserver para animações de entrada e lazy-load das imagens da galeria.

Acessibilidade e performance:

- Foco visível e contraste reforçado para links e botões.
- Lazy-loading para imagens da galeria e uso de loading="lazy" nas imagens principais.

Se quiser, posso:

- Adicionar ficheiros de imagem locais (otimizados) ao repositório.
- Transformar a galeria para usar um layout de grid com ordenação ou filtros.
- Integrar um formulário de reservas ou carrinho (se desejar).
