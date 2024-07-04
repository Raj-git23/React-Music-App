import React from 'react'
import { useGetSongsByGenreQuery } from '../../redux/services/APIcore';
import Carousal from '../Cards/Carousal';
import { Error, Loader } from "../Fetching";

import { useSelector } from "react-redux";


const TopCharts = () => {
    const { data, isLoading, error } = useGetSongsByGenreQuery("rock");
    const { activeSong, isPlaying, genreListId } = useSelector(
        (state) => state.player
      );

    if (isLoading) return <Loader title="Loading Charts..." />;
    if (error) return <Error />;

  return (
    <Carousal
      data={data}
      activeSong={activeSong}
      isPlaying={isPlaying}
      content={data?.playlists?.items}
      name="Top Charts"
    />
  );
};


export default TopCharts;
