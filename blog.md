---
layout: default
title: Blog
permalink: /blog/
---

# Blog

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <small class="text-muted">— {{ post.date | date: "%B %-d, %Y" }}</small>
    </li>
  {% endfor %}
</ul>
