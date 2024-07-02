import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
// import { useGetArtistAlbumsByIdQuery } from "../../redux/services/APIcore";

const Artistcarousal = ({ data, name }) => {
  const swiperRef = useRef(null);

  // console.log("data", data.artists.items[0].images[0].url);

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
        {data?.artists?.items?.map((artist, i) => (
          <SwiperSlide
            key={artist.id}
            style={{ width: "180px", height: "auto" }}
            className="rounded-full animate-slideright"
          >
            <Link
              to={`/artists/${artist.id}/${artist.name}`}
              state={{ imageUrl: artist.images[0]?.url }} // Pass the image URL in the state
            >
              <div className="flex flex-col mt-2 w-[180px] p-2 bg-opacity-80 backdrop-blur-sm ransform transition-transform duration-300 hover:scale-105 rounded-lg cursor-pointer">
                <div
                  // onClick={() => handleClick(artist.id)}
                  className="relative h-full flex object-cover group items-center"
                >
                  <img
                    alt={`${artist.name}_img`}
                    src={artist.images[0]?.url}
                    className="rounded-full h-40 w-40 object-cover"
                  />
                </div>
                <div className="mt-1 flex flex-col truncate items-center">
                  <p className="font-semibold text-sm text-white truncate">
                    {artist.name}
                  </p>
                  <p className="text-[0.8rem] text-gray-300 mt-1 text-center">
                    {artist.genres.join(", ")}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Artistcarousal;
