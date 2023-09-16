import React from "react";
import css from './FileUpload.module.sass';

interface FileUploadProps {
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}

const FileUpload: React.FC<FileUploadProps> = ({ handleImageChange }: FileUploadProps) => {

  const [, setFileName] = React.useState('File name');

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      handleImageChange(event);
    }
  };

  return (
    <div>
      <label className={`${css['drop-container']}`}  >
        <span className={`${css['drop-title']}`}>Upload</span>
        <input
          className={`${css.upload__input}`}
          id="file-upload"
          type="file"
          title="Оберіть файл"
          onChange={handleFileInputChange}
        />
      </label>
    </div>
  );
}

export default FileUpload;
