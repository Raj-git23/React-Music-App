
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./redux/services/Login";
// import Home from "./pages/Home";
import Browse from "./pages/Browse";


export default function App() {

  const [token, setToken] = useState();

    useEffect(() => {
        const hash = window.location.hash;
        const token = hash.split("&")[0].split("=")[1];
        console.log("token",token);

        window.localStorage.setItem("token", token);
        setToken(token);
    }, []);


  return !token ? (
    <Login />
  ) : (
    <Routes>
      <Route path="/" element={<Browse />} />
    </Routes>
  );
}
