// src/spotifyApi.js
import axios from 'axios';

// Replace with your Client ID and Client Secret
const CLIENT_ID = '2ff3345cce8c4b6980b427dd1bc3578d';
const CLIENT_SECRET = '3e41a6a532de4cb48f0dee95bb62101e';

async function getAccessToken() {
  const response = await axios.post('https://accounts.spotify.com/api/token', null, {
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    }
  });

  return response.data.access_token;
}

export default getAccessToken;
