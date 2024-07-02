// src/components/SpotifyPlayerComponent.js
import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const SpotifyPlayerComponent = ({ token, uris, isPlaying, callback }) => {
  return (
    <SpotifyPlayer
      token={token}
      uris={uris}
      play={isPlaying}
      styles={{
        activeColor: '#fff',
        bgColor: '#3d1857c4',
        color: '#fff',
        loaderColor: '#fff',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
        height: '74px',
      }}
    />
  );
};

export default SpotifyPlayerComponent;
