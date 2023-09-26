import React from 'react';
import css from './IconButton.module.sass'

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWIdth?: boolean
  noneBack?: boolean
  orange?: boolean
}

const IconButton: React.FC<CustomButtonProps> = (
  { children, orange, fullWIdth, noneBack, ...props }
) => {
  return (
    <button {...props}
      className={`
      ${css.customButton}
      ${fullWIdth && css.fullWIdth}
      ${noneBack && css.noneBack}
      ${orange && css.orange}
      `}>
      {children}
    </button>
  );
};

export default IconButton;
