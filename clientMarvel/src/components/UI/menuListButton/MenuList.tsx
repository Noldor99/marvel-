import { FC } from 'react';

import css from './MenuList.module.sass';

interface MenuListProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dataMenuList: string[];
  activeLabel: string;
  setMenuList: (name: string) => void;
}

export const MenuList: FC<MenuListProps> = ({ dataMenuList, setMenuList, activeLabel }: MenuListProps) => {




  const handleItemClick = (label: string) => {
    setMenuList(label);

  };

  return (
    <>
      {dataMenuList.map((label: string) => (
        <div
          className={`
            ${css.buttonContainer}
            ${activeLabel === label ? css.active : ''}
          `}
          key={label}
        >
          <button className={css.btn} onClick={() => handleItemClick(label)}>
            <div className={css.button__content}>
              <label className={css.buttonLabel}>{label}</label>
            </div>
          </button>
        </div>
      ))}
    </>
  );
};

export default MenuList;
