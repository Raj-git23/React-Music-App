import React from "react";
import TopArtists from "../components/services/TopArtists";
import NewReleases from "../components/services/NewReleases";
import Discover from "../components/services/Discover";
import Featured from "../components/services/Featured";
import SearchBar from "../components/SearchBar";
import TopCharts from "../components/services/TopTracks";

const Browse = () => {
  return (
    <div className="flex flex-col px-4">
      <div>
        <SearchBar />
        <NewReleases />
        <Featured />
      </div>
      <div className="mb-20 mt-4">
        <Discover type="jazz" genreName="Discover"/>
        <TopCharts />
        <TopArtists type="artist" genre="bollywood" name="Top Artists" market="IN" />
      </div>
    </div>
  );
};

export default Browse;
