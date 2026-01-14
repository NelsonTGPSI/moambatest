// main.js — interatividade do site Moamba d'Angola
// Recursos:
// - Preloader
// - Navbar toggle
// - Smooth scroll (botão Ver Menu)
// - Parallax leve
// - IntersectionObserver para reveals
// - Lightbox para galeria
// - Lazy-load imagens do masonry (aplica data-src)

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/js/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registrado com sucesso:', registration.scope);
      })
      .catch(error => {
        console.log('Erro ao registrar ServiceWorker:', error);
      });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Preloader removed by user request
  // const preloader = document.getElementById('preloader');
  // if(preloader) {
  //   window.setTimeout(()=>{
  //     preloader.classList.add('hide');
  //     preloader.setAttribute('aria-hidden','true');
  //   }, 800);
  // }

  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Navbar toggle (mobile)
  // Navbar toggle (mobile)
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    // Toggle menu on hamburger click
    toggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent document click from closing immediately
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.classList.toggle('active'); // Optional: for animating hamburger to X
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
      }
    });
  }

  // Navbar show-on-scroll behaviour
  const navWrap = document.querySelector('.nav-wrap');
  const hero = document.querySelector('.hero');
  function updateNavScrolled() {
    if (window.scrollY > 40) {
      navWrap.classList.add('scrolled');
    } else {
      navWrap.classList.remove('scrolled');
    }
  }
  // If there's no hero on the page (separate pages), manter scrolled por omissão
  if (!hero) {
    navWrap.classList.add('scrolled');
  } else {
    // start depending on current scroll and listen for changes
    updateNavScrolled();
    window.addEventListener('scroll', updateNavScrolled, { passive: true });
  }

  // Smooth scroll for 'Ver Menu' (só existe na index)
  const seeMenu = document.getElementById('see-menu');
  if (seeMenu) {
    seeMenu.addEventListener('click', () => {
      const menu = document.getElementById('menu');
      if (menu) menu.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Simple parallax: move background position a little on scroll (desktop)
  const heroBg = document.querySelector('.hero-bg');
  function parallax() {
    if (!heroBg) return; // guard when page doesn't have a hero background
    if (window.innerWidth > 680) {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateY(${scrolled * 0.12}px)`;
    } else {
      heroBg.style.transform = '';
    }
  }
  window.addEventListener('scroll', parallax);
  parallax();

  // IntersectionObserver for reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach(r => io.observe(r));

  // Lightbox for gallery (guarded)
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    document.querySelectorAll('.m-item img').forEach(img => {
      // lazy injection of src from data-src if present
      if (img.dataset.src && !img.src) img.src = img.dataset.src;
      img.addEventListener('click', () => {
        if (lightboxImg) {
          lightboxImg.src = img.src;
          lightbox.setAttribute('aria-hidden', 'false');
          lightbox.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      });
    });
    function closeLightbox() {
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.style.display = 'none';
      if (lightboxImg) lightboxImg.src = '';
      document.body.style.overflow = '';
    }
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  }

  // Lazy-load for masonry images (if data-src exists)
  const lazyImgs = document.querySelectorAll('.m-item img[data-src]');
  const lazyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        lazyObserver.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  lazyImgs.forEach(i => lazyObserver.observe(i));

  // Close nav when clicking a link (mobile)
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }));

  // Highlight active nav link based on current path
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    // compare by removing .html extension for consistency
    const currentWithoutExt = current.replace('.html', '') || 'index';
    const hrefWithoutExt = href.replace('.html', '').split('/').pop();
    if (hrefWithoutExt === currentWithoutExt || (hrefWithoutExt === 'index' && (current === '' || current === 'index.html'))) {
      a.classList.add('active');
    }
  });

  // Small fade-in for hero logo (guarded)
  const heroLogo = document.querySelector('.hero-logo');
  if (heroLogo) {
    heroLogo.style.opacity = 0; heroLogo.style.transform = 'scale(.98)';
    setTimeout(() => { heroLogo.style.transition = 'all .9s cubic-bezier(.2,.9,.3,1)'; heroLogo.style.opacity = 1; heroLogo.style.transform = 'none'; }, 250);
  }
});
