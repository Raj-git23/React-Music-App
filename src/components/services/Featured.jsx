import React,{ useState} from "react";
// import { useSelector } from "react-redux";
import { Error, Loader } from "../Fetching";
import { useGetFeaturedPlaylistsQuery } from "../../redux/services/APIcore";
import SmallCarousal from "../Cards/SmallCarousal"; 

const Featured = () => {

  
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const { data, isLoading, error } = useGetFeaturedPlaylistsQuery();

  if (isLoading) return <Loader title="Loading Featured..." />;
  if (error) return <Error />;

  const handlePlay = (item) => {
    setActiveItem(item);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };


  return (
   <div>
    <SmallCarousal 
        name="Featured Playlist"
        content={data?.playlists?.items}
        isPlaying={isPlaying}
        activeItem={activeItem}
        handlePlay={handlePlay}
        handlePause={handlePause}
      />

   </div>
  );
};

export default Featured;
