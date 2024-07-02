import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { nextSong, prevSong, playPause } from '../../redux/features/playerSlice';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './SeekBar';
import VolumeBar from './VolumeBar';
import Track from './Track';

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs.length && activeSong) {
      dispatch(playPause(true));
    }
  }, [currentIndex, activeSong, dispatch, currentSongs.length]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handleTimeUpdate = (event) => {
    setAppTime(event.target.currentTime);
  };

  const handleLoadedData = (event) => {
    setDuration(event.target.duration);
  };

  return (
    <div className="flex z-10 fixed h-20 w-full bottom-0 justify-between items-center bg-[#3d1857c4] backdrop-blur-sm">
      <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
      <div className="flex flex-col item-center items-center">
      <Controls
        isPlaying={isPlaying}
        isActive={isActive}
        repeat={repeat}
        setRepeat={setRepeat}
        shuffle={shuffle}
        setShuffle={setShuffle}
        currentSongs={currentSongs}
        handlePlayPause={handlePlayPause}
        handlePrevSong={handlePrevSong}
        handleNextSong={handleNextSong}
      />
      <Seekbar
        value={appTime}
        min="0"
        max={duration}
        onInput={(event) => setSeekTime(event.target.value)}
        setSeekTime={setSeekTime}
        appTime={appTime}
      />
      <Player
        activeSong={activeSong}
        volume={volume}
        isPlaying={isPlaying}
        seekTime={seekTime}
        repeat={repeat}
        onEnded={handleNextSong}
        onTimeUpdate={handleTimeUpdate}
        onLoadedData={handleLoadedData}
        key={activeSong?.key} // Add key to ensure re-render on song change
      />
      </div>
      <VolumeBar value={volume} min="0" max="1" onChange={(event) => setVolume(event.target.value)} setVolume={setVolume} />
    </div>
  );
}

export default MusicPlayer;
