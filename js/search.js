function setupSearch(searchInputId, clearBtnId, containerId) {
  const searchInput = document.getElementById(searchInputId);
  const clearBtn = document.getElementById(clearBtnId);
  const container = document.getElementById(containerId);
  const wrapper = container.closest('.video-scroll-wrapper');
  const searchContainer = searchInput.closest('.search-container');
  const suggestionButtons = searchContainer.querySelectorAll('.search-suggestions button');

  clearBtn.style.visibility = 'hidden';

  function handleScrollShadow() {
    if (!wrapper) return;
    
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;
    
    wrapper.classList.toggle('hide-end-shadow', isAtEnd);
  }

  container.addEventListener('scroll', handleScrollShadow);
  
  handleScrollShadow();

  function filterVideos(filterTerm = searchInput.value.toLowerCase().trim(), isFilterButton = false) {
    const hasQuery = filterTerm.length > 0;
    const videoItems = container.querySelectorAll('.video-item');

    videoItems.forEach(item => {
      const isSeasonHeader = item.querySelector('.video-placeholder') !== null;
      if (isSeasonHeader) {
        item.style.display = 'none';
        return;
      }

      const titleEl = item.querySelector('.video-title');
      const title = titleEl?.textContent?.toLowerCase() || '';
      const season = item.getAttribute('data-temporada')?.toLowerCase() || '';
      const tags = item.getAttribute('data-tags')?.toLowerCase() || '';

      const matches = title.includes(filterTerm) || 
            season.includes(filterTerm) ||
              `temporada ${season}`.includes(filterTerm) ||
                  tags.includes(filterTerm);

      item.style.display = matches ? 'block' : 'none';
    });

    let currentSeason = null;
    let hasVisibleVideos = false;
    videoItems.forEach(item => {
      const isSeasonHeader = item.querySelector('.video-placeholder') !== null;
      if (isSeasonHeader) {
        if (hasVisibleVideos && currentSeason !== null) {
          item.style.display = 'block';
        }
        currentSeason = item.querySelector('.video-placeholder')?.textContent?.toLowerCase() || null;
        hasVisibleVideos = false;
      } else if (item.style.display === 'block') {
        hasVisibleVideos = true;
      }
    });

    if (!isFilterButton) {
      clearBtn.style.visibility = hasQuery ? 'visible' : 'hidden';
    } else {
      clearBtn.style.visibility = 'hidden';
    }

    if (wrapper) {
      wrapper.classList.toggle('hide-shadow', hasQuery);
      handleScrollShadow();
    }
  }

  searchInput.addEventListener('input', () => {
    suggestionButtons.forEach(btn => {
      btn.classList.remove('active');
      const closeBtn = btn.querySelector('.close-filter');
      if (closeBtn) {
        closeBtn.remove();
      }
    });
    filterVideos(); 
  });

  suggestionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault(); 
      const filterTerm = button.getAttribute('data-filter')?.toLowerCase() || '';
      
      suggestionButtons.forEach(btn => {
        btn.classList.remove('active');
        const closeBtn = btn.querySelector('.close-filter');
        if (closeBtn) {
          closeBtn.remove();
        }
      });
      
      button.classList.add('active');
      
      filterVideos(filterTerm, true);
      
      
      const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (!isMobile) {
        searchInput.focus();
      }
      
      const closeBtn = document.createElement('img');
      closeBtn.className = 'close-filter';
      closeBtn.src = 'assets/images/close.png';
      closeBtn.alt = 'Cerrar filtro';
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        button.classList.remove('active');
        searchInput.value = '';
        filterVideos('', false);
        closeBtn.remove();
      });
      button.appendChild(closeBtn);
    });
    
    button.addEventListener('touchend', (e) => {
      if (document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur();
      }
    });
  });

  searchInput.addEventListener('focus', () => {
    wrapper?.classList.add('hide-shadow');
  });

  searchInput.addEventListener('blur', () => {
    if (searchInput.value.trim() === '') {
      wrapper?.classList.remove('hide-shadow');
    }
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    filterVideos('', false);
    searchInput.blur();
    
    suggestionButtons.forEach(btn => {
      btn.classList.remove('active');
      const closeBtn = btn.querySelector('.close-filter');
      if (closeBtn) {
        closeBtn.remove();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupSearch('radioSearch', 'radioClearBtn', 'radio-container');
  setupSearch('videoSearch', 'videoClearBtn', 'video-container');
});