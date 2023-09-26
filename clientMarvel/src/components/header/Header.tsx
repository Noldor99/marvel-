import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import css from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../UI/logo/Logo";
import useMenuToggle from "../../hook/useMenuToggle";
import { useTypedDispatch } from "../../hook/useTypedDispatch";
import CustomButton from "../UI/customButton/CustomButton";
import { useTypedSelector } from "../../hook/useTypedSelector";
import WrapAdminButton from "./WrapAdminButton";
import WrapBadge from "./WrapBadge";

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useTypedDispatch()

  const { menuOpen, menuToggleHandler } = useMenuToggle();

  const { userInfo } = useTypedSelector((state) => state.auth)


  const handleLogout = () => {
    logout();
    navigate('auth/login');
  };


  return (
    <header className={css.header}>
      <div className={css.header__content}>
        <Link to="/" className={css.header__content__logo}>
          <Logo color={'white'} />
        </Link>
        <div
          className={`${css.header__content__nav} 
          ${menuOpen ? css.isMenu : ""}`}
        >
          <WrapAdminButton />
          <CustomButton onClick={handleLogout}>
            {userInfo ? 'Logout' : 'Login'}
          </CustomButton>
          <p>{userInfo?.email}</p>
        </div>
        <div className={css.badge__box}>
          <WrapBadge />
          <div className={css.header__content__toggle}>
            {!menuOpen ? (
              <BiMenuAltRight onClick={menuToggleHandler} />
            ) : (
              <AiOutlineClose onClick={menuToggleHandler} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;