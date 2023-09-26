import React from "react";
import { Routes, Route } from "react-router-dom";
import Mainlayout from "./components/mainlayout/Mainlayout";
import NotFoundBlock from "./components/notFoundBlock/NotFoundBlock";
import HeroDetails from "./page/heroDetails/HeroDetails";
import Home from "./page/home/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./page/login/Login";
import Register from "./page/register/Register";
import Cart from "./page/cart/Cart";
import AppAdmin from "./AppAdmin";
import AdminOnlyRoute from "./components/adminOnlyRoute/AdminOnlyRoute";


const App = () => {

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ToastContainer />
      <Routes>
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
        <Route path="/" element={<Mainlayout />}>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="hero/:id" element={<HeroDetails />} />


        </Route>
        <Route path="admin/*" element={
          <AdminOnlyRoute>
            <AppAdmin />
          </AdminOnlyRoute>
        } />
        <Route path="*" element={<NotFoundBlock />} />
      </Routes>
    </React.Suspense>
  )
}

export default App