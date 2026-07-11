/* ==========================================================================
   T&S Corporate Site - Main Script
   ========================================================================== */

// ---- モバイルメニュー開閉 ----
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // メニュー内リンククリックで閉じる
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ---- スクロールフェードイン（IntersectionObserver） ----
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.fade-in, .fade-in-stagger').forEach((el) => {
  observer.observe(el);
});

// ---- 人気商品カルーセル（souvenir.html のみ） ----
const carousel = document.getElementById('popular-carousel');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

if (carousel && prevBtn && nextBtn) {
  const scrollAmount = () => {
    const card = carousel.querySelector('.carousel-card');
    return card ? card.offsetWidth + 24 : 300;
  };
  prevBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
  });
  nextBtn.addEventListener('click', () => {
    carousel.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
  });
}
