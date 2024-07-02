import React from 'react';
import { authorizeUser } from './spotifyApi';

const Login = () => {
  const handleClick = () => {
    authorizeUser();
  }


  return (
    <div className="flex flex-col h-screen justify-center items-center bg-black">
      <img src="../../../images/spotify_logo.png"
        className="bg-black h-48 max-[750px]:h-32 max-[500px]:h-20" />
      <button 
        className="bg-white px-8 py-4 m-8 font-bold text-xl rounded-full md:text-lg max-[600px]:p-2 sm:text-base"
        onClick={handleClick}
      > 
        Connect Spotify 
      </button>
    </div>
  );
}

export default Login;
