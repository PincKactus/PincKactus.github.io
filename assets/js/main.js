// main.js

// Fetch a random quote from Official Joke API
document.getElementById('new-quote').addEventListener('click', () => {
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(res => res.json())
    .then(joke => {
      document.getElementById('quote').textContent =
        `"${joke.setup}" — ${joke.punchline}`;
    })
    .catch(() => {
      document.getElementById('quote').textContent =
        'Oops! Couldn’t fetch a joke. Try again later.';
    });
});
