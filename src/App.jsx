import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer/index";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import Details from "./pages/Details";
import Playlist from "./pages/Playlist";
import Browse from "./pages/Browse";
import Search from "./pages/Search";
import Artist from "./pages/Artist";
import Albums from "./pages/Albums";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  useEffect(() => {
    toast('Welcome to the music app! No full songs, only 30 sec trial', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }, []);
  

  return  (
    <div className="relative flex">
      <SideBar />
      <div className="w-full relative bg-gradient-to-b from-[#2b2b2d] to-[#000000] text-white h-screen overflow-auto">
        {window.location.pathname === "/" &&
          window.location.pathname === "/top-artists" && 
          window.location.pathname === "playlist" && (
            <>
              <SearchBar />
            </>
          )}
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/top-artists" element={<Artist />} />
          <Route path="/albums" element={<Albums />} />
          {/* <Route path="/playlist" element={<Playlist />} /> */}
          <Route path="/playlists/:id/:name" element={<Details type="playlist" />} />
          <Route path="/artists/:id/:name" element={<Details type="artist" />} />
          <Route path="/album/:id/:name" element={<Details type="album" />} />
          <Route path="/search/:searchTerm" element={<Search />} />
        </Routes>
      </div>
      <MusicPlayer />
      <ToastContainer />
    </div>
  );
}
