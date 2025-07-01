---
layout: default
title: Kactus Gallery
permalink: /portfolio/
---

<section class="container py-5">
  <h2>Kactus Art</h2>
  <div class="row g-3">
    {% for img in site.static_files | where_exp: "f","f.path contains 'assets/img/kactus-art/'" %}
    <figure class="col-6 col-md-3">
      <a href="{{ img.path | relative_url }}" data-lightbox="kactus-art">
        <img src="{{ img.path | relative_url }}" class="img-fluid rounded" alt="">
      </a>
    </figure>
    {% endfor %}
  </div>
</section>

<section class="container py-5">
  <h2>Open Source Projects</h2>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col">
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">Kactus Force Bot</h5>
          <p class="card-text">Discord bot for achievements, currency, and utilities.</p>
          <a href="https://github.com/your-username/KactusForceBot" target="_blank" class="mt-auto btn btn-primary">View Repo</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="card h-100">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">This Website</h5>
          <p class="card-text">Static site on GitHub Pages built with Jekyll and Bootstrap.</p>
          <a href="https://your-username.github.io" target="_blank" class="mt-auto btn btn-primary">Visit Site</a>
        </div>
      </div>
    </div>
  </div>
</section>