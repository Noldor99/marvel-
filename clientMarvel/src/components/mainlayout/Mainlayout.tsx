import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import css from './Mainlayout.module.sass'

const Mainlayout = () => (
  <div className={css.mainLayout}>
    <Header />
    <main className={css.mainContent}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Mainlayout;
