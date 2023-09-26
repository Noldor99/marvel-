import React from 'react';
import css from './CustomButton.module.sass'

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWIdth?: boolean
  orange?: boolean
  red?: boolean
  green?: boolean
  outlined?: boolean
}

const CustomButton: React.FC<CustomButtonProps> = (
  { children, orange, red, fullWIdth, outlined, green, ...props }
) => {

  return (
    <button {...props}
      className={`
        ${css.customButton} 
        ${fullWIdth && css.fullWIdth}
        ${outlined && css.outlined}
        ${orange && outlined ? css.orangeOutlined : ''}
        ${orange && css.orange}
        ${green && css.green}
        ${green && outlined ? css.greenOutlined : ''}
        ${red && css.red}
        `}
    >
      {children}
    </button >
  );
};

export default CustomButton;
