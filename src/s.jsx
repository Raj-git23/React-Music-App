import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveSong, nextSong, prevSong } from './redux/features/playerSlice';
import SpotifyWebApi from 'spotify-web-api-js';

const SpotifyPlayer = () => {
  const dispatch = useDispatch();
  const { currentSongs, currentIndex, isPlaying, activeSong } = useSelector((state) => state.player);
  const spotifyApi = useRef(new SpotifyWebApi());
  const token = 'YOUR_SPOTIFY_ACCESS_TOKEN'; // Replace with your access token

  useEffect(() => {
    spotifyApi.current.setAccessToken(token);

    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      player.addListener('player_state_changed', (state) => {
        if (!state) return;

        dispatch(playPause(!state.paused));
        if (state.track_window.current_track.uri !== activeSong.uri) {
          const currentTrack = state.track_window.current_track;
          dispatch(setActiveSong({ song: currentTrack, data: { tracks: { items: currentSongs } }, i: currentIndex }));
        }
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        spotifyApi.current.transferMyPlayback([device_id]);
      });

      player.connect();
    };

    return () => {
      if (window.Spotify && window.Spotify.Player) {
        window.Spotify.Player.removeListener('player_state_changed');
      }
    };
  }, [dispatch, currentSongs, currentIndex, activeSong.uri, token]);

  const handlePlayPause = () => {
    if (isPlaying) {
      spotifyApi.current.pause();
      dispatch(playPause(false));
    } else {
      spotifyApi.current.play();
      dispatch(playPause(true));
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % currentSongs.length;
    dispatch(nextSong(nextIndex));
    const nextTrackUri = currentSongs[nextIndex].track.uri;
    spotifyApi.current.play({ uris: [nextTrackUri] });
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + currentSongs.length) % currentSongs.length;
    dispatch(prevSong(prevIndex));
    const prevTrackUri = currentSongs[prevIndex].track.uri;
    spotifyApi.current.play({ uris: [prevTrackUri] });
  };

  return (
    <div>
      <button onClick={handlePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default SpotifyPlayer;
