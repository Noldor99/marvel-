import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './MenuList.module.sass';

interface MenuListLinkProps {
  to: string;
  label: string;
}

const MenuListLink: React.FC<MenuListLinkProps> = ({ to, label }) => {
  const location = useLocation();

  const isActive = location.pathname.split('/').pop() === to.split('/').pop();

  return (
    <li className={`${css.linkContainer} ${isActive ? css.linkContainerActive : ''}`}>
      <Link to={to} className={css.link}>
        {label}
      </Link>
    </li>
  );
};

export default MenuListLink;
