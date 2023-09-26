import { Route, Routes } from "react-router-dom";
import LayoutAdmin from "./components/admin/navigate/layoutAdmin/LayoutAdmin";
import AddBrand from "./components/admin/page/addBrand/AddBrand";
import AddRole from "./components/admin/page/addRole/AddRole";
import CreateHeroPage from "./components/admin/page/createhero/Createhero";
import HomeAdmin from "./components/admin/page/home/HomeAdmin";
import ImageAdd from "./components/admin/page/imageAdd/ImageAdd";
const AppAdmin = () => {
  return (
    <div>
      <Routes>
        <Route element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path="addBrand" element={<AddBrand />} />
          <Route path="addRole" element={<AddRole />} />
          <Route path="addImage/:id" element={<ImageAdd />} />
          <Route path="create/:id" element={<CreateHeroPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppAdmin;
