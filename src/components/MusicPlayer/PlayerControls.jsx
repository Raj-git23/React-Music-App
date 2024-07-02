import React, { useState,useEffect } from 'react';
import { FiShuffle, FiSkipBack, FiSkipForward, FiRepeat } from 'react-icons/fi';
import { FaPlay } from "react-icons/fa";
import SeekBar from './SeekBar'; // Import the Seekbar component
import Controls from './Controls'; // Import the Controls component
import Player from './Player';
import { useSelector, useDispatch } from 'react-redux';


function PlayerControls() {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

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

  return (
    <div className="flex flex-col items-center w-1/2">
      <Controls
        isPlaying={isPlaying}
        repeat={repeat}
        setRepeat={setRepeat}
        shuffle={shuffle}
        setShuffle={setShuffle}
        currentSongs={currentSongs}
        handlePlayPause={handlePlayPause}
        handlePrevSong={handlePrevSong}
        handleNextSong={handleNextSong}
      />
      <div className="flex items-center space-x-2 w-full">
        <SeekBar
          value={seekTime}
          min={0}
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={seekTime}
        />
      </div>
      <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
    </div>
  );
}

export default PlayerControls;
