function setupSearch(searchInputId, clearBtnId, containerId) {
  const searchInput = document.getElementById(searchInputId);
  const clearBtn = document.getElementById(clearBtnId);
  const icon = clearBtn.querySelector('.icon');
  const container = document.getElementById(containerId);
  const wrapper = container.closest('.video-scroll-wrapper');

  function filterVideos() {
    const query = searchInput.value.toLowerCase().trim();
    const videoItems = container.querySelectorAll('.video-item');

    videoItems.forEach(item => {
      const titleEl = item.querySelector('.video-title');
      const text = titleEl?.textContent?.toLowerCase() || '';
      item.style.display = text.includes(query) ? 'block' : 'none';
    });

    const hasQuery = query !== '';
    icon.textContent = hasQuery ? '❌' : '';
    clearBtn.style.visibility = hasQuery ? 'visible' : 'hidden';

    if (wrapper) {
      wrapper.classList.toggle('hide-shadow', hasQuery);
    }
  }

  searchInput.addEventListener('input', filterVideos);

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
    filterVideos();
    searchInput.blur();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupSearch('radioSearch', 'radioClear', 'radio-container');
  setupSearch('videoSearch', 'videoClear', 'video-container');
});
