import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { FaPlay, FaPause } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlayPause = ({ isPlaying, activeTrack, previewUrl, trackId, handlePlay, handlePause, position }) => {
  const dispatch = useDispatch();

  const handlePlayPauseClick = () => {
    if (!previewUrl) {
      toast.error('This song is not playable');
      return;
    }
    if (isPlaying && activeTrack === trackId) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  return (
    <>
    <button onClick={handlePlayPauseClick}
    className={`${position === 'center' ? 'absolute inset-0 flex justify-center items-center' : 'relative w-6 h-6 flex items-center justify-center'}`}
    >
      {isPlaying && activeTrack === trackId ? (
        <FaPause className="w-4 h-4 text-white transition-opacity duration-300 opacity-100 items-center" />
      ) : (
        <FaPlay className="w-4 h-4 text-white transition-opacity duration-300 opacity-100 items-center" />
      )}
    </button>
    <ToastContainer /></>
  );
};

export default PlayPause;
