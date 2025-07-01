---
layout: default
title: Contact
permalink: /contact/
---

<section class="container py-5">
  <h2>Contact Me</h2>
  <form id="contact-form">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input type="text" id="name" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="email" id="email" class="form-control" required>
    </div>
    <div class="mb-3">
      <label for="message" class="form-label">Message</label>
      <textarea id="message" class="form-control" rows="4" required></textarea>
    </div>
    <button type="submit" class="btn btn-success">Send</button>
    <div id="status" class="mt-3"></div>
  </form>
</section>