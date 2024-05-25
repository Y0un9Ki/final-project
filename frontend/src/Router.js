import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage";
import SignIn from "./page/SignIn";
import SiginUp from "./page/SiginUp";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SiginUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
