import React from "react";
import TopArtists from "../components/services/TopArtists";
import NewReleases from "../components/services/NewReleases";
import Discover from "../components/services/Discover";
import Featured from "../components/services/Featured";

const Browse = () => {
  
  return (
    <div className="flex flex-col px-4">
    <div>
      <NewReleases />
      <Featured/>
    </div>
      <div className="mb-20 mt-4">
        <Discover />
        <TopArtists />
      </div>
    </div>
  );
};

export default Browse;
