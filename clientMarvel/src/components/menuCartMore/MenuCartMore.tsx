import { useState, useEffect, useRef, MouseEvent, FC } from "react";
import css from "./MenuCartMore.module.sass";
import { FiMoreVertical } from "react-icons/fi";
import IconButton from "../UI/iconButton/IconButton";
import { Link } from "react-router-dom";
import { useTypedDispatch } from "../../hook/useTypedDispatch";
import { AiFillDelete, AiOutlineInfoCircle } from "react-icons/ai";
import LikeTurn from "../LikeTurn";




interface MenuCartMoreProps {
  id: number
}

const MenuCartMore: FC<MenuCartMoreProps> = ({ id }: MenuCartMoreProps) => {


  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);




  const { REMOVE_FROM_CART } = useTypedDispatch()


  const Delete = () => {
    REMOVE_FROM_CART({ id })
  };


  useEffect(() => {
    const handler = (e: MouseEvent<HTMLElement>) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    document.addEventListener("mousedown", handler);

    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <div className={css.menuTrigger}>
        <IconButton orange
          onClick={() => { setOpen(!open) }}>
          <FiMoreVertical />
        </IconButton>


        <div className={`${css.dropdownMenu} ${open ? css.active : css.inactive}`}>

          <ul>
            <li className={css.dropdownItem}  >
              <Link to={`/hero/${id}`}>
                <IconButton noneBack>
                  <AiOutlineInfoCircle />
                </IconButton>
              </Link>
              Learn More
            </li>
            <li className={css.dropdownItem}>
              <LikeTurn id={id} />
              Like
            </li>
            <li className={css.dropdownItem} onClick={Delete}>
              <IconButton noneBack>
                <AiFillDelete />
              </IconButton>
              Delete
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuCartMore;
