import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage";
import SignIn from "./page/SignIn";
import SiginUp from "./page/SiginUp";
import Footer from "./components/Footer";
import Mypage from "./page/Mypage";
import Lettering from "./page/Lettering";
import LetteringList from "./page/LetteringList";
import LifeList from "./page/LifeList";
import LifeDetail from "./page/LifeDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SiginUp />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/letterlist" element={<LetteringList />} />
        <Route path="/lettering" element={<Lettering />} />
        <Route path="/lifelist" element={<LifeList />} />
        <Route path="/lifedetail" element={<LifeDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
