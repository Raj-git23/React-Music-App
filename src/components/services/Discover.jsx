import React from "react";
import { useSelector } from "react-redux";
import { Error, Loader } from "../Fetching";
import { useGetSongsByGenreQuery } from "../../redux/services/APIcore";
import Carousal from "../Cards/Carousal";

const Discover = ({type, genreName}) => {
  const { activeSong, isPlaying } = useSelector(
    (state) => state.player
  );

  const { data, isLoading, error } = useGetSongsByGenreQuery(type);

  // console.log("discover",data?.playlists);


  if (isLoading) return <Loader title="Loading ..." />;
  if (error) return <Error />;

  return (
    <Carousal
      key={data?.playlists?.items?.id}
      data={data?.playlists?.items}
      activeSong={activeSong}
      isPlaying={isPlaying}
      content={data?.playlists?.items}
      name={genreName}
    />
  );
};

export default Discover;
