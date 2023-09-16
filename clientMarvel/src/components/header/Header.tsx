import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import css from "./Header.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../UI/logo/Logo";
import useMenuToggle from "../../hook/useMenuToggle";
import CustomButton from "../UI/customButton/CustomButton";

const Header = () => {
  const navigate = useNavigate();

  const { menuOpen, menuToggleHandler, closeMenu } = useMenuToggle();

  const ctaClickHandler = () => {
    closeMenu()
    navigate("/page-cta");
  };

  return (
    <header className={css.header}>
      <div className={css.header__content}>
        <Link to="/" className={css.header__content__logo}>
          <Logo color={'white'} />
        </Link>
        <nav
          className={`${css.header__content__nav} 
            ${menuOpen ? css.isMenu : ""}`}
        >
          <ul>
            <li>
              <Link to="/page-one" onClick={menuToggleHandler}>
                PageOne
              </Link>
            </li>
            <li>
              <Link to="/page-two" onClick={menuToggleHandler}>
                PageTwo
              </Link>
            </li>
            <li>
              <Link to="/page-three" onClick={menuToggleHandler}>
                PageThree
              </Link>
            </li>
          </ul>
          <CustomButton onClick={ctaClickHandler}>
            CTA Page
          </CustomButton>
        </nav>
        <div className={css.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;