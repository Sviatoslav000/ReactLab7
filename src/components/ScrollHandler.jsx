import { useEffect } from 'react';

const ScrollHandler = () => {
  useEffect(() => {
    // Плавна поява сторінки
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 0.5s ease';
    }, 50);

    // Скрол до верху після reload
    if (sessionStorage.getItem('shouldScrollToTop') === 'true') {
      sessionStorage.removeItem('shouldScrollToTop');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }

    // Обробка натискань по посиланнях
    const handleLinkClick = (e) => {
      const link = e.currentTarget;
      const href = link.getAttribute('href');

      if (!href || href.includes('://')) return;

      // Якщо якір — скрол всередині сторінки
      if (href.startsWith('#')) {
        e.preventDefault();
        const anchor = href.substring(1);
        const target = document.getElementById(anchor);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
        return;
      }

      const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
      const targetPage = href.split('/').pop().replace('.html', '') || 'index';

      if (currentPage === targetPage) {
        e.preventDefault();
        if (href.includes('#')) {
          const anchor = href.split('#')[1];
          document.querySelector(`#${anchor}`)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        } else if (window.scrollY > 0) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      // Якщо інша сторінка — зникнення + перехід
      e.preventDefault();
      sessionStorage.setItem('shouldScrollToTop', 'true');
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    };

    // Обробка кнопок з location.href
    const handleButtonClick = function (e) {
      const onclickAttr = this.getAttribute('onclick');
      const hrefMatch = onclickAttr.match(/'([^']+)'/);

      if (hrefMatch && hrefMatch[1]) {
        e.preventDefault();
        sessionStorage.setItem('shouldScrollToTop', 'true');
        document.body.style.opacity = '0';
        setTimeout(() => {
          window.location.href = hrefMatch[1];
        }, 500);
      }
    };

    // Додаємо слухачі
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => link.addEventListener('click', handleLinkClick));

    const buttons = document.querySelectorAll('[onclick^="location.href"]');
    buttons.forEach(button => button.addEventListener('click', handleButtonClick));

    // Чистимо слухачі при виході
    return () => {
      links.forEach(link => link.removeEventListener('click', handleLinkClick));
      buttons.forEach(button => button.removeEventListener('click', handleButtonClick));
    };
  }, []);

  return null;
};

export default ScrollHandler;
