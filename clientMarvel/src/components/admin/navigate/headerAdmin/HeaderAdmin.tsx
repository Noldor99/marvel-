import css from "./HeaderAdmin.module.sass";
import { Link } from "react-router-dom";
import Logo from "../../../UI/logo/Logo";
import CustomButton from "../../../UI/customButton/CustomButton";
import { useSidebarContext, SidebarContextType } from "../../../../context/SidebarContext";

const HeaderAdmin = () => {

  const { setSidebarOpen } = useSidebarContext() as SidebarContextType;

  return (
    <header className={css.header}>
      <div className={css.header__content}>
        <Link to="/" className={css.header__content__logo}>
          <Logo color={'white'} />
        </Link>
        <div className={css.toolbar__btn}>
          <CustomButton onClick={() => setSidebarOpen(true)}>
            Sidebar
          </CustomButton>
        </div>
      </div>
    </header>
  );
};

export default HeaderAdmin;