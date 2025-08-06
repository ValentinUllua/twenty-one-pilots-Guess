// ⚠️ Reemplazá esto con tus propios datos
const clientId = 'e232229809ea492e973c4e7d1a3233d1';
const clientSecret = '9c6de402248a44cba91bcda69131b720';

const trackId = '4uLU6hMCjMI75M1A2tKUQC'; // Rick Astley (tiene preview_url)

// Obtener token
async function getToken() {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  if (!result.ok) {
    const errorText = await result.text();
    console.error("Error al obtener token:", errorText);
    throw new Error("No se pudo obtener el token");
  }

  const data = await result.json();
  console.log("🔐 Token obtenido:", data.access_token);
  return data.access_token;
}

// Reproducir preview
async function playPreview() {
  try {
    const token = await getToken();

    const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("❌ Error en API:", error);
      return;
    }

    const track = await res.json();
    console.log("🎵 Info de canción:", track);

    if (!track.preview_url) {
      alert("❌ Esta canción no tiene preview disponible.");
      return;
    }

    const audio = new Audio(track.preview_url);
    await audio.play();
    console.log("✅ Reproduciendo preview...");
  } catch (err) {
    console.error("⚠️ Error general:", err);
    alert("Hubo un error. Ver consola.");
  }
}
