import React from "react";
import { useSelector } from "react-redux";
import { Error, Loader } from "..";
import { useGetSongsByGenreQuery } from "../../redux/services/APIcore";
import Carousal from "../Cards/Carousal";

const Discover = () => {
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, isLoading, error } = useGetSongsByGenreQuery(
    genreListId || "pop"
  );

  // console.log("discover",data?.playlists);


  if (isLoading) return <Loader title="Loading Discover..." />;
  if (error) return <Error />;

  return (
    <Carousal
      data={data}
      activeSong={activeSong}
      isPlaying={isPlaying}
      content={data?.playlists?.items}
      name="Discover"
    />
  );
};

export default Discover;
