import { Outlet } from "react-router-dom";
import DrawerAdmin from "../drawerAdmin/DrawerAdmin";
import HeaderAdmin from "../headerAdmin/HeaderAdmin";

import css from './LayoutAdmin.module.sass'

const Mainlayout = () => (
  <div className={css.layout}>
    <div className={css.drawer}>
      <DrawerAdmin />
    </div>
    <div className={css.container}>
      <HeaderAdmin />
      <main className={css.mainContent}>
        <Outlet />
      </main>
    </div>
  </div>
);

export default Mainlayout;
