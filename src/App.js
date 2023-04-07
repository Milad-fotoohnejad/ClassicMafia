import "./App.css";
import Nav from "./components/Navigation";
import React, { lazy } from "react";
import Loading from "./components/Loading";
import { Routes, Route, Navigate } from "react-router-dom";
import BackgroundVideo from "./components/backGroundVid";
import Background from "./components/Background";
import { Suspense } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from "./components/Footer";

function App() {
  
  const Home = React.lazy(() => import("./page/Home"));
  const About = React.lazy(() => import("./page/AboutGame"));
  const Game = React.lazy(() => import("./page/Game"));

  AOS.init();
  return (
    <>
      <Nav />
      <Background />
      {/* <BackgroundVideo /> */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/Home" element={<Home />} />

          <Route path="/About" element={<About />} />

          <Route path="/Game" element={<Game />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
