import React from 'react';
import css from './CustomButton.module.scss'

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWIdth?: boolean
  orange?: boolean
  red?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, orange, red, fullWIdth, ...props }) => {
  return (
    <button {...props}
      className={`
        ${css.customButton} 
        ${fullWIdth && css.fullWIdth}
        ${orange && css.orange}
        ${red && css.red}
        `}
    >
      {children}
    </button >
  );
};

export default CustomButton;
