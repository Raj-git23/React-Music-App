import React from "react";
import { useGetArtistBySearchQuery } from "../../redux/services/APIcore";
import ArtistCarousal from "../Cards/ArtistCarousal";
import { Error, Loader } from "../Fetching";

const TopArtists = ({genre, market, name, type}) => {
  const { data , isLoading , error } = useGetArtistBySearchQuery({genre:genre, market:market, type:type});
  
  // console.log("artist", data);

  if (isLoading) return <Loader title="Loading artists..." />;
  if (error) return <Error />;

  return <ArtistCarousal data={data} artistId={data?.artists?.items} name={name} market={market} />;
};

export default TopArtists;
