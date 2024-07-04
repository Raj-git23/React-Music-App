import React, { useState } from "react";

import { useSelector,useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setActiveSong, playPause } from "../redux/features/playerSlice";

import { Error, Loader } from "../components/Fetching";
import { useGetSongsBySearchQuery } from "../redux/services/APIcore";
import PlayPause from "../components/PlayPause";
import SearchBar from "../components/SearchBar";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  const [hoveredTrackIndex, setHoveredTrackIndex] = useState(null);

  const dispatch = useDispatch();

  const handlePlay = (track, index) => {
    dispatch(
      setActiveSong({ song: track, data: data, i: index })
    );
    dispatch(playPause(true));
  };

  const handlePause = () => {
    dispatch(playPause(false));
  };

  if (isFetching) return <Loader title="Loading charts" />;

  if (error) return <Error />;
  return (
    <>
      <div className="flex flex-col mb-24 pt-4 bg-gradient-to-b from-[#14254dbe] to-[#000000]">
      <SearchBar />
      <h2 className="flex ml-4 md:m-5 text-2xl md:text-5xl text-white mb-7">Showing results for ... {searchTerm}</h2>
      <hr className="h-px bg-gray-200 border-0 dark:bg-[#6f6868] w-[98%] ml-3 mb-3" />
        {data?.tracks?.items?.map((track, index) => (
          <div
            key={index}
            className="flex p-1 items-center rounded-lg hover:bg-[#14254dbe]/50 cursor-pointer ml-1 md:ml-4 pr-4 transition-all duration-300"
            onMouseEnter={() => setHoveredTrackIndex(index)}
            onMouseLeave={() => setHoveredTrackIndex(null)}
          >
            <div className="relative w-6 h-6 flex items-center pr-2 justify-center">
              {hoveredTrackIndex === index || activeSong?.id === track.id ? (
                <PlayPause
                  isPlaying={isPlaying}
                  activeTrack={activeSong?.id}
                  trackId={track.id}
                  previewUrl={track.preview_url}
                  handlePlay={() => handlePlay(track, index)}
                  handlePause={handlePause}
                />
              ) : null}
            </div>
            <img
              className="flex h-10 w-10 rounded-lg"
              src={track.album.images[0].url}
              alt={track.name}
            />
            <div className="flex flex-col w-3/4 md:w-30 lg:w-80 ml-3 mb-1">
              <p className="text-lg md w-3/4 md:w-60 overflow-hidden lg:w-7/12 truncate">{track.name}</p>
              <div className="hidden lg:flex w-3/4 md:w-30 lg:w-80 text-white/75 text-sm">
                {track.album.artists.map((artist, i) => (
                  <React.Fragment key={artist.id}>
                    <p>{artist.name}</p>
                    {i !== track.album.artists.length - 1 && (
                      <span className="mx-1">, </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <p className="hidden md:flex text-white/75 md:w-72 absolute truncate left-2/4 lg:left-[28rem] xl:left-[38rem]">
              {track.album.album_type}
            </p>
            <p className="absolute right-4 md:right-6 text-white/75">
              {`${Math.floor(track.duration_ms / 60000)}:${(
                (track.duration_ms % 60000) /
                1000
              )
                .toFixed(0)
                .padStart(2, "0")}`}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Search;
