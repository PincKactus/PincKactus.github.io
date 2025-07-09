---
layout: default
title: Shop
permalink: /shop/
---

# Shop

<div id="shop-grid" class="row g-4">
  <!-- items will go here -->
</div>
<p id="shop-error" class="text-danger"></p>

<script>
  document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('shop-grid')
    const errP = document.getElementById('shop-error')

    try {
      const res = await fetch('/.netlify/functions/get-shop')
      console.log('get-shop response:', res)
      if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`)
      const items = await res.json()
      console.log('get-shop JSON:', items)

      if (!Array.isArray(items) || items.length === 0) {
        grid.innerHTML = '<p>No items available right now.</p>'
        return
      }

      grid.innerHTML = items.map(item => `
        <div class="col-6 col-md-4">
          <div class="card h-100">
            <!-- IMAGE-->
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              class="card-img-top" 
              style="object-fit: cover; height: 150px;"
            >
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.desc}</p>
              <button class="btn btn-primary mt-auto" onclick="buy('${item.key}')">
                Buy for ${item.price} ${item.currency}
              </button>
            </div>
          </div>
        </div>
      `).join('')
    } catch (e) {
      console.error(e)
      errP.textContent = 'Error loading shop: ' + e.message
    }
  })

  async function buy(key) {
    try {
      const user = prompt('Enter your Discord ID:')
      const res = await fetch('/.netlify/functions/buy-item', {
        method: 'POST',
        body: JSON.stringify({ user, itemKey: key })
      })
      const json = await res.json()
      console.log('buy-item response:', json)
      if (json.success) {
        alert('Purchase successful!')
      } else {
        alert('Purchase failed: ' + (json.error || 'unknown error'))
      }
    } catch (e) {
      console.error(e)
      alert('Error during purchase: ' + e.message)
    }
  }
</script>
