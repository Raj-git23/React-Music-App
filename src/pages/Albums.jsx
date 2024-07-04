import React from 'react';
import SearchBar from '../components/SearchBar';
import TopArtists from '../components/services/TopArtists';
import Discover from '../components/services/Discover';
import AlbumCarousal from '../components/Cards/AlbumCarousal';

const Albums = () => {
  return (
    <div className="ml-3 mb-24">
    <SearchBar/>
    {/* <Discover type="classical" genreName="classical "/> */}
    <AlbumCarousal genre="indie" market="ES" name="Top Albums" type="album" />
    <TopArtists genre="90s" market="IN" name="90s" type="artist" />
    <AlbumCarousal genre="rock" market="ES" name="Rock Albums" type="album" />
    <AlbumCarousal genre="jazz" market="IN" name="JAZZ" type="album" />
    <TopArtists genre="classical" market="IN" name="Classical" type="artist" />
    <AlbumCarousal genre="hindi" genreName="Hindi" market="IN" type="album"/>
    <AlbumCarousal genre="sufi" genreName="SUFI" market="IN" type="album"/>
    <TopArtists genre="soul" market="GB" name="SOUL" type="artist" />
    <AlbumCarousal genre="punjabi" market="IN" genreName="BOLLYWOOD" type="album"/>
    </div>
  );
};

export default Albums;
