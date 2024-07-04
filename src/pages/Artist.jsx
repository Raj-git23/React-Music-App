import React from 'react';
import SearchBar from '../components/SearchBar';
import TopArtists from '../components/services/TopArtists';
import Discover from '../components/services/Discover';

const Artist = () => {
  return (
    <div className="ml-3 mb-24">
    <SearchBar/>
    <TopArtists genre="indie" market="ES" name="Top Artists" type="artist" />
    <TopArtists genre="indie" market="IN" name="Indian" type="artist" />
    <Discover type="classical" genreName="Classical "/>
    <TopArtists genre="rock" market="ES" name="Rock Artists" type="artist" />
    <TopArtists genre="jazz" market="IN" name="JAZZ" type="artist" />
    <TopArtists genre="classical" market="IN" name="Classical" type="artist" />
    <Discover type="bollywood" genreName="BOLLYWOOD "/>
    <TopArtists genre="soul" market="GB" name="SOUL" type="artist" />
    </div>
  );
};

export default Artist;
