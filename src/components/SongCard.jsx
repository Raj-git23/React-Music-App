import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";

const SongCard = ({ playlist, i, isPlaying, activeSong, data }) => {
  const dispatch = useDispatch();

  // console.log("playlistt data ---", playlist);
  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  // console.log(playlist.name);

  const handlePlayClick = () => {
    dispatch(setActiveSong({ i, playlist, data }));
    dispatch(playPause(true));
  };

  return (
    <>
      <Link
        to={`/playlists/${playlist.id}/${playlist.name}`}
        state={{ imageUrl: playlist.images[0]?.url }}
      >
        <div className="flex flex-col w-[180px] p-2 bg-opacity-80 backdrop-blur-sm ransform transition-transform duration-300 hover:scale-[1.05] hover:bg-[#27242b75] animate-slideup rounded-lg cursor-pointer">
          <div className="relative w-full h-fit group">
            {/* <div
              className={`absolute inset-0 justify-center items-center object-cover rounded-md bg-opacity-30 bg-[#5f5c6475] group-hover:flex ${
                activeSong?.name === playlist.name
                  ? "flex bg-black bg-opacity-70 "
                  : "hidden"
              }`}
            >
            </div> */}
            <img
              alt={`${playlist.name}_img`}
              src={playlist.images[0]?.url}
              className="rounded-lg h-full object-cover"
            />
          </div>

          <div className="mt-1 flex flex-col">
            <p className="font-semibold text-sm text-white truncate">
              {playlist.name}
            </p>
            <p className="text-[0.8rem] truncate text-gray-300 mt-1">
              {playlist.description}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SongCard;
