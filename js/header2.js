document.addEventListener('DOMContentLoaded', () => {
  const MOBILE_BREAKPOINT = 768;
  const DESKTOP_COLLAPSE_BREAKPOINT = 1440;

  const headers = Array.from(document.querySelectorAll('.header2'))
    .map((header) => {
      const toggle = header.querySelector('.header2-toggle');
      const list = header.querySelector('.h2pcate');
      const more = header.querySelector('.header2-more');
      if (!toggle || !list) return null;

      const labels = {
        open: toggle.dataset.labelOpen?.trim() || '목록 열기',
        close: toggle.dataset.labelClose?.trim() || '목록 닫기',
      };

      const setExpanded = (expanded) => {
        toggle.setAttribute('aria-expanded', String(expanded));
        header.classList.toggle('is-open', expanded);
        toggle.textContent = expanded ? labels.close : labels.open;
      };

      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        setExpanded(!expanded);
      });

      setExpanded(false);

      const moreLabels = more
        ? {
            open: more.dataset.labelOpen?.trim() || '+ 더보기',
            close: more.dataset.labelClose?.trim() || '− 접기',
          }
        : null;

      const setMoreExpanded = (expanded) => {
        if (!more) return;
        header.classList.toggle('is-expanded', expanded);
        more.setAttribute('aria-expanded', String(expanded));
        more.textContent = expanded ? moreLabels.close : moreLabels.open;
      };

      if (more) {
        more.addEventListener('click', () => {
          const expanded = header.classList.contains('is-expanded');
          setMoreExpanded(!expanded);
        });
        setMoreExpanded(false);
      }

      list.addEventListener('click', (event) => {
        if (window.innerWidth > MOBILE_BREAKPOINT) return;
        if (event.target.closest('a')) {
          setExpanded(false);
        }
      });

      return { header, toggle, list, setExpanded, more, setMoreExpanded };
    })
    .filter(Boolean);

  const syncFromViewport = () => {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    const isMedium = window.innerWidth <= DESKTOP_COLLAPSE_BREAKPOINT && !isMobile;

    headers.forEach(({ header, setExpanded, toggle, more, setMoreExpanded }) => {
      if (!isMobile) {
        setExpanded(false);
      } else {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        setExpanded(expanded);
      }

      if (more && setMoreExpanded) {
        if (!isMedium) {
          setMoreExpanded(false);
        } else {
          const expanded = header.classList.contains('is-expanded');
          setMoreExpanded(expanded);
        }
      }
    });
  };

  if (headers.length > 0) {
    window.addEventListener('resize', syncFromViewport, { passive: true });
    syncFromViewport();
  }
});

