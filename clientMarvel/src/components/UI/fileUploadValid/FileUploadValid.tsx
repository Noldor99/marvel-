/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import css from './FileUploadValid.module.sass';

interface FileUploadProps {
  name: string;
  register: any;
  errors: any;
}

const FileUploadValid: React.FC<FileUploadProps> = (props: FileUploadProps) => {

  const { register, errors, name, ...propsRe } = props

  const hasError = !!errors?.[name];



  return (
    <div>
      <label className={`${css['drop-container']} ${hasError && css.error}`}>
        <span className={`${css['drop-title']} ${hasError && css.error}`}>Upload</span>
        <input
          className={`${css.upload__input} ${errors?.title_img && css.error}`}
          {...register(name)}
          type="file"
          title="Оберіть файл"
          {...propsRe}
        />
        <div className={`${css.FileUploadError} ${hasError && css.error}`}>
          {name && <span>{errors?.[name]?.message}</span>}
        </div>
      </label>
    </div>
  );
}

export default FileUploadValid;
