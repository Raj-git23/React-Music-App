import React from 'react';
import Discover from '../components/services/Discover';
import Featured from '../components/services/Featured';
import SearchBar from '../components/SearchBar';

const Playlist = () => {
  return (
    <div className="ml-3 mb-24">
    <SearchBar/>
      <Discover type="pop" genreName="Top Playlists"/>
      <Featured />
      <Discover type="60s" genreName="60s" />
      <Discover type="rock" genreName="Rock" />
      <Discover type="Reggae" genreName="Worldwide" />
      <Discover type="bollywood" genreName="BOLLWOOD" />
      <Discover type="house" genreName="Electronic" />
      <Discover type="soul" genreName="Soul" />
      <Discover type="country" genreName="Country" />
      <Discover type="90s" genreName="90s" />
    </div>
  );
};

export default Playlist;
