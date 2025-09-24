<<<<<<< HEAD
"use server"
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
=======
// Coloque suas credenciais do Spotify
const CLIENT_ID = 'b36f46a6fb1b487b816c59738f7d29d1';
const CLIENT_SECRET = 'a9db02fa2c5346b2added151baf25834';
>>>>>>> 8127fdc37f0992b23fd9e263b75fbec2af526e80

 async function getAccessToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
<<<<<<< HEAD
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
=======
        'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
>>>>>>> 8127fdc37f0992b23fd9e263b75fbec2af526e80
      },
      body: 'grant_type=client_credentials',
    });
  
    const data = await response.json();
    return data.access_token;
  }
  
   export async function buscarMusica(nomeMusica) {
    const token = await getAccessToken();
  
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(nomeMusica)}&type=track&limit=3`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  
    const data = await response.json();
    
    return data.tracks.items.map(track => ({
      nome: track.name,
      artista: track.artists.map(a => a.name).join(', '),
      album: track.album.name,
      thumb: track.album.images[0]?.url || null, // primeira imagem do �lbum
      url: track.external_urls.spotify
    }));
  }
  