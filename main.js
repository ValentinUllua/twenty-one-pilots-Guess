// ⚠️ Reemplazá con tus credenciales reales de Spotify
const clientId = 'e232229809ea492e973c4e7d1a3233d1';
const clientSecret = '9c6de402248a44cba91bcda69131b720';

// Una canción de ejemplo (ID de Spotify)
const trackId = '5ChkMS8OtdzJeqyybCc9R5'; // Mr. Brightside – The Killers
const correctAnswer = 'stressed out';

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

  if (!response.ok) {
    console.error("Error al obtener el track:", await response.text());
    return;
  }

  const data = await response.json();
  console.log("Track info:", data);

  if (!data.preview_url) {
    alert("❌ Esta canción no tiene preview disponible.");
    return;
  }

  const audio = new Audio(data.preview_url);
  audio.play().then(() => {
    console.log("Reproduciendo...");
  }).catch(err => {
    console.error("Error al reproducir el audio:", err);
    alert("⚠️ Tu navegador bloqueó el audio. Intentá nuevamente.");
  });
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
