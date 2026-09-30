/* ==========================================================================
   AUTO PARTS - MAIN JAVASCRIPT SYSTEM
   Handles Theme Toggle, RTL Support, Mobile Drawer, Sticky Nav, Form Validation,
   Vehicle Selector, Cart Interactivity, and Animations.
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. THEME TOGGLE (STEP 6) ---
  const THEME_STORAGE_KEY = 'autoparts_theme';
  const RTL_STORAGE_KEY = 'autoparts_rtl';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme);

    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      });
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeIcons('ri-sun-line', 'ri-moon-line');
    } else {
      document.documentElement.removeAttribute('data-theme');
      updateThemeIcons('ri-moon-line', 'ri-sun-line');
    }
  }

  function updateThemeIcons(activeIcon, removeIcon) {
    const icons = document.querySelectorAll('.theme-toggle-btn i');
    icons.forEach(icon => {
      icon.className = activeIcon;
    });
  }

  // --- 2. RTL TOGGLE (STEP 5) ---
  function initRTL() {
    const isRtl = localStorage.getItem(RTL_STORAGE_KEY) === 'true';
    applyRTL(isRtl);

    const rtlButtons = document.querySelectorAll('.rtl-toggle-btn');
    rtlButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const currentlyRtl = document.documentElement.getAttribute('dir') === 'rtl';
        const nextRtl = !currentlyRtl;
        applyRTL(nextRtl);
        localStorage.setItem(RTL_STORAGE_KEY, nextRtl);
      });
    });
  }

  function applyRTL(isRtl) {
    const rtlStylesheet = document.getElementById('rtl-stylesheet');

    if (isRtl) {
      document.documentElement.setAttribute('dir', 'rtl');
      document.body.classList.add('rtl');
      if (rtlStylesheet) {
        rtlStylesheet.removeAttribute('disabled');
      }
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.body.classList.remove('rtl');
      if (rtlStylesheet) {
        rtlStylesheet.setAttribute('disabled', 'true');
      }
    }
  }

  // --- 3. NAVBAR & HAMBURGER DRAWER (STEP 4) ---
  function initNavbar() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const drawerBackdrop = document.querySelector('.drawer-backdrop');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const drawerCloseBtn = document.querySelector('.drawer-close-btn');

    function openDrawer() {
      if (mobileDrawer && drawerBackdrop) {
        mobileDrawer.classList.add('active');
        drawerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (mobileDrawer && drawerBackdrop) {
        mobileDrawer.classList.remove('active');
        drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
    if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

    // Close drawer when a link is clicked
    const drawerLinks = document.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

    // Sticky header shadow on scroll
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });
  }

  // --- 4. VEHICLE SELECTOR INTERACTIVITY ---
  function initVehicleFinder() {
    const yearSelect = document.getElementById('finder-year');
    const makeSelect = document.getElementById('finder-make');
    const modelSelect = document.getElementById('finder-model');
    const engineSelect = document.getElementById('finder-engine');
    const finderForm = document.getElementById('vehicle-finder-form');

    const vehicleData = {
      Toyota: {
        models: ['Supra GR', 'Tacoma TRD', 'Camry SE', 'RAV4 Hybrid'],
        engines: ['3.0L Turbo Inline-6', '3.5L V6', '2.5L 4-Cylinder', '2.5L Hybrid AWD']
      },
      BMW: {
        models: ['M3 Competition (G80)', 'M5 CS (F90)', '330i M-Sport', 'X5 M50i'],
        engines: ['3.0L Twin-Turbo S58', '4.4L Twin-Turbo V8', '2.0L Turbo B48', 'B58 3.0L Inline-6']
      },
      Ford: {
        models: ['Mustang GT (S650)', 'F-150 Raptor', 'Bronco Badlands', 'Focus RS'],
        engines: ['5.0L Coyote V8', '3.5L EcoBoost High Output', '2.7L Twin-Turbo V6', '2.3L EcoBoost']
      },
      Porsche: {
        models: ['911 GT3 (992)', 'Cayman GT4 RS', 'Taycan Turbo S', 'Macan GTS'],
        engines: ['4.0L Naturally Aspirated Boxer-6', '2.9L Twin-Turbo V6', 'Dual Electric Motors', '3.0L Turbo']
      },
      Audi: {
        models: ['RS6 Avant', 'RS3 Sedan', 'R8 V10 Performance', 'S5 Coupe'],
        engines: ['4.0L Twin-Turbo V8 TFSI', '2.5L Turbo 5-Cylinder', '5.2L Naturally Aspirated V10', '3.0L V6 Turbo']
      }
    };

    if (makeSelect && modelSelect && engineSelect) {
      makeSelect.addEventListener('change', () => {
        const selectedMake = makeSelect.value;
        modelSelect.innerHTML = '<option value="">Select Model</option>';
        engineSelect.innerHTML = '<option value="">Select Engine / Trim</option>';

        if (vehicleData[selectedMake]) {
          vehicleData[selectedMake].models.forEach(model => {
            const opt = document.createElement('option');
            opt.value = model;
            opt.textContent = model;
            modelSelect.appendChild(opt);
          });
          modelSelect.disabled = false;
        } else {
          modelSelect.disabled = true;
          engineSelect.disabled = true;
        }
      });

      modelSelect.addEventListener('change', () => {
        const selectedMake = makeSelect.value;
        engineSelect.innerHTML = '<option value="">Select Engine / Trim</option>';

        if (vehicleData[selectedMake]) {
          vehicleData[selectedMake].engines.forEach(eng => {
            const opt = document.createElement('option');
            opt.value = eng;
            opt.textContent = eng;
            engineSelect.appendChild(opt);
          });
          engineSelect.disabled = false;
        }
      });
    }

    if (finderForm) {
      finderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const year = yearSelect ? yearSelect.value : '';
        const make = makeSelect ? makeSelect.value : '';
        const model = modelSelect ? modelSelect.value : '';

        if (!make || !model) {
          alert('Please select your vehicle make and model to view compatible parts.');
          return;
        }

        // Redirect to shop with parameters or filter
        window.location.href = `shop.html?year=${encodeURIComponent(year)}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}`;
      });
    }
  }

  // --- 5. SHOPPING CART SIMULATOR & TOAST NOTIFICATION ---
  function initCartSimulator() {
    let cartCount = parseInt(localStorage.getItem('autoparts_cart_count') || '2', 10);
    updateCartBadges(cartCount);

    const addButtons = document.querySelectorAll('.btn-add-cart');
    addButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const partName = btn.getAttribute('data-name') || 'High-Performance Auto Part';
        cartCount++;
        localStorage.setItem('autoparts_cart_count', cartCount.toString());
        updateCartBadges(cartCount);
        showToast(`Added to Garage Cart: ${partName}`);
      });
    });
  }

  function updateCartBadges(count) {
    const badges = document.querySelectorAll('.cart-counter-badge');
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  function showToast(message) {
    let toast = document.getElementById('global-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'global-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        inset-inline-end: 24px;
        background: var(--color-primary);
        color: #ffffff;
        padding: 14px 22px;
        border-radius: var(--radius-global);
        border: 1px solid var(--color-accent);
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 2000;
        font-family: var(--font-heading);
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="ri-checkbox-circle-fill" style="color:var(--color-accent); font-size:1.2rem;"></i> ${message}`;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
      toast.style.transform = 'translateY(100px)';
      toast.style.opacity = '0';
    }, 3200);
  }

  // --- 6. STEP 12 FORM VALIDATION ---
  function initFormValidation() {
    const forms = document.querySelectorAll('form[data-validate="true"]');

    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset previous field errors
        form.querySelectorAll('.form-field').forEach(field => {
          field.classList.remove('error', 'success');
        });

        // 1. Text & Email & Password Inputs
        const requiredInputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        requiredInputs.forEach(input => {
          const field = input.closest('.form-field') || input.parentElement;
          const val = input.value.trim();
          let fieldValid = true;
          let errorText = 'This field is required';

          if (!val) {
            fieldValid = false;
          } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(val)) {
              fieldValid = false;
              errorText = 'Please enter a valid email address';
            }
          } else if (input.type === 'password' && input.name === 'password') {
            if (val.length < 8) {
              fieldValid = false;
              errorText = 'Password must be at least 8 characters';
            }
          } else if (input.name === 'confirm_password') {
            const passwordInput = form.querySelector('input[name="password"]');
            if (passwordInput && val !== passwordInput.value) {
              fieldValid = false;
              errorText = 'Passwords do not match';
            }
          }

          const errorMsg = field.querySelector('.error-msg');
          if (errorMsg) errorMsg.textContent = errorText;

          if (!fieldValid) {
            field.classList.add('error');
            field.classList.remove('success');
            isValid = false;
          } else {
            field.classList.remove('error');
            field.classList.add('success');
          }
        });

        // 2. Terms Checkbox
        const termsCheckbox = form.querySelector('input[type="checkbox"][name="terms"]');
        if (termsCheckbox) {
          const field = termsCheckbox.closest('.form-field') || termsCheckbox.parentElement;
          if (!termsCheckbox.checked) {
            field.classList.add('error');
            const errorMsg = field.querySelector('.error-msg');
            if (errorMsg) errorMsg.textContent = 'You must accept the terms and conditions';
            isValid = false;
          } else {
            field.classList.remove('error');
          }
        }

        if (isValid) {
          const feedback = form.querySelector('.form-feedback');
          if (feedback) {
            feedback.className = 'form-feedback success';
            feedback.textContent = form.getAttribute('data-success-msg') || 'Form submitted successfully! Processing request...';
            feedback.style.display = 'block';
          }

          // Handle auth redirects or clears
          if (form.id === 'login-form') {
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
          } else if (form.id === 'register-form') {
            setTimeout(() => { window.location.href = 'login.html'; }, 1200);
          } else {
            form.reset();
          }
        }
      });
    });
  }

  // --- 7. COUNTDOWN TIMER FOR COMING SOON ---
  function initCountdown() {
    const countdownEl = document.getElementById('countdown-timer');
    if (!countdownEl) return;

    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 24); // 24 days ahead

    function update() {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) return;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const dEl = document.getElementById('days');
      const hEl = document.getElementById('hours');
      const mEl = document.getElementById('minutes');
      const sEl = document.getElementById('seconds');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // --- BACK TO TOP BUTTON ---
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btn.classList.add('show');
      } else {
        btn.classList.remove('show');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- INITIALIZE ALL ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initNavbar();
    initVehicleFinder();
    initCartSimulator();
    initFormValidation();
    initCountdown();
    initBackToTop();
  });
})();

