import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MusicPlayer from "./components/MusicPlayer/index";
import SideBar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import TopArtists from "./components/Cards/ArtistCarousal";
import Details from "./pages/Details";
import Playlist from "./pages/Playlist";
import Filter from "./components/Filter";
import Browse from "./pages/Browse";
import Discover from "./components/services/Discover";
import Login from "./redux/services/Login";

export default function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    const hash = window.location.hash;
    const token = hash.split("&")[0].split("=")[1];

    window.localStorage.setItem("token", token);
    window.history.replaceState({}, document.title, "/");

    setToken(token);
  }, []);

  // console.log(atoken);

  return !token ? (
    <Login />
  ) : (
    <div className="flex relative">
      <SideBar />
      <div className="w-full relative bg-gradient-to-b from-[#382844] to-[#000000] text-white h-screen overflow-auto">
        {window.location.pathname === "/" &&
          window.location.pathname === "/top-artists" && 
          window.location.pathname === "playlist" && (
            <>
              <SearchBar />
              <Filter />
            </>
          )}
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/top-artists" element={<TopArtists />} />
          <Route path="/albums" element={<Discover />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/playlists/:id/:name" element={<Details type="playlist" />} />
          <Route path="/artists/:id/:name" element={<Details type="artist" />} />
          <Route path="/album/:id/:name" element={<Details type="album" />} />
        </Routes>
      </div>
      <MusicPlayer />
    </div>
  );
}
