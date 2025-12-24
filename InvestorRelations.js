    // JavaScript functionality (can be placed in separate .js file)
    (function(){
      const btn = document.getElementById('investor-btn');
      const menu = document.getElementById('investor-menu');
      const dropdown = document.getElementById('investor-dropdown');
      const items = Array.from(menu.querySelectorAll('[role="menuitem"]'));

      function openMenu() {
        menu.hidden = false;
        btn.setAttribute('aria-expanded','true');
        // focus first item for keyboard users
        items[0]?.focus();
      }
      function closeMenu() {
        menu.hidden = true;
        btn.setAttribute('aria-expanded','false');
        btn.focus();
      }
      function toggleMenu() {
        if (menu.hidden) openMenu(); else closeMenu();
      }

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
      });

      // close when clicking outside
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) closeMenu();
      });

      // keyboard support
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); openMenu(); }
        if (e.key === 'ArrowUp') { e.preventDefault(); openMenu(); items[items.length-1]?.focus(); }
      });

      menu.addEventListener('keydown', (e) => {
        const idx = items.indexOf(document.activeElement);
        if (e.key === 'Escape') { closeMenu(); }
        else if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx+1) % items.length].focus(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); items[(idx-1+items.length) % items.length].focus(); }
        else if (e.key === 'Home') { e.preventDefault(); items[0].focus(); }
        else if (e.key === 'End') { e.preventDefault(); items[items.length-1].focus(); }
        else if (e.key === 'Tab') { closeMenu(); } // allow tab to move on
      });

      // close when a menu item is activated
      items.forEach(i => i.addEventListener('click', () => closeMenu()));
    })();
  