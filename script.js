/* ==========================================================================
   PLANO DE ESTUDOS ENEM 90 DIAS — INTERAÇÕES
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initFAQ();
  initTestimonials();
  initMobileBar();
});

/* --------------------------------------------------------------------------
   SCROLL REVEAL — fade/slide suave ao entrar na tela
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   FAQ — acordeão acessível
   -------------------------------------------------------------------------- */
const FAQ_DATA = [
  { q: 'Como recebo o material depois de comprar?', a: 'Assim que o pagamento é aprovado, você recebe o link de acesso para baixar o PDF diretamente no seu e-mail e na plataforma de compra.' },
  { q: 'O material é em PDF?', a: 'Sim. O Plano de Estudos ENEM 90 Dias é um arquivo em PDF de mais de 150 páginas, pronto para usar.' },
  { q: 'Posso imprimir o planner?', a: 'Sim, o arquivo é otimizado para impressão caso você prefira preencher à mão.' },
  { q: 'Funciona no celular?', a: 'Sim. Você pode abrir e preencher o PDF direto no celular, usando qualquer aplicativo leitor de PDF.' },
  { q: 'O acesso é vitalício?', a: 'Sim, depois da compra o material é seu para sempre, sem mensalidade e sem prazo de expiração.' },
  { q: 'Recebo o acesso imediatamente?', a: 'Sim, a entrega é imediata após a confirmação do pagamento.' },
  { q: 'Preciso instalar algum aplicativo?', a: 'Não. Basta um leitor de PDF, que já vem instalado na maioria dos celulares e computadores.' },
  { q: 'Como faço o download do material?', a: 'Após a compra, você recebe um link de download que pode ser acessado quantas vezes precisar.' },
  { q: 'O produto tem garantia?', a: 'Sim, a compra é protegida por garantia conforme a política vigente da Cakto. Veja os detalhes na seção de garantia acima.' },
  { q: 'Consigo usar no tablet?', a: 'Sim, o PDF funciona normalmente em tablets, com boa leitura e possibilidade de preenchimento digital.' },
  { q: 'Posso usar no computador?', a: 'Sim, o material pode ser aberto em qualquer computador, Windows ou Mac, com um leitor de PDF comum.' },
  { q: 'Serve para quem está começando agora?', a: 'Sim. O plano foi pensado para organizar a rotina do zero, e funciona bem tanto para quem já estuda há um tempo quanto para quem está começando.' },
];

function initFAQ() {
  const list = document.getElementById('faq-list');
  if (!list) return;

  FAQ_DATA.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item reveal';

    const questionId = `faq-q-${index}`;
    const answerId = `faq-a-${index}`;

    faqItem.innerHTML = `
      <button class="faq-question" id="${questionId}" aria-expanded="false" aria-controls="${answerId}">
        <span>${item.q}</span>
        <span class="faq-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>
        </span>
      </button>
      <div class="faq-answer" id="${answerId}" role="region" aria-labelledby="${questionId}">
        <p>${item.a}</p>
      </div>
    `;

    list.appendChild(faqItem);
  });

  list.addEventListener('click', (event) => {
    const button = event.target.closest('.faq-question');
    if (!button) return;

    const item = button.closest('.faq-item');
    const isOpen = item.classList.contains('is-open');

    list.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
      openItem.classList.remove('is-open');
      openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
}

/* --------------------------------------------------------------------------
   DEPOIMENTOS — relatos ilustrativos, avatares genéricos com iniciais
   -------------------------------------------------------------------------- */
const TESTIMONIALS_DATA = [
  { name: 'Camila S.', text: 'Finalmente consegui organizar minha rotina e parei de perder tempo decidindo o que estudar.', color: '#2D9CDB' },
  { name: 'Rafael M.', text: 'O planner me ajudou a manter disciplina durante semanas seguidas de estudo.', color: '#123C73' },
  { name: 'Beatriz A.', text: 'O cronograma facilitou muito minha preparação, ficou mais fácil saber por onde continuar.', color: '#F2C94C' },
  { name: 'Lucas P.', text: 'Comecei a usar o checklist diário e minha produtividade mudou bastante.', color: '#27AE60' },
  { name: 'Fernanda R.', text: 'Gostei bastante do método de revisão, ajudou a fixar o conteúdo das matérias que eu mais esquecia.', color: '#2D9CDB' },
  { name: 'Gustavo T.', text: 'O planner mensal me deu uma visão melhor do meu progresso ao longo do plano.', color: '#123C73' },
  { name: 'Juliana C.', text: 'O controle de redação foi o que mais me ajudou a organizar os temas para treinar.', color: '#F2C94C' },
  { name: 'Pedro H.', text: 'Achei simples de usar, consegui seguir o cronograma sem complicação.', color: '#27AE60' },
  { name: 'Marina L.', text: 'A parte de controle de hábitos me ajudou a manter uma rotina de sono melhor durante os estudos.', color: '#2D9CDB' },
  { name: 'Diego F.', text: 'Estava sem direção nos estudos e o plano trouxe mais clareza para os meus dias.', color: '#123C73' },
];

function initTestimonials() {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  TESTIMONIALS_DATA.forEach((item) => {
    const initials = item.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const card = document.createElement('article');
    card.className = 'testimonial-card reveal';
    card.innerHTML = `
      <div class="testimonial-head">
        <span class="testimonial-avatar" style="background:${item.color}">${initials}</span>
        <div>
          <div class="testimonial-name">${item.name}</div>
          <div class="testimonial-stars" aria-label="5 de 5 estrelas">★★★★★</div>
        </div>
      </div>
      <p class="testimonial-text">"${item.text}"</p>
    `;
    grid.appendChild(card);
  });

  // Reobserva os novos elementos .reveal criados dinamicamente
  initScrollReveal();
}

/* --------------------------------------------------------------------------
   BARRA FLUTUANTE MOBILE — aparece após o hero
   -------------------------------------------------------------------------- */
function initMobileBar() {
  const bar = document.getElementById('mobile-bar');
  const hero = document.getElementById('hero');
  if (!bar || !hero) return;

  const toggleBar = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom < 0) {
      bar.classList.add('is-visible');
    } else {
      bar.classList.remove('is-visible');
    }
  };

  window.addEventListener('scroll', toggleBar, { passive: true });
  toggleBar();
}
