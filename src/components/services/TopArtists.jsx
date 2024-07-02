import React from "react";
import { useGetArtistQuery } from "../../redux/services/APIcore";
import ArtistCarousal from "../Cards/ArtistCarousal";
import { Error, Loader } from "..";

const TopArtists = () => {
  const { data, isLoading, error } = useGetArtistQuery();

  // console.log("artist", data?.artists?.items.id);

  if (isLoading) return <Loader title="Loading artists..." />;
  if (error) return <Error />;

  return <TopArtists data={data} artistId={data?.artists?.items} name="Top Artists" />;
};

export default TopArtists;
