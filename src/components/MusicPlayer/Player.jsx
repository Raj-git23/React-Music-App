/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);

  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }
  
  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={activeSong?.preview_url}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
