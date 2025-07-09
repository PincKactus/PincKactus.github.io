---
layout: default
title: Kactus Gallery
permalink: /kactus-gallery/
---

<section class="container py-5">
  <h2 class="mb-4">Kactus Art</h2>

  {% assign art = site.static_files 
       | where_exp: "f", "f.path contains 'assets/img/kactus-art/'" %}
  {% if art.size > 0 %}
    <div class="row g-3">
      {% for img in art %}
        <figure class="col-6 col-md-3">
          <a href="{{ img.path | relative_url }}" data-lightbox="kactus-art">
            <img 
              src="{{ img.path | relative_url }}" 
              class="img-fluid rounded" 
              alt="Kactus Art {{ forloop.index }}"
            >
          </a>
        </figure>
      {% endfor %}
    </div>
  {% else %}
    <p class="text-muted">No artworks uploaded yet—check back soon!</p>
  {% endif %}
</section>


<section class="container py-5">
  <h2 class="mb-4">Open Source Projects</h2>
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <!-- Project #1 -->
    <div class="col">
      <div class="card h-100 shadow-sm">
        <img 
          src="/assets/img/projects/kactus-force-screenshot.png" 
          class="card-img-top" 
          alt="Kactus Force Bot screenshot"
        >
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">Kactus Force Bot</h5>
          <p class="card-text">
            A Discord bot for achievements, multi-currency, games & utilities.
          </p>
          <a 
            href="https://github.com/your-username/KactusForceBot" 
            target="_blank" 
            class="mt-auto btn btn-primary"
          >
            View Repo
          </a>
        </div>
      </div>
    </div>

    <!-- Project #2 -->
    <div class="col">
      <div class="card h-100 shadow-sm">
        <img 
          src="/assets/img/projects/website-screenshot.png" 
          class="card-img-top" 
          alt="This website screenshot"
        >
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">This Website</h5>
          <p class="card-text">
            Built with Jekyll & Bootstrap, hosted on GitHub Pages + Netlify Functions.
          </p>
          <a 
            href="https://your-username.github.io" 
            target="_blank" 
            class="mt-auto btn btn-primary"
          >
            Visit Site
          </a>
        </div>
      </div>
    </div>

    <!-- ← you can copy/paste one of the above <div class="col">...</div> blocks to add more cards -->
  </div>
</section>


<section class="container py-5">
  <h2 class="mb-4">Documentation & Tutorials</h2>
  <div class="list-group">
    <a 
      href="/bot/index.html" 
      class="list-group-item list-group-item-action"
    >
      📖 Kactus Force Instruction Manuals
    </a>
    <a 
      href="/bot/currency.html" 
      class="list-group-item list-group-item-action"
    >
      💱 Currency &amp; Shop Guide
    </a>
    <a 
      href="/bot/achievements.html" 
      class="list-group-item list-group-item-action"
    >
      🏅 Achievements Guide
    </a>
  </div>
</section>
