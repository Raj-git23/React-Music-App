import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay, FaPause } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import {
  useGetArtistTracksByIdQuery,
  useGetPlaylistTrackByIdQuery,
} from "../redux/services/APIcore"; // Adjust these import paths accordingly
import PlayPause from "../components/PlayPause";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import Track from "../components/MusicPlayer/Track";

const Details = ({ type }) => {
  const { id, name } = useParams();
  const location = useLocation();

  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const [hoveredTrackIndex, setHoveredTrackIndex] = useState(null);

  const handlePlay = (track, index) => {
    dispatch(
      setActiveSong({ song: track, data: { tracks: [track] }, i: index })
    );
    dispatch(playPause(true));
  };

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const queryResult =
    type === "artist"
      ? useGetArtistTracksByIdQuery(id)
      : useGetPlaylistTrackByIdQuery(id);

  const { data, isLoading, error } = queryResult;

  useEffect(() => {
    if (type && id) {
      console.log(type, "---", id);
    }

    if (data) {
      console.log(type, "--", data);
    }
    if (error) {
      console.log("Error fetching data:", error);
    }
  }, [data, error, type, id]);

  const imageUrl = location.state?.imageUrl; // Getting the imageUrl from the location state
  const length = type === "artist" ? data?.tracks?.length : data?.items?.length;

  return type === "artist" ? (
    <div className="flex rounded-lg flex-col mb-24 justify-center bg-gradient-to-b from-[#ad7d0db7] to-[#000000]">
      <SearchBar />
      <div className="flex ml-6 mb-4 items-center">
        {imageUrl && (
          <img src={imageUrl} className="h-48 w-48 rounded-lg" alt="Artist" />
        )}
        <div className="flex flex-col ml-6 text-white">
          <p className="text-sm text-white/60 mt-1 ml-2">Artist</p>
          <p className="font-bold mt-1 text-8xl">{name}</p>
          <p className="text-white/55 text-lg">{`${length} Songs`}</p>
        </div>
      </div>
      <div className="flex flex-col mt-4">
        {data?.tracks?.map((track, index) => (
          <div
            key={index}
            className="flex p-1 items-center rounded-lg hover:bg-[#554526ea]/50 cursor-pointer ml-4 transition-all duration-300"
            onMouseEnter={() => setHoveredTrackIndex(index)}
            onMouseLeave={() => setHoveredTrackIndex(null)}
          >
            <div className="relative w-6 h-6 mr-4 flex items-center justify-center">
              {hoveredTrackIndex === index || activeSong?.id === track.id ? (
                <PlayPause
                  isPlaying={isPlaying}
                  activeTrack={activeSong?.id}
                  trackId={track.id}
                  previewUrl={track.preview_url}
                  handlePlay={() => handlePlay(track, index)}
                  handlePause={handlePause}
                />
              ) : (
                <p className="text-white/55 transition-opacity duration-300 opacity-100">
                  {index + 1}
                </p>
              )}
            </div>
            <img
              className="flex h-10 w-10 rounded-lg"
              src={track.album.images[0].url}
              alt={track.name}
            />
            <div className="flex flex-col sm:w-40 md:w-48 lg:w-80 ml-3 mb-1">
              <p className="text-lg truncate">{track.name}</p>
              <div className="flex truncate text-white/75 text-sm">
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
            <p className="text-white/75 absolute truncate left-2/4 lg:left-[28rem] xl:left-[38rem]">
              {track.album.name}
            </p>
            <p className="absolute right-4 text-white/75">
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
    </div>
  ) : (
    <div className="flex rounded-lg flex-col mb-24 justify-center">
      <div className="bg-[#c49424f8]">
        <SearchBar />
      </div>
      <div className="flex pl-6 bg-gradient-to-b from-[#c49424f8] to-[#000000] pb-4 items-center">
        {imageUrl && (
          <img
            src={imageUrl}
            className="h-48 w-48 rounded-lg"
            alt="Playlist or Album"
          />
        )}
        <div className="flex flex-col ml-6 text-white">
          <p className="text-sm text-white/60 mt-1 ml-2">
            {type === "playlist" ? "Playlist" : "Album"}
          </p>
          <p className="font-bold mt-1 text-6xl">{name}</p>
          <p className="text-white/55 text-lg">{`${length} Songs`}</p>
        </div>
      </div>
      <div className="flex flex-col pt-6 bg-gradient-to-b from-[#000000] to-[#000000]">
        {data?.items?.map((playlist, index) => (
          <div
            key={index}
            className="flex p-1 items-center rounded-lg hover:bg-[#554526ea]/50 cursor-pointer ml-4 transition-all duration-300"
            onMouseEnter={() => setHoveredTrackIndex(index)}
            onMouseLeave={() => setHoveredTrackIndex(null)}
          >
            <div className="relative w-6 h-6 mr-4 flex items-center justify-center">
              {hoveredTrackIndex === index || activeSong?.id === playlist.track.id ? (
                <PlayPause
                  isPlaying={isPlaying}
                  activeTrack={activeSong?.id}
                  trackId={playlist.track.id}
                  previewUrl={playlist.track.preview_url}
                  handlePlay={() => handlePlay(playlist.track, index)}
                  handlePause={handlePause}
                />
              ) : (
                <p className="text-white/55 transition-opacity duration-300 opacity-100">
                  {index + 1}
                </p>
              )}
            </div>
            <img
              className="flex h-10 w-10 rounded-lg"
              src={playlist.track.album.images[0].url}
              alt={playlist.track.album.name}
            />
            <div className="flex flex-col sm:w-40 md:w-48 lg:w-80 ml-3 mb-1">
              <p className="text-lg truncate">{playlist.track.album.name}</p>
              <div className="flex truncate text-white/75 text-sm">
                {playlist.track.album.artists.map((artist, i) => (
                  <React.Fragment key={artist.id}>
                    <p>{artist.name}</p>
                    {i !== playlist.track.album.artists.length - 1 && (
                      <span className="mx-1">, </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <p className="text-white/75 absolute truncate left-2/4 lg:left-[28rem] xl:left-[38rem]">
              playlist
            </p>
            <p className="absolute right-4 text-white/75">
              {`${Math.floor(playlist.track.duration_ms / 60000)}:${(
                (playlist.track.duration_ms % 60000) /
                1000
              )
                .toFixed(0)
                .padStart(2, "0")}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
