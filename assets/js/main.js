(function () {

  document.addEventListener('DOMContentLoaded', function () {

    const toggleBtn = document.getElementById('themeToggle');
    const mobileToggleBtn = document.getElementById('themeToggleMobile');
    const toggleIcon = document.getElementById('themeIcon');

    // Load saved theme
    const savedTheme = localStorage.getItem('hubflow-theme') || 'light';

    function applyTheme(mode) {
      document.documentElement.setAttribute('data-theme', mode);
      document.documentElement.setAttribute('data-bs-theme', mode);
    }

    function updateIcon() {
      const current = document.documentElement.getAttribute('data-theme');
      if (toggleIcon) {
        toggleIcon.className = current === 'dark'
          ? 'bi bi-sun-fill'
          : 'bi bi-moon-fill';
      }

      const mobileIcon = document.getElementById('themeIconMobile');
      if (mobileIcon) {
        mobileIcon.className = current === 'dark'
          ? 'bi bi-sun-fill'
          : 'bi bi-moon-fill';
      }
    }

    function toggleTheme() {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';

      applyTheme(next);
      localStorage.setItem('hubflow-theme', next);
      updateIcon();
    }

    // Apply saved theme on page load
    applyTheme(savedTheme);
    updateIcon();

    if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
    if (mobileToggleBtn) mobileToggleBtn.addEventListener('click', toggleTheme);

  });

})();

const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar .nav-link, .navbar .dropdown-item').forEach(function (link) {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('active');
    const parent = link.closest('.dropdown');
    if (parent) parent.querySelector('.nav-link').classList.add('active');
  }
});
;
/* =========================
   SHOP FILTERS
========================= */
(function () {
  const shopGrid = document.querySelector(".product-card")?.closest(".row");
  if (!shopGrid) return;

  const productCards = document.querySelectorAll(".product-card");

  const categoryInputs = [
    { id: "catSoftware", value: "Software" },
    { id: "catHardware", value: "Hardware" },
    { id: "catTemplates", value: "Templates" },
    { id: "catPlugins", value: "Plugins" }
  ];

  const priceRadios = [
    { id: "priceAll", min: 0, max: Infinity },
    { id: "price1", min: 0, max: 24.99 },
    { id: "price2", min: 25, max: 50 },
    { id: "price3", min: 50, max: 100 },
    { id: "price4", min: 100, max: Infinity }
  ];

  function getSelectedCategories() {
    return categoryInputs
      .filter(c => document.getElementById(c.id)?.checked)
      .map(c => c.value);
  }

  function getSelectedPriceRange() {
    const selected = priceRadios.find(p => document.getElementById(p.id)?.checked);
    return selected || priceRadios[0];
  }

  function applyShopFilters() {
    const selectedCategories = getSelectedCategories();
    const selectedPrice = getSelectedPriceRange();

    productCards.forEach(card => {
      const cat = card.getAttribute("data-category");
      const price = parseFloat(card.getAttribute("data-price") || "0");

      const matchCategory = selectedCategories.length === 0 ? true : selectedCategories.includes(cat);
      const matchPrice = price >= selectedPrice.min && price <= selectedPrice.max;

      card.closest(".col-md-6")?.classList.toggle("d-none", !(matchCategory && matchPrice));
    });
  }

  // Listen to all filter inputs
  categoryInputs.forEach(c => {
    const el = document.getElementById(c.id);
    if (el) el.addEventListener("change", applyShopFilters);
  });

  priceRadios.forEach(p => {
    const el = document.getElementById(p.id);
    if (el) el.addEventListener("change", applyShopFilters);
  });

  // Run once on load
  applyShopFilters();
})();


/* =========================
   COURSES FILTER
========================= */
(function () {
  const courseButtons = document.querySelectorAll(".course-filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  if (courseButtons.length === 0 || courseCards.length === 0) return;

  function setActiveButton(activeBtn) {
    courseButtons.forEach(btn => {
      btn.classList.remove("btn-brand", "active");
      btn.classList.add("btn-outline-brand");
    });

    activeBtn.classList.remove("btn-outline-brand");
    activeBtn.classList.add("btn-brand", "active");
  }

  function filterCourses(category) {
    courseCards.forEach(card => {
      const cardCat = card.getAttribute("data-category");

      if (category === "All" || cardCat === category) {
        card.closest(".col-md-6")?.classList.remove("d-none");
      } else {
        card.closest(".col-md-6")?.classList.add("d-none");
      }
    });
  }

  courseButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      setActiveButton(this);
      filterCourses(filter);
    });
  });

  // default
  filterCourses("All");
})();

