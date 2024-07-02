import axios from 'axios';
import {accessToken} from "../redux/services/spotifyApi";
const API_BASE_URL = 'https://api.spotify.com/v1';

// Function to play a track or playlist by URI
let token = accessToken;
const playTrack = async (token, uri) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/me/player/play`,
      { uris: [uri] },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to play track: ${error.message}`);
  }
};

export { playTrack };
