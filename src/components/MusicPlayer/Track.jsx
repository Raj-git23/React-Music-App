import React from "react";

const Track = ({ isPlaying, isActive, activeSong, trackName, artistNames, imageUrl}) => {

  return(
  <div className="flex-1 flex items-center justify-start">
    <div
      className={`${
        isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
      } hidden sm:block h-16 w-16 mr-4`}
    >
      <img
        src={activeSong?.album?.images[0].url || "../../../images/song.jpg"}
        alt="cover art"
        className="rounded-full"
      />
    </div>
    <div className="w-[50%]">
      <p className="truncate text-white font-bold text-lg">
        {activeSong?.name ? activeSong?.name : "No active Song"}
      </p>
      <div className="truncate flex text-gray-300">
        {!activeSong?.artists ? null : activeSong?.artists.map((artist, i) => (
          <React.Fragment key={artist.id}>
            <p>{artist.name}</p>
            {i !== activeSong?.artists.length - 1 && <span className="mx-1">,</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
  )
};

export default Track;
