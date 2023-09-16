import React from "react";
import { Routes, Route } from "react-router-dom";
import ImageAdd from "./page/imageAdd/ImageAdd";
import Mainlayout from "./components/mainlayout/Mainlayout";
import NotFoundBlock from "./components/notFoundBlock/NotFoundBlock";
import CreateHeroPage from "./page/createhero/Createhero";
import HeroDetails from "./page/heroDetails/HeroDetails";
import Home from "./page/home/Home";


const App = () => {

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Mainlayout />}>
          <Route path="/" element={<Home />} />
          <Route path="hero/:id" element={<HeroDetails />} />
          <Route path="create/:id" element={<CreateHeroPage />} />
          <Route path="addImage/:id" element={<ImageAdd />} />
        </Route>
        <Route path="*" element={<NotFoundBlock />} />
      </Routes>
    </React.Suspense>
  )
}

export default App