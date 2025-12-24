// ...existing code...

// Add this block to integrate Media Kit button behaviour
(function() {
  const mediaBtn = document.querySelector('.filter-btn[data-filter="media"]');
  const pressBtn = document.querySelector('.filter-btn[data-filter="all"]');
  const mediaSection = document.getElementById('mediaKitSection');
  const newsroomGrid = document.getElementById('newsroomGrid');

  if (!mediaBtn || !mediaSection) return;

  function showMediaKit() {
    // hide newsroom grid, show media kit
    newsroomGrid.style.display = 'none';
    mediaSection.hidden = false;
    mediaSection.setAttribute('aria-hidden', 'false');
    mediaSection.style.display = '';
    mediaSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function showNewsroomGrid() {
    // show newsroom grid, hide media kit
    mediaSection.hidden = true;
    mediaSection.setAttribute('aria-hidden', 'true');
    mediaSection.style.display = 'none';
    newsroomGrid.style.display = '';
    newsroomGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  mediaBtn.addEventListener('click', () => {
    // keep filter button active state logic if exists
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    mediaBtn.classList.add('active');
    showMediaKit();
  });

  if (pressBtn) {
    pressBtn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      pressBtn.classList.add('active');
      showNewsroomGrid();
    });
  }

  // If search or other filters toggle back to grid, ensure media hidden
  const searchEl = document.getElementById('newsSearch');
  if (searchEl) {
    searchEl.addEventListener('input', () => {
      if (searchEl.value.trim() !== '') {
        showNewsroomGrid();
      }
    });
  }
})();