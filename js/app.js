// تطبيق منصة الذكاء الاصطناعي الفاخرة - AI NEXUS ELITE
// POWERED BY AMIR ADEL

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentCategory = 'all';
  let currentPricing = 'all';
  let searchQuery = '';

  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');
  const categoriesContainer = document.getElementById('categoriesPills');
  const toolsGrid = document.getElementById('toolsGrid');
  const resultsCount = document.getElementById('resultsCount');
  const pricingButtons = document.querySelectorAll('.pricing-btn');
  const totalToolsCountEl = document.getElementById('totalToolsCount');

  // Modal Elements
  const toolModal = document.getElementById('toolModal');
  const modalClose = document.getElementById('modalClose');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalCreator = document.getElementById('modalCreator');
  const modalBadge = document.getElementById('modalBadge');
  const modalTagline = document.getElementById('modalTagline');
  const modalDesc = document.getElementById('modalDesc');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalBestFor = document.getElementById('modalBestFor');
  const modalLaunchBtn = document.getElementById('modalLaunchBtn');

  // Initialize total count
  if (totalToolsCountEl) {
    totalToolsCountEl.textContent = aiTools.length;
  }

  // Calculate category counts
  function updateCategoryCounts() {
    aiCategories.forEach(cat => {
      if (cat.id === 'all') {
        cat.count = aiTools.length;
      } else {
        cat.count = aiTools.filter(tool => tool.category === cat.id).length;
      }
    });
  }

  // Render Category Pills
  function renderCategories() {
    updateCategoryCounts();
    categoriesContainer.innerHTML = '';

    aiCategories.forEach(cat => {
      const pill = document.createElement('button');
      pill.className = `category-pill ${cat.id === currentCategory ? 'active' : ''}`;
      pill.innerHTML = `
        <i class="${cat.icon}"></i>
        <span>${cat.name}</span>
        <span class="pill-count">${cat.count}</span>
      `;
      pill.addEventListener('click', () => {
        currentCategory = cat.id;
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        renderTools();
      });
      categoriesContainer.appendChild(pill);
    });
  }

  // Filter tools based on state
  function getFilteredTools() {
    return aiTools.filter(tool => {
      // Category match
      const categoryMatch = (currentCategory === 'all') || (tool.category === currentCategory);

      // Pricing match
      let pricingMatch = true;
      if (currentPricing !== 'all') {
        if (currentPricing === 'free') {
          pricingMatch = tool.pricing.toLowerCase().includes('free') && !tool.pricing.toLowerCase().includes('freemium');
        } else if (currentPricing === 'freemium') {
          pricingMatch = tool.pricing.toLowerCase().includes('freemium');
        } else if (currentPricing === 'paid') {
          pricingMatch = tool.pricing.toLowerCase().includes('paid');
        }
      }

      // Search query match
      let searchMatch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        searchMatch = 
          tool.name.toLowerCase().includes(query) ||
          tool.creator.toLowerCase().includes(query) ||
          tool.tagline.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.bestFor.toLowerCase().includes(query) ||
          tool.features.some(f => f.toLowerCase().includes(query));
      }

      return categoryMatch && pricingMatch && searchMatch;
    });
  }

  // Get Pricing Badge Class
  function getPricingBadgeClass(pricing) {
    const p = pricing.toLowerCase();
    if (p.includes('freemium')) return 'badge-freemium';
    if (p.includes('free')) return 'badge-free';
    return 'badge-paid';
  }

  // Render Tools Grid
  function renderTools() {
    const filtered = getFilteredTools();
    resultsCount.textContent = filtered.length;

    if (filtered.length === 0) {
      toolsGrid.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-compass-drafting"></i>
          <h3>لم يتم العثور على أي أداة تطابق بحثك</h3>
          <p>جرب تغيير كلمات البحث أو اختيار تصنيف آخر لاستعراض الأدوات المتاحة.</p>
        </div>
      `;
      return;
    }

    toolsGrid.innerHTML = '';
    filtered.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'tool-card';
      
      const badgeClass = getPricingBadgeClass(tool.pricing);

      // Features preview (first 2 items)
      const featuresListHtml = tool.features.slice(0, 2).map(feat => `
        <li>
          <i class="fa-solid fa-circle-check"></i>
          <span>${feat}</span>
        </li>
      `).join('');

      card.innerHTML = `
        <div class="tool-card-header">
          <div class="tool-identity">
            <div class="tool-icon-frame">
              <img src="${tool.icon}" alt="${tool.name}" onerror="this.src='https://cdn-icons-png.flaticon.com/512/2103/2103832.png'">
            </div>
            <div class="tool-names">
              <h3 class="tool-title">${tool.name}</h3>
              <span class="tool-creator">${tool.creator}</span>
            </div>
          </div>
          <span class="tool-badge-pill ${badgeClass}">${tool.pricing}</span>
        </div>

        <h4 class="tool-tagline">${tool.tagline}</h4>
        <p class="tool-description">${tool.description}</p>

        <ul class="tool-features-preview">
          ${featuresListHtml}
        </ul>

        <div class="tool-card-actions">
          <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="btn-launch-tool">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span>استخدام الأداة</span>
          </a>
          <button class="btn-details-tool" data-id="${tool.id}">
            <i class="fa-solid fa-circle-info"></i>
            <span>التفاصيل</span>
          </button>
        </div>
      `;

      // Event listener for details modal
      const detailsBtn = card.querySelector('.btn-details-tool');
      detailsBtn.addEventListener('click', () => {
        openModal(tool);
      });

      toolsGrid.appendChild(card);
    });
  }

  // Open Tool Modal
  function openModal(tool) {
    modalIcon.src = tool.icon;
    modalIcon.onerror = () => { modalIcon.src = 'https://cdn-icons-png.flaticon.com/512/2103/2103832.png'; };
    modalTitle.textContent = tool.name;
    modalCreator.textContent = `المطور: ${tool.creator}`;
    modalBadge.textContent = tool.pricing;
    modalBadge.className = `tool-badge-pill ${getPricingBadgeClass(tool.pricing)}`;
    
    modalTagline.textContent = tool.tagline;
    modalDesc.textContent = tool.description;
    modalBestFor.textContent = tool.bestFor;
    modalLaunchBtn.href = tool.url;

    // Render all features
    modalFeatures.innerHTML = tool.features.map(f => `
      <li>
        <i class="fa-solid fa-check-double"></i>
        <span>${f}</span>
      </li>
    `).join('');

    toolModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close Modal
  function closeModal() {
    toolModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  modalClose.addEventListener('click', closeModal);
  toolModal.addEventListener('click', (e) => {
    if (e.target === toolModal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toolModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Search Input Handler
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (searchQuery.length > 0) {
      searchClear.style.display = 'block';
    } else {
      searchClear.style.display = 'none';
    }
    renderTools();
  });

  // Clear Search
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClear.style.display = 'none';
    renderTools();
    searchInput.focus();
  });

  // Pricing Filter Handler
  pricingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pricingButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPricing = btn.getAttribute('data-pricing');
      renderTools();
    });
  });

  // Ambient Glow Mouse Follow (Subtle effect)
  const ambientGlow = document.querySelector('.ambient-glow.top-left');
  window.addEventListener('mousemove', (e) => {
    if (ambientGlow) {
      const x = (e.clientX / window.innerWidth - 0.5) * 60;
      const y = (e.clientY / window.innerHeight - 0.5) * 60;
      ambientGlow.style.transform = `translate(${x}px, ${y}px)`;
    }
  });

  // Initial Render
  renderCategories();
  renderTools();
});
