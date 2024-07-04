import React, { useRef } from "react";
import { useGetArtistBySearchQuery } from "../../redux/services/APIcore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Error, Loader } from "../Fetching";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const AlbumCarousal = ({genre, market, name, type}) => {
    const { data , isLoading , error } = useGetArtistBySearchQuery({genre:genre, market:market, type:type});
    const { activeSong, isPlaying } = useSelector((state) => state.player);
  const swiperRef = useRef(null);
  // console.log("albums", data?.albums);

  if (isLoading) return <Loader title="Loading New Releases..." />;
  if (error) return <Error />;

  return (
    <>
      <div className="relative mt-4">
        <h2 className="absolute text-white text-2xl lg:text-4xl font-bold lg:ml-2 mt-3">
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
        {data?.albums?.items?.map((album, index) => (
          <SwiperSlide
            key={album.id}
            style={{ width: "180px", height: "auto" }}
            className="rounded-lg animate-slideright"
            virtualIndex={index}
          >
            <Link
              to={`/album/${album.id}/${album.name}`}
              state={{ imageUrl: album.images[0]?.url }}
            >
              <div className="flex flex-col lg:mt-4 w-[180px] p-2 bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer">
                <div className="relative w-full h-fit group">
                  <div
                    className={`absolute inset-0 justify-center items-center object-cover rounded-md bg-opacity-30 bg-[#5e5a6375] group-hover:flex ${
                      activeSong?.name === album.name
                        ? "flex bg-black bg-opacity-70 "
                        : "hidden"
                    }`}
                  ></div>
                  <img
                    alt={`${album.name}_img`}
                    src={album.images[0]?.url}
                    className="rounded-lg h-full object-cover hover:scale-105 hover:z-10 transition-transform duration-300"
                    style={{ transformOrigin: "center", overflow: "hidden" }}
                  />
                </div>

                <div className="mt-1 flex flex-col">
                  <p className="font-semibold text-sm text-white truncate">
                    {album.name}
                  </p>
                  <p className="text-[0.8rem] truncate text-gray-300 mt-1">
                    {album.description}
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

export default AlbumCarousal;
