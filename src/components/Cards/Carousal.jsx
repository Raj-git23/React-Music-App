import React, { useRef } from "react";
import { SongCard } from "..";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from 'swiper/modules';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const Carousal = ({ data, activeSong, isPlaying, content, name }) => {
  const swiperRef = useRef(null);

  return (
    <>
    <div className="relative mt-4">
        <h2 className="absolute left-2 text-white text-4xl font-bold ml-4 mt-3">
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
         {content?.map((playlist, index) => (
          <SwiperSlide
            key={playlist.id}
            style={{ width: '180px', height: 'auto' }}
            className="rounded-lg animate-slideright"
            virtualIndex={index}
          >
            <SongCard
              key={content.id}
              playlist={playlist}
              i={index}
              activeSong={activeSong}
              isPlaying={isPlaying}
              data={data}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Carousal;
