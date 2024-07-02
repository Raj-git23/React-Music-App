import React from 'react';
import Discover from '../components/services/Discover';
import Featured from '../components/services/Featured';
import NewReleases from '../components/services/NewReleases';

const Playlist = () => {
  return (
    <div>
      <Discover />
      <Featured />
      <NewReleases />
    </div>
  );
};

export default Playlist;
