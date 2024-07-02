import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import PlayPause from "../PlayPause";

const SmallCarousal = ({ content, name }) => {
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // const handlePlay = (item) => {
  //   setActiveItem(item);
  //   setIsPlaying(true);
  // };

  // // {content?.map((p,i) => (console.log(p.name)))}
  
  

  // const handlePause = () => {
  //   setIsPlaying(false);
  // };

  return (
    <>
      <div className="relative mt-4">
        <h2 className="absolute left-2 text-white text-4xl font-bold ml-6 mt-3">
          {name}
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
      <div className="flex flex-wrap mt-4">
        <Swiper
          spaceBetween={20}
          freeMode
          centeredSlides={false}
          loop={false}
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            // When the window width is >= 0px
            0: {
              slidesPerView: 1,
            },
            500: {
              slidesPerView: 2,
            },
            // When the window width is >= 760px
            760: {
              slidesPerView: 4,
            },
            // When the window width is >= 1024px
            1900: {
              slidesPerView: 5,
            },
          }}
        >
          {content?.map((playlist, i) => (
            <SwiperSlide
              key={playlist.id}
              style={{ width: "100%", height: "auto" }}
              className="animate-slideright"
            >
              <Link
                to={`/playlists/${playlist.id}/${playlist.name}`}
                state={{ imageUrl: playlist.images[0]?.url }}
              >
                <div className="grid grid-cols-1 gap-2 bg-[#2e2137d2] hover:bg-[#433849d2] rounded-lg">
                  <div className="flex items-center bg-opacity-80 backdrop-blur-sm rounded-lg bg-red cursor-pointer p-2">
                    <img
                      alt={`${playlist.name}_img`}
                      src={playlist.images[0]?.url}
                      className="rounded-lg w-16 h-fit object-cover mr-2"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold text-md ml-2 text-white text-wrap">
                        {playlist.name}
                      </p>
                      {/* Uncomment and modify the below line if you have genres or description */}
                      {/* <p className="text-[0.8rem] text-gray-300 mt-1 truncate">{playlist.description}</p> */}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SmallCarousal;
