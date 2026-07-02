// モバイルメニューの開閉
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });

  // ナビ内リンクをタップしたら閉じる
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
  });
}

// Google Maps は iframe 読み込みが完了しないことがあるため、クリック時のみ表示
document.querySelectorAll('.map-embed').forEach((mapEmbed) => {
  const loadBtn = mapEmbed.querySelector('.map-load-btn');
  const mapSrc = mapEmbed.dataset.mapSrc;
  if (!loadBtn || !mapSrc) return;

  loadBtn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.title = '会場地図：神戸ハーバーランド 浜の手 デュオドーム';
    iframe.src = mapSrc;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    iframe.allowFullscreen = true;

    mapEmbed.querySelector('.map-placeholder')?.remove();
    mapEmbed.insertBefore(iframe, mapEmbed.querySelector('.map-cta'));
  });
});
}

// スクロールで各セクションをふわっと表示
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document
  .querySelectorAll('.pillar, .exp-card, .plan-card, .org-card, .merit-item, .outline-table, .map-embed')
  .forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });
