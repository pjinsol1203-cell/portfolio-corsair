document.addEventListener('DOMContentLoaded', () => {
  const initCategoryToggles = () => {
    const togglePairs = Array.from(
      document.querySelectorAll('.guide-categories-toggle')
    ).map((button) => {
      const targetId = button.getAttribute('aria-controls');
      let list = null;
      if (targetId) {
        list = document.getElementById(targetId);
      }
      if (!list) {
        const sibling = button.nextElementSibling;
        if (sibling && sibling.classList?.contains('guide-categories')) {
          list = sibling;
        }
      }
      if (!list) return null;
      return { button, list };
    }).filter(Boolean);

    if (togglePairs.length === 0) return;

    const updateButtonLabel = (button, expanded) => {
      const openLabel = button.dataset.labelOpen?.trim() || '카테고리 열기';
      const closeLabel = button.dataset.labelClose?.trim() || '카테고리 닫기';
      button.textContent = expanded ? closeLabel : openLabel;
    };

    const applyResponsiveState = () => {
      const isCompact = window.innerWidth <= 480;
      togglePairs.forEach(({ button, list }) => {
        if (!isCompact) {
          list.classList.remove('is-open');
          list.removeAttribute('aria-hidden');
          button.setAttribute('aria-expanded', 'false');
          updateButtonLabel(button, false);
          return;
        }

        const expanded = button.getAttribute('aria-expanded') === 'true';
        list.classList.toggle('is-open', expanded);
        if (expanded) {
          list.removeAttribute('aria-hidden');
        } else {
          list.setAttribute('aria-hidden', 'true');
        }
        updateButtonLabel(button, expanded);
      });
    };

    togglePairs.forEach(({ button, list }) => {
      updateButtonLabel(button, false);
      list.setAttribute('aria-hidden', 'true');
      button.addEventListener('click', () => {
        if (window.innerWidth > 480) return;
        const expanded = button.getAttribute('aria-expanded') === 'true';
        const nextState = !expanded;
        button.setAttribute('aria-expanded', String(nextState));
        list.classList.toggle('is-open', nextState);
        if (nextState) {
          list.removeAttribute('aria-hidden');
        } else {
          list.setAttribute('aria-hidden', 'true');
        }
        updateButtonLabel(button, nextState);
      });
    });

    window.addEventListener('resize', applyResponsiveState);
    applyResponsiveState();
  };

  initCategoryToggles();

  const paginations = document.querySelectorAll('.guide-pagination');

  paginations.forEach((nav) => {
    const list = nav.querySelector('.guide-page-list');
    if (!list) return;

    const prevBtn = nav.querySelector('.guide-page.prev');
    const nextBtn = nav.querySelector('.guide-page.next');
    const pageButtons = Array.from(list.querySelectorAll('.guide-page'));

    if (pageButtons.length === 0) return;

    const pageNumbers = pageButtons.map((btn) => Number(btn.dataset.page));
    const minPage = Math.min(...pageNumbers);
    const maxPage = Math.max(...pageNumbers);
    const windowSize = Math.min(3, pageButtons.length);

    let currentPage = Number(list.dataset.current) || minPage;

    const findButton = (page) =>
      pageButtons.find((btn) => Number(btn.dataset.page) === page);

    const updateWindow = (page) => {
      currentPage = page;
      list.dataset.current = String(page);

      let start = page - Math.floor(windowSize / 2);
      start = Math.max(minPage, start);
      if (start + windowSize - 1 > maxPage) {
        start = Math.max(minPage, maxPage - windowSize + 1);
      }
      const end = Math.min(maxPage, start + windowSize - 1);

      pageButtons.forEach((btn) => {
        const pageValue = Number(btn.dataset.page);
        const isCurrent = pageValue === page;
        btn.classList.toggle('current', isCurrent);
        if (isCurrent) {
          btn.setAttribute('aria-current', 'page');
        } else {
          btn.removeAttribute('aria-current');
        }
        const visible = pageValue >= start && pageValue <= end;
        btn.classList.toggle('hidden', !visible);
      });

      prevBtn.disabled = page <= minPage;
      nextBtn.disabled = page >= maxPage;
    };

    const navigateTo = (page) => {
      const button = findButton(page);
      if (!button) return;
      updateWindow(page);

      const url = button.dataset.url;
      if (url && url !== '#') {
        window.location.href = url;
      }
    };

    updateWindow(currentPage);

    pageButtons.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.preventDefault();
        const targetPage = Number(btn.dataset.page);
        navigateTo(targetPage);
      });
    });

    prevBtn.addEventListener('click', () => {
      if (prevBtn.disabled) return;
      navigateTo(currentPage - 1);
    });

    nextBtn.addEventListener('click', () => {
      if (nextBtn.disabled) return;
      navigateTo(currentPage + 1);
    });
  });
});


