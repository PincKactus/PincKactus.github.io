

// contact.js

// Replace this with your actual webhook URL:
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1301372361701982298/RKnI9gXB4LRlmP_6HYHXZI8GrlHJXhnFBj8grCL4jBbh67mZSfrr64Y90bj3ndukmAJv',

document.getElementById('contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  const payload = {
    content:
      `**New Contact Submission**\n` +
      `**Name:** ${document.getElementById('name').value}\n` +
      `**Email:** ${document.getElementById('email').value}\n` +
      `**Message:** ${document.getElementById('message').value}`
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(res.statusText);
    document.getElementById('status').textContent = 'Message sent! 🎉';
    document.getElementById('contact-form').reset();
  } catch (err) {
    document.getElementById('status').textContent = 'Error sending message.';
  }
});
