// import React from "react";
import TopArtists from "../components/services/TopArtists";
import NewReleases from "../components/services/NewReleases";
// import Discover from "../components/services/Discover";
// import Featured from "../components/services/Featured";
import SearchBar from "../components/SearchBar";
import AlbumCarousal from "../components/Cards/AlbumCarousal";
// import TopCharts from "../components/services/TopTracks";

const Browse = () => {
  return (
    <div className="flex flex-col px-4">
      <div>
        <SearchBar />
        <NewReleases />
        {/* <Featured /> */}
      </div>
      <div className="mb-20 mt-4">
        {/* <Discover type="jazz" genreName="Discover"/> */}
        {/* <TopCharts /> */}
        
        <TopArtists genre="classical" market="IN" name="Classical" type="artist" />
        <AlbumCarousal genre="hindi" genreName="Hindi" market="IN" type="album"/>
        <AlbumCarousal genre="sufi" genreName="SUFI" market="IN" type="album"/>
        <TopArtists type="artist" genre="bollywood" name="Top Artists" market="IN" />
      </div>
    </div>
  );
};

export default Browse;
