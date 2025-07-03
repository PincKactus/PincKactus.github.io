---
layout: default
title: Shop
permalink: /shop/
---

# Shop

<div id="shop-grid" class="row g-4"></div>
<script>
  async function loadShop() {
    const items = await fetch('/.netlify/functions/get-shop').then(r=>r.json());
    document.getElementById('shop-grid').innerHTML = items.map(item => `
      <div class="col-6 col-md-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.desc}</p>
            <button class="btn btn-primary mt-auto" onclick="buy('${item.key}')">
              Buy for ${item.price}${item.currency}
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  async function buy(key) {
    const user = prompt('Enter your Discord ID:');
    const resp = await fetch('/.netlify/functions/buy-item', {
      method: 'POST',
      body: JSON.stringify({ user, itemKey: key })
    }).then(r=>r.json());
    alert(resp.success ? 'Purchase successful!' : `Error: ${resp.error}`);
    loadShop(); // reload items or you can reload balances separately
  }

  loadShop();
</script>
