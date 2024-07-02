import React from "react";
import { useGetBrowseNewReleasesQuery } from "../../redux/services/APIcore";
import { useSelector } from "react-redux";
import { Error, Loader } from "../Fetching";
import Carousal from "../Cards/Carousal";

const NewReleases = () => {
    
    const {data, isLoading, error} = useGetBrowseNewReleasesQuery();
    const { activeSong, isPlaying } = useSelector(
        (state) => state.player
      );
    
      // console.log("new realeases",data?.albums);

    if (isLoading) return <Loader title="Loading New Releases..." />;
    if (error) return <Error />;
  
    return (
      <Carousal
        data={data}
        content={data?.albums?.items}
        activeSong={activeSong}
        isPlaying={isPlaying}
        name="New Releases"
         />
    );
  };

export default NewReleases;