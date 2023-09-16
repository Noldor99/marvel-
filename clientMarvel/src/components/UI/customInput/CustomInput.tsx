import React, { useState } from 'react';
import css from './CustomInput.module.scss';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  errorMessage,
  value,
  label,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className={`${css.customInput} ${focused || value ? css.hasValue : ''}`}>
      <label className={css.inputLabel}>{label}</label>
      <input
        type="text"
        className={css.inputField}
        value={value}
        onFocus={handleFocus}
        onBlur={() => setFocused(false)}
        {...props}
      />
      <div className={css.inputLine}></div>
      <span>{errorMessage}</span>
    </div>
  );
};

export default CustomInput;
