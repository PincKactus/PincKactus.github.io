---
layout: default
title: Contact
permalink: /contact/
---

# Contact

<p class="text-muted">Have a question, bug report, or idea? Drop me a note below.</p>

<form name="contact" method="POST" action="{{ '/thank-you/' | relative_url }}" data-netlify="true" netlify-honeypot="bot-field">
  <!-- Required hidden input for Netlify Forms -->
  <input type="hidden" name="form-name" value="contact">
  <!-- Honeypot (spam trap) -->
  <p class="d-none">
    <label>Don’t fill this out if you're human: <input name="bot-field"></label>
  </p>

  <div class="mb-3">
    <label class="form-label">Your name</label>
    <input class="form-control" type="text" name="name" required>
  </div>

  <div class="mb-3">
    <label class="form-label">Email</label>
    <input class="form-control" type="email" name="email" required>
  </div>

  <div class="mb-3">
    <label class="form-label">Message</label>
    <textarea class="form-control" name="message" rows="6" required></textarea>
  </div>

  <!-- If you later enable Netlify reCAPTCHA, uncomment:
  <div class="mb-3" data-netlify-recaptcha="true"></div>
  -->

  <button class="btn btn-primary" type="submit">Send</button>
</form>

<p class="mt-3 small text-muted">This form is processed by Netlify Forms.</p>
