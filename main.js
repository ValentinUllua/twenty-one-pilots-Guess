// ⚠️ Reemplazá con tus credenciales reales de Spotify
const clientId = 'e232229809ea492e973c4e7d1a3233d1';
const clientSecret = '9c6de402248a44cba91bcda69131b720';

// Una canción de ejemplo (ID de Spotify)
const trackId = '6DzXaIgVIH7oLA1pkUtFaG'; // Mr. Brightside – The Killers
const correctAnswer = 'The contract';

// Obtener token de acceso desde Spotify
async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });
  const data = await response.json();
  return data.access_token;
}

// Reproducir el preview
async function playPreview() {
  const token = await getToken();
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  const data = await response.json();
  const audio = new Audio(data.preview_url);
  audio.play();
}

// Eventos
document.getElementById('play-button').addEventListener('click', () => {
  playPreview();
});

document.getElementById('submit-button').addEventListener('click', () => {
  const userGuess = document.getElementById('guess').value.trim().toLowerCase();
  const isCorrect = userGuess.includes(correctAnswer.toLowerCase());
  document.getElementById('result').textContent = isCorrect
    ? '✅ ¡Correcto!'
    : '❌ Intenta de nuevo...';
});
