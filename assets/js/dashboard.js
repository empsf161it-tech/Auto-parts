/* ==========================================================================
   AUTO PARTS - DASHBOARD LOGIC (STEP 9.9)
   Handles Admin & User dashboard views, tab switching, mock data, and KPI charts.
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initRoleSwitch();
    initTabNavigation();
    initOrderSearch();
    initNotifications();
  });

  // Role Switcher: Admin Dashboard <-> User Dashboard
  function initRoleSwitch() {
    const roleToggle = document.getElementById('role-toggle-btn');
    const adminPanel = document.getElementById('panel-admin');
    const userPanel = document.getElementById('panel-user');
    const roleLabel = document.getElementById('current-role-label');

    if (!roleToggle || !adminPanel || !userPanel) return;

    let currentRole = 'admin';

    roleToggle.addEventListener('click', () => {
      if (currentRole === 'admin') {
        currentRole = 'user';
        adminPanel.style.display = 'none';
        userPanel.style.display = 'block';
        roleLabel.textContent = 'User Dashboard';
        roleToggle.innerHTML = '<i class="ri-admin-line"></i> Switch to Admin View';
      } else {
        currentRole = 'admin';
        userPanel.style.display = 'none';
        adminPanel.style.display = 'block';
        roleLabel.textContent = 'Admin Console';
        roleToggle.innerHTML = '<i class="ri-user-line"></i> Switch to User View';
      }
    });
  }

  // Sidebar Tab Navigation
  function initTabNavigation() {
    const navItems = document.querySelectorAll('.dashboard-nav-item');

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetSection = item.getAttribute('data-target');
        const parentPanel = item.closest('.dashboard-panel') || document;

        // Active class on tabs
        parentPanel.querySelectorAll('.dashboard-nav-item').forEach(btn => btn.classList.remove('active'));
        item.classList.add('active');

        // Show target section, hide others
        if (targetSection) {
          parentPanel.querySelectorAll('.dashboard-tab-content').forEach(section => {
            section.style.display = 'none';
          });
          const targetEl = document.getElementById(targetSection);
          if (targetEl) {
            targetEl.style.display = 'block';
          }
        }
      });
    });
  }

  // Mock Table Filter / Search
  function initOrderSearch() {
    const orderSearchInput = document.getElementById('order-search-input');
    if (!orderSearchInput) return;

    orderSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const rows = document.querySelectorAll('.orders-table tbody tr');

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // Quick Notification trigger
  function initNotifications() {
    const dismissBtns = document.querySelectorAll('.btn-dismiss-alert');
    dismissBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const alertBox = btn.closest('.alert-item');
        if (alertBox) {
          alertBox.style.opacity = '0';
          setTimeout(() => alertBox.remove(), 250);
        }
      });
    });
  }
})();
