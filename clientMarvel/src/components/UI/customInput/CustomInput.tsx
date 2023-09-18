/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import css from './CustomInput.module.sass'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  errors?: any
  register?: any
}

const InputStandart: React.FC<CustomInputProps> = (props) => {

  const { register, errors, name, label, ...propsRe } = props

  let hasError = null
  if (name) {

    hasError = !!errors?.[name];
  }

  const [focused, setFocused] = useState(false);

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className={`${css.customInput} ${focused ? css.hasValue : ''}`}>
      <label
        className={hasError ? css.errorLabel : css.inputLabel}
      >{label}</label>
      <input
        type="text"
        className={css.inputField}
        {...(register && { ...register(name) })}
        onFocus={handleFocus}
        onBlur={() => setFocused(false)}
        {...propsRe}
      />
      {name && <span>{errors?.[name]?.message}</span>}
    </div>
  );
};

export default InputStandart;
