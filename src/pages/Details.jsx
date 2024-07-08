import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHashtag, FaRegClock } from "react-icons/fa6";
import {
  useGetArtistTracksByIdQuery,
  useGetAlbumTrackByIdQuery,
  useGetPlaylistTrackByIdQuery,
} from "../redux/services/APIcore"; // Adjust these import paths accordingly
import PlayPause from "../components/PlayPause";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import RelatedPlaylist from "../components/services/RelatedPlaylist";
import SearchBar from "../components/SearchBar";
import { Loader } from "../components/Fetching";

const Details = ({ type }) => {
  const { id, name } = useParams();
  const location = useLocation();

  const dispatch = useDispatch();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const [hoveredTrackIndex, setHoveredTrackIndex] = useState(null);
  const [firstSongId, setFirstSongId] = useState(null);

  const handlePlay = (track, index, type) => {
    const trackData = type === 'artist' ? data : data?.items;
    dispatch(setActiveSong({ song: track, data: trackData, i: index }));
    console.log(data);
    dispatch(playPause(true));
  };

  const handlePause = () => {
    dispatch(playPause(false));
  };

  const queryResult =
    type === "artist"
      ? useGetArtistTracksByIdQuery(id)
      : type === "album"
      ? useGetAlbumTrackByIdQuery(id)
      : useGetPlaylistTrackByIdQuery(id);

  const { data, isLoading, error } = queryResult;

  useEffect(() => {

    type === "artist" ? setFirstSongId(data?.tracks[0].id) : type === "playlist"  ? setFirstSongId(data?.items[0]?.track.id) : setFirstSongId(data?.items[0].id);

  }, [data, type]);

  if (isLoading) return <Loader title="Loading ..." />;
  if (error) return <Error />;

  const imageUrl = location.state?.imageUrl; // Getting the imageUrl from the location state
  const length = type === "artist" ? data?.tracks?.length : data?.items?.length;

  return type === "artist" ? (
    <div className="flex rounded-lg flex-col mb-24 justify-center">
    <div className="bg-[#1d1417dd]"><SearchBar /></div>
      
      <div
        className="relative flex h-[18rem] pl-6 pb-4 bg-[center_30%] pt-10 bg-cover items-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${imageUrl})`,

        }}
      >
        <div
          className="flex flex-col ml-1 text-wrap md:ml-6 text-white"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          <p className="text-sm text-white/60 mt-1 ml-2">Artist</p>
          <p className="font-bold mt-1 text-6xl text-wrap md:text-8xl">{name}</p>
          <p className="text-white/55 text-lg">{`${length} Songs`}</p>
        </div>
      </div>

      <div className="flex flex-col pt-4 bg-gradient-to-b from-[#751530b7] to-[#000000]">
        <div className="text-white/60 text-lg font-semibold italic flex flex-row items-center mb-4">
          <p className="relative w-6 h-6 ml-2 md:ml-5  mt-2 flex items-center justify-center">
            <FaHashtag />
          </p>
          <p className="flex flex-col sm:w-40 md:w-48 lg:w-80 ml-5 mt-2">
            Tracks
          </p>
          <p className="absolute hidden md:flex truncate left-2/4 lg:left-[28rem] xl:left-[38rem]">
            Album
          </p>
          <p className="absolute right-6">
            <FaRegClock />
          </p>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-[#6f6868] w-[98%] ml-3 mb-3" />
        {data?.tracks?.map((track, index) => (
          <div
            key={index}
            className="flex p-1 items-center rounded-lg hover:bg-[#751530b7]/50 cursor-pointer ml-1 md:ml-4 transition-all duration-300"
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
                  handlePlay={() => handlePlay(track, index, "artist")}
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
              src={track.album.images[0].url || "../../images/song.jpg"}
              alt={track.name}
            />
            <div className="flex flex-col w-3/4 md:w-30 lg:w-80 ml-3 mb-1">
              <p className="text-md w-3/4 md:w-60 overflow-hidden lg:w-7/12 truncate">{track.name}</p>
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
              {track.album.name}
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
      <RelatedPlaylist id={firstSongId} type={type} />
    </div>
  ) : type === "playlist" ? (
    <div className="flex rounded-lg flex-col mb-24 justify-center">
      <SearchBar />
      <div className="flex pl-6 pt-10 pb-4 items-center">
        {imageUrl && (
          <img
            src={imageUrl}
            className="h-32 w-32 md:h-48 md:w-48 rounded-lg"
            alt="Playlist or Album"
          />
        )}
        <div className="flex flex-col ml-6 text-wrap md:ml-6 text-white">
          <p className="text-sm text-white/60 mt-1 md:ml-2">
            {type === "playlist" ? "Playlist" : "Album"}
          </p>
          <p className="font-bold mt-1 text-5xl">{name}</p>
          <p className="text-white/55 text-lg">{`${length} Songs`}</p>
        </div>
      </div>
      <div className="flex flex-col pt-4 bg-gradient-to-b from-[#000000] to-[#000000]">
        <div className="text-white/60 text-lg font-semibold italic flex flex-row items-center mb-4">
          <p className="relative w-6 h-6 ml-2 md:ml-5 mt-2 flex items-center justify-center">
            <FaHashtag />
          </p>
          <p className="flex flex-col sm:w-40 md:w-48 lg:w-80 ml-5 mt-2">
            Tracks
          </p>
          <p className="absolute hidden md:flex truncate left-2/4 lg:left-[28rem] xl:left-[38rem]">
            Date of Release
          </p>
          <p className="absolute right-6">
            <FaRegClock />
          </p>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-[#6f6868] w-[98%] ml-3 mb-3" />
        {data?.items?.map((playlist, index) => (
          <div
            key={index}
            className="flex p-1 items-center rounded-lg hover:bg-[#554526ea]/50 cursor-pointer ml-1 md:ml-4 transition-all duration-300"
            onMouseEnter={() => setHoveredTrackIndex(index)}
            onMouseLeave={() => setHoveredTrackIndex(null)}
          >
            <div className="relative w-6 h-6 mr-4 flex items-center justify-center">
              {hoveredTrackIndex === index ||
              activeSong?.id === playlist.track.id ? (
                <PlayPause
                  isPlaying={isPlaying}
                  activeTrack={activeSong?.id}
                  trackId={playlist.track.id}
                  previewUrl={playlist.track.preview_url}
                  handlePlay={() => handlePlay(playlist.track, index, "playlist")}
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
              src={playlist.track.album.images[0].url || "../../images/song.jpg"}
              alt={playlist.track.album.name}
            />
            <div className="flex flex-col w-3/4 md:w-30 lg:w-80 ml-3 mb-1">
              <p className="text-md w-3/4 md:w-60 overflow-hidden lg:w-7/12 truncate">{playlist.track.name}</p>
              <div className="hidden lg:flex w-3/4 md:w-20 lg:w-80 text-white/75 text-sm">
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
            <p className="hidden md:flex text-white/75 md:w-72 absolute truncate left-2/4 lg:left-[28rem] xl:left-[38rem]">
              {new Date(playlist.track.album.release_date)
                .toLocaleDateString("en-GB")
                .replace(/\//g, "-")}
            </p>

            <p className="absolute right-4 md:right-6 text-white/75">
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
      <RelatedPlaylist id={firstSongId} type={type} />
    </div>
  ) : (
    <div className="flex rounded-lg flex-col bg-gradient-to-b from-[#8a6610f8] to-[#000000] mb-24">
      <SearchBar />
      <div className="flex pl-6 pt-8 pb-4 items-center">
        {imageUrl && (
          <img
            src={imageUrl}
            className="h-32 w-32 md:h-48 md:w-48 rounded-lg"
            alt="Playlist or Album"
          />
        )}
        <div className="flex flex-col ml-6 text-wrap md:ml-6 text-white">
          <p className="text-sm text-white/60 mt-1 md:ml-2">
            {type === "playlist" ? "Playlist" : "Album"}
          </p>
          <p className="font-bold mt-1 text-5xl">{name}</p>
          <p className="text-white/55 text-lg">{`${length} Songs`}</p>
        </div>
      </div>
      <div className="flex flex-col pt-6 h-full">
        <div className="text-white/60 text-lg font-semibold italic flex flex-row items-center mb-4">
          <p className="relative w-6 h-6 ml-2 md:ml-5 mt-2 flex items-center justify-center">
            <FaHashtag />
          </p>
          <p className="flex flex-col sm:w-40 md:w-48 lg:w-80 ml-5 mt-2">
            Tracks
          </p>
          <p className="absolute hidden md:flex truncate left-2/4 lg:left-[28rem] xl:left-[38rem]">
            Album
          </p>
          <p className="absolute right-6">
            <FaRegClock />
          </p>
        </div>
        <hr className="h-px bg-gray-200 border-0 dark:bg-[#6f6868] w-[98%] ml-3 mb-3" />
        {data?.items?.map((album, index) => (
          <div
            key={index}
            className="flex p-1 items-center rounded-lg hover:bg-[#554526ea]/50 cursor-pointer ml-1 md:ml-4 transition-all duration-300"
            onMouseEnter={() => setHoveredTrackIndex(index)}
            onMouseLeave={() => setHoveredTrackIndex(null)}
          >
            <div className="relative w-6 h-6 mr-4 flex items-center justify-center">
              {hoveredTrackIndex === index || activeSong?.id === album.id ? (
                <PlayPause
                  isPlaying={isPlaying}
                  activeTrack={activeSong?.id}
                  trackId={album.id}
                  previewUrl={album.preview_url}
                  handlePlay={() => handlePlay(album, index, "album")}
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
              src={"../../images/song.jpg" || album.images[0].url}
              alt={album.name}
            />
            <div className="flex flex-col w-3/4 md:w-30 lg:w-80 ml-3 mb-1">
              <p className="text-md w-3/4 md:w-60 overflow-hidden lg:w-7/12 truncate">{album.name}</p>
            </div>
            <p className="text-white/75 absolute truncate left-2/4 lg:left-[28rem] xl:left-[38rem]">
              <div className="hidden lg:flex w-3/4 md:w-20 lg:w-80 text-white/75 text-sm">
                {album.artists.map((artist, i) => (
                  <React.Fragment key={artist.id}>
                    <p>{artist.name}</p>
                    {i !== album.artists.length - 1 && (
                      <span className="mx-1">, </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </p>
            <p className="absolute right-4 md:right-6 text-white/75">
              {`${Math.floor(album.duration_ms / 60000)}:${(
                (album.duration_ms % 60000) /
                1000
              )
                .toFixed(0)
                .padStart(2, "0")}`}
            </p>
          </div>
        ))}
      </div>
      <RelatedPlaylist id={firstSongId} type={type} />
    </div>
  );
};

export default Details;
