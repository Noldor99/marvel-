import React from 'react';
import css from './IconButton.module.sass'

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={css.customButton}>
      {children}
    </button>
  );
};

export default IconButton;
