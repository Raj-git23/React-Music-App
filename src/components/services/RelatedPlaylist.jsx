import React, { useRef, useState } from "react";
import { useGetSongRelatedQuery } from "../../redux/services/APIcore";
import { Error, Loader } from "../Fetching";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { setActiveSong, playPause } from "../../redux/features/playerSlice";
import PlayPause from "../PlayPause";

const RelatedPlaylist = ({ id }) => {
  const { data, isLoading, error } = useGetSongRelatedQuery(id);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const swiperRef = useRef(null);
  const [hoveredTrackIndex, setHoveredTrackIndex] = useState(null);

  const dispatch = useDispatch();

  if (isLoading) return <Loader title="Loading..." />;
  if (error) return <Error />;

  const handlePlay = (track, index) => {
    dispatch(
      setActiveSong({ song: track, data: { tracks: [track] }, i: index })
    );
    dispatch(playPause(true));
  };

  const handlePause = () => {
    dispatch(playPause(false));
  };

  return (
    <>
      <div className="relative mt-4">
        <h2 className="absolute text-white text-2xl lg:text-4xl font-bold lg:ml-2 mt-3">
          Recommendations
        </h2>
        <div className="flex justify-end items-center mt-2 mr-6">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="mr-1 px-2 py-2 bg-transparent text-4xl text-white rounded"
          >
            <MdKeyboardArrowLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="px-2 py-2 bg-transparent text-4xl text-white rounded"
          >
            <MdKeyboardArrowRight className="text-white" />
          </button>
        </div>
      </div>
      <div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={20}
          freeMode
          centeredSlides
          loop={false}
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {data?.tracks?.map((track, index) => (
            <SwiperSlide
              key={track.id}
              style={{ width: "180px", height: "auto" }}
              className="rounded-lg animate-slideright"
              virtualIndex={index}
            >
              <div
                className="flex flex-col lg:mt-4 w-[180px] p-2 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer hover:bg-[#292121]"
                onMouseEnter={() => setHoveredTrackIndex(index)}
                onMouseLeave={() => setHoveredTrackIndex(null)}
              >
                <div className="relative w-full h-fit group">
                  <div
                    className={`absolute inset-0 justify-center items-center object-cover rounded-md bg-opacity-30 bg-[#5e5a6375] group-hover:flex ${
                      activeSong?.name === track.name
                        ? "flex bg-black bg-opacity-70 "
                        : "hidden"
                    }`}
                  ></div>
                  {hoveredTrackIndex === index || activeSong?.id === track.id ? (
                  <PlayPause
                    isPlaying={isPlaying}
                    activeTrack={activeSong?.id}
                    trackId={track.id}
                    previewUrl={track.preview_url}
                    handlePlay={() => handlePlay(track, index)}
                    handlePause={handlePause}
                    position="center"
                  />
                ) : null}
                  <img
                    alt={`${track.name}_img`}
                    src={track.album.images[0]?.url}
                    className="rounded-lg h-full object-cover hover:scale-105 hover:z-10 transition-transform duration-300"
                    style={{ transformOrigin: "center", overflow: "hidden" }}
                  />
                </div>
                <div className="mt-1 flex flex-col">
                  <p className="font-semibold text-sm text-white truncate">
                    {track.name}
                  </p>
                  <p className="text-[0.8rem] truncate text-gray-300 mt-1">
                    {track.artists[0].name}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default RelatedPlaylist;
