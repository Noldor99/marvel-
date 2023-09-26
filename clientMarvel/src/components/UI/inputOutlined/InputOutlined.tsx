/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import css from './InputOutlined.module.sass';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name?: string;
  type?: string;
  helperText?: string;
  register?: any;
  errors?: any;
}

const InputOutlined: React.FC<CustomInputProps> = (props: CustomInputProps) => {

  const { label, name, helperText, register, errors, ...propsRe } = props

  let hasError = null
  if (name) {
    hasError = !!errors?.[name];
  }


  return (
    <>
      <div
        className={`${css.inputBox}`}
      >
        <input
          className={`${hasError ? css.errorInput : css.validInput}`}
          {...(register && { ...register(name) })}
          required
          {...propsRe}
        />

        <span className={hasError ? css.errorLabel : css.validLabel}>{label}</span>
        <p className={hasError ? css.errorText : css.validText}>{helperText}</p>
        {name &&
          <div className={css.error}>{errors?.[name]?.message}</div>
        }
      </div>
    </>
  );
};

export default InputOutlined;
