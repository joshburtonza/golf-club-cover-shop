/**
 * Topped It - Shopify Theme JavaScript
 * Handles: Cart drawer, AJAX cart, sale ticker countdown, FAQ accordion,
 * purchase notifications, gallery interactions, catalogue scrolling
 */

(function() {
  'use strict';

  // ============================================
  // CART DRAWER (AJAX Cart API)
  // ============================================
  const CartDrawer = {
    drawer: null,
    overlay: null,
    body: null,
    footer: null,
    emptyState: null,
    countEl: null,
    totalEl: null,
    checkoutBtn: null,
    shippingText: null,
    shippingBar: null,
    subtitleEl: null,
    freeShippingThreshold: 500, // R500 default

    init() {
      this.drawer = document.getElementById('cart-drawer');
      this.overlay = document.getElementById('cart-drawer-overlay');
      this.body = document.getElementById('cart-drawer-body');
      this.footer = document.getElementById('cart-drawer-footer');
      this.emptyState = document.getElementById('cart-drawer-empty');
      this.countEl = document.getElementById('cart-count');
      this.totalEl = document.getElementById('cart-total-price');
      this.checkoutBtn = document.getElementById('cart-checkout-btn');
      this.shippingText = document.getElementById('cart-shipping-text');
      this.shippingBar = document.getElementById('cart-shipping-bar');
      this.subtitleEl = document.getElementById('cart-drawer-subtitle');

      if (!this.drawer) return;

      // Toggle button
      const toggle = document.getElementById('cart-toggle');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      }

      // Close button
      const close = document.getElementById('cart-drawer-close');
      if (close) close.addEventListener('click', () => this.close());

      // Overlay click
      if (this.overlay) this.overlay.addEventListener('click', () => this.close());

      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.close();
      });

      // Intercept add-to-cart forms
      this.interceptForms();

      // Initial cart fetch
      this.fetchCart();
    },

    interceptForms() {
      document.addEventListener('submit', (e) => {
        const form = e.target;
        if (form.action && form.action.includes('/cart/add')) {
          e.preventDefault();
          const formData = new FormData(form);
          this.addItem(formData);
        }
      });
    },

    async addItem(formData) {
      try {
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) throw new Error('Failed to add');
        await this.fetchCart();
        this.open();
      } catch (err) {
        console.error('Add to cart error:', err);
      }
    },

    async fetchCart() {
      try {
        const response = await fetch('/cart.js');
        const cart = await response.json();
        this.render(cart);
      } catch (err) {
        console.error('Fetch cart error:', err);
      }
    },

    async updateItem(key, quantity) {
      try {
        const response = await fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: key, quantity: quantity })
        });
        const cart = await response.json();
        this.render(cart);
      } catch (err) {
        console.error('Update cart error:', err);
      }
    },

    async removeItem(key) {
      this.updateItem(key, 0);
    },

    render(cart) {
      const count = cart.item_count;
      const total = cart.total_price; // In cents

      // Update cart count badge
      if (this.countEl) {
        if (count > 0) {
          this.countEl.textContent = count;
          this.countEl.style.display = 'flex';
        } else {
          this.countEl.style.display = 'none';
        }
      }

      // Update subtitle
      if (this.subtitleEl) {
        this.subtitleEl.textContent = count === 0
          ? "Emptier than the fairway after you've teed off"
          : count + ' item' + (count !== 1 ? 's' : '') + ' ready to upgrade your bag';
      }

      if (count === 0) {
        if (this.emptyState) this.emptyState.style.display = 'flex';
        if (this.footer) this.footer.style.display = 'none';
        // Clear items
        const items = this.body.querySelectorAll('.cart-item');
        items.forEach(el => el.remove());
        return;
      }

      if (this.emptyState) this.emptyState.style.display = 'none';
      if (this.footer) this.footer.style.display = 'block';

      // Update total
      if (this.totalEl) {
        this.totalEl.textContent = this.formatMoney(total);
      }

      // Update checkout button
      if (this.checkoutBtn) {
        this.checkoutBtn.textContent = 'Checkout \u2022 ' + this.formatMoney(total);
      }

      // Update free shipping bar
      this.updateShippingBar(total);

      // Render items
      const existingItems = this.body.querySelectorAll('.cart-item');
      existingItems.forEach(el => el.remove());

      // Remove the free-shipping bar if it's in the body (it's in the footer)
      cart.items.forEach((item) => {
        const el = this.createItemElement(item);
        this.body.appendChild(el);
      });
    },

    createItemElement(item) {
      const div = document.createElement('div');
      div.className = 'cart-item';

      const imgSrc = item.image ? this.getSizedImageUrl(item.image, '200x') : '';

      div.innerHTML = `
        <div class="cart-item__image">
          ${imgSrc ? '<img src="' + imgSrc + '" alt="' + this.escape(item.product_title) + '" loading="lazy">' : ''}
        </div>
        <div class="cart-item__info">
          <div>
            <h4 class="cart-item__title">${this.escape(item.product_title)}</h4>
            ${item.variant_title && item.variant_title !== 'Default Title' ? '<p class="cart-item__variant">' + this.escape(item.variant_title) + '</p>' : ''}
          </div>
          <p class="cart-item__price">${this.formatMoney(item.final_line_price)}</p>
        </div>
        <div class="cart-item__actions">
          <button class="cart-item__remove" data-remove="${item.key}" aria-label="Remove">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
          </button>
          <div class="cart-item__quantity">
            <button class="cart-item__qty-btn" data-change="${item.key}" data-qty="${item.quantity - 1}">−</button>
            <span class="cart-item__qty-value">${item.quantity}</span>
            <button class="cart-item__qty-btn" data-change="${item.key}" data-qty="${item.quantity + 1}">+</button>
          </div>
        </div>
      `;

      // Event listeners
      const removeBtn = div.querySelector('[data-remove]');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => this.removeItem(item.key));
      }

      const changeBtns = div.querySelectorAll('[data-change]');
      changeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.updateItem(btn.dataset.change, parseInt(btn.dataset.qty));
        });
      });

      return div;
    },

    updateShippingBar(totalCents) {
      const threshold = this.freeShippingThreshold * 100; // Convert to cents
      const remaining = threshold - totalCents;
      const progress = Math.min((totalCents / threshold) * 100, 100);

      if (this.shippingBar) {
        this.shippingBar.style.width = progress + '%';
      }

      if (this.shippingText) {
        if (remaining <= 0) {
          this.shippingText.innerHTML = '🎉 You\'ve unlocked free shipping!';
          const container = this.shippingText.closest('.free-shipping');
          if (container) container.classList.add('free-shipping--complete');
        } else {
          this.shippingText.innerHTML = 'Spend <span class="amount">' + this.formatMoney(remaining) + '</span> more for free shipping!';
          const container = this.shippingText.closest('.free-shipping');
          if (container) container.classList.remove('free-shipping--complete');
        }
      }
    },

    open() {
      if (this.drawer) this.drawer.classList.add('active');
      if (this.overlay) this.overlay.classList.add('active');
      document.body.classList.add('cart-open');
      this.fetchCart(); // Refresh
    },

    close() {
      if (this.drawer) this.drawer.classList.remove('active');
      if (this.overlay) this.overlay.classList.remove('active');
      document.body.classList.remove('cart-open');
    },

    formatMoney(cents) {
      return 'R ' + Math.round(cents / 100);
    },

    getSizedImageUrl(src, size) {
      if (!src) return '';
      // Shopify image URL resize pattern
      return src.replace(/(\.[^.]+)$/, '_' + size + '$1');
    },

    escape(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }
  };

  // ============================================
  // SALE TICKER COUNTDOWN
  // ============================================
  const SaleTicker = {
    init() {
      const ticker = document.getElementById('sale-ticker');
      if (!ticker) return;

      this.daysEl = ticker.querySelector('[data-days]');
      this.hoursEl = ticker.querySelector('[data-hours]');
      this.minutesEl = ticker.querySelector('[data-minutes]');
      this.secondsEl = ticker.querySelector('[data-seconds]');

      if (!this.hoursEl) return;

      this.cycleDays = 3;
      this.update();
      setInterval(() => this.update(), 1000);
    },

    getEndDate() {
      const now = new Date();
      const cycleMs = this.cycleDays * 24 * 60 * 60 * 1000;
      const epoch = new Date('2025-01-01T00:00:00Z').getTime();
      const timeSinceEpoch = now.getTime() - epoch;
      const currentCycle = Math.floor(timeSinceEpoch / cycleMs);
      return new Date(epoch + (currentCycle + 1) * cycleMs);
    },

    update() {
      const end = this.getEndDate();
      const diff = end.getTime() - Date.now();

      if (diff <= 0) {
        // Cycle reset
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const pad = (n) => n.toString().padStart(2, '0');

      if (this.daysEl) {
        if (days > 0) {
          this.daysEl.textContent = days + 'd';
          this.daysEl.style.display = '';
          const sep = this.daysEl.nextElementSibling;
          if (sep) sep.style.display = '';
        } else {
          this.daysEl.style.display = 'none';
          const sep = this.daysEl.nextElementSibling;
          if (sep) sep.style.display = 'none';
        }
      }
      if (this.hoursEl) this.hoursEl.textContent = pad(hours);
      if (this.minutesEl) this.minutesEl.textContent = pad(minutes);
      if (this.secondsEl) this.secondsEl.textContent = pad(seconds);
    }
  };

  // ============================================
  // FAQ ACCORDION
  // ============================================
  const FAQ = {
    init() {
      document.querySelectorAll('[data-faq-trigger]').forEach(trigger => {
        trigger.addEventListener('click', () => {
          const item = trigger.closest('[data-faq-item]');
          if (!item) return;

          const isActive = item.classList.contains('active');

          // Close all
          document.querySelectorAll('[data-faq-item]').forEach(el => {
            el.classList.remove('active');
          });

          // Toggle current
          if (!isActive) {
            item.classList.add('active');
          }
        });
      });
    }
  };

  // ============================================
  // PURCHASE NOTIFICATIONS (Social Proof)
  // ============================================
  const PurchaseNotifications = {
    notification: null,
    names: [
      'Sipho', 'Thabo', 'Johan', 'Pieter', 'Craig',
      'David', 'Mark', 'André', 'Willem', 'Jacques',
      'Bongani', 'Mandla', 'Ryan', 'Shane', 'Deon'
    ],
    cities: [
      'Johannesburg', 'Cape Town', 'Durban', 'Pretoria',
      'Port Elizabeth', 'Bloemfontein', 'Stellenbosch',
      'Sandton', 'Umhlanga', 'Centurion', 'Somerset West'
    ],
    products: [
      'a Gilmore 18 headcover', 'the 3-Pack Bundle',
      'a 100% Lucky headcover', 'the Build Your Own Bundle',
      'a Topped It headcover set'
    ],
    times: [
      '1 minute ago', '2 minutes ago', '3 minutes ago',
      '5 minutes ago', '8 minutes ago', '12 minutes ago'
    ],

    init() {
      this.notification = document.getElementById('purchase-notification');
      if (!this.notification) return;

      // Show first after 15-30 seconds
      const firstDelay = Math.random() * 15000 + 15000;
      setTimeout(() => this.show(), firstDelay);
    },

    show() {
      const nameEl = document.getElementById('notification-name');
      const cityEl = document.getElementById('notification-city');
      const productEl = document.getElementById('notification-product');
      const timeEl = document.getElementById('notification-time');

      if (nameEl) nameEl.textContent = this.random(this.names);
      if (cityEl) cityEl.textContent = this.random(this.cities);
      if (productEl) productEl.textContent = this.random(this.products);
      if (timeEl) timeEl.textContent = this.random(this.times);

      this.notification.classList.add('visible');

      // Hide after 5 seconds
      setTimeout(() => {
        this.notification.classList.remove('visible');

        // Schedule next in 20-60 seconds
        const nextDelay = Math.random() * 40000 + 20000;
        setTimeout(() => this.show(), nextDelay);
      }, 5000);
    },

    random(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  };

  // ============================================
  // PRODUCT GALLERY (Style gallery image swap)
  // ============================================
  window.changeGalleryImage = function(galleryId, imageUrl, thumbEl) {
    const mainImg = document.getElementById('gallery-main-' + galleryId);
    if (mainImg) {
      mainImg.src = imageUrl;
    }

    // Update active thumb
    const parent = thumbEl.closest('.product-gallery__style');
    if (parent) {
      parent.querySelectorAll('.product-gallery__thumb').forEach(t => t.classList.remove('active'));
    }
    thumbEl.classList.add('active');
  };

  // Product page image swap
  window.changeProductImage = function(imageUrl, thumbEl) {
    const mainImg = document.getElementById('product-main-img');
    if (mainImg) {
      mainImg.src = imageUrl;
    }

    document.querySelectorAll('.product-page__thumb').forEach(t => t.classList.remove('active'));
    thumbEl.classList.add('active');
  };

  // ============================================
  // CATALOGUE SCROLL
  // ============================================
  window.scrollCatalogue = function(direction) {
    const container = document.getElementById('catalogue-scroll');
    if (!container) return;
    const cardWidth = window.innerWidth < 640 ? 256 : 304; // Approximate card + gap
    container.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  };

  // ============================================
  // LIVE VIEWERS (random update)
  // ============================================
  const LiveViewers = {
    init() {
      const el = document.getElementById('live-viewers-count');
      if (!el) return;

      setInterval(() => {
        const current = parseInt(el.textContent) || 5;
        const change = Math.random() > 0.5 ? 1 : -1;
        const newVal = Math.max(2, Math.min(12, current + change));
        el.textContent = newVal;
      }, 8000);
    }
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    CartDrawer.init();
    SaleTicker.init();
    FAQ.init();
    PurchaseNotifications.init();
    LiveViewers.init();
  });

})();
