import axios from 'axios';
import React,{useEffect, useState} from 'react'; 

const CLIENT_ID = "2ff3345cce8c4b6980b427dd1bc3578d";
const CLIENT_SECRET = "3e41a6a532de4cb48f0dee95bb62101e";
const REDIRECT_URI = "http://localhost:5173/"; // Update with your redirect URI
const apiUrl = "https://accounts.spotify.com/authorize";
let accessToken = null;
let refreshToken = null;

async function authorizeUser() {
  const scopes = [
    'user-read-private', 'user-read-email', 'user-modify-playback-state',
    'user-read-playback-state', 'streaming'
  ];
  const authorizeUrl = `${apiUrl}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopes.join(" ")}&response_type=token&show_dialog=true`;
  window.location.href = authorizeUrl;
}

// async function handleCallback() {
//   const params = new URLSearchParams(window.location.search);
//   const code = params.get('code');

//   if (code) {
//     const response = await axios.post('https://accounts.spotify.com/api/token', null, {
//       params: {
//         grant_type: 'authorization_code',
//         code: code,
//         redirect_uri: REDIRECT_URI,
//         client_id: CLIENT_ID,
//         client_secret: CLIENT_SECRET,
//       },
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       }
//     });

//     accessToken = response.data.access_token;
//     refreshToken = response.data.refresh_token;

//     // Store tokens in local storage or cookies if needed
//     localStorage.setItem('access_token', accessToken);
//     localStorage.setItem('refresh_token', refreshToken);

//     // Remove the code from the URL
//     window.history.replaceState({}, document.title, "/");
//   }
// }

async function getAccessToken(){
  const [token, setToken] = useState();

    useEffect(() => {
        const hash = window.location.hash;
        const token = hash.split("&")[0].split("=")[1];
        console.log("token",token);

        window.localStorage.setItem("token", token);
        setToken(token);
    }, []);

    return token;
}

async function refreshAccessToken() {
  if (refreshToken) {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    accessToken = response.data.access_token;

    // Store new access token
    localStorage.setItem('access_token', accessToken);
  }
}

function useAccessToken() {
  if (!accessToken) {
    accessToken = localStorage.getItem('token');
  }

  // console.log(accessToken);
  return accessToken;
}

export { authorizeUser, refreshAccessToken, useAccessToken };
