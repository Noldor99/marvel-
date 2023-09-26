import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL_SERVER } from "../../../../constants/url";
import CustomButton from "../../../UI/customButton/CustomButton";
import FileUpload from "../../../UI/fileUpload/FileUpload";
import IconButton from "../../../UI/iconButton/IconButton";
import css from './ImageAdd.module.sass'
import { FaTrash } from 'react-icons/fa';
import { IImage } from "../../../../model/imageModel";
import { useGetHeroQuery } from "../../../../store/api/heroApi";
import { useDeleteImageMutation, useCreateImageMutation } from "../../../../store/api/imageApi";

const ImageAdd = () => {
  const naigate = useNavigate();

  const { id } = useParams() as { id: string };
  const idNum = parseInt(id, 10)
  const { data: hero } = useGetHeroQuery(idNum);


  const [formFile, setFormFile] = useState<File | undefined>(undefined);

  const [deleteImage] = useDeleteImageMutation();
  const [createImage] = useCreateImageMutation();

  const handleDeleteImage = (powerId: number) => {
    deleteImage(powerId);
  };


  if (!hero) {
    return null;
  }

  const handleCreateImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formFile) {
      const formData = new FormData();
      formData.append('heroId', hero.id.toString());
      formData.append('imageHero', formFile);
      await createImage(formData);
    }
  };

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormFile(file);
    }
  };

  return (
    <div className={css.container}>
      <h4>Images:</h4>
      {hero?.images.map((image: IImage) => (
        <div key={image.id}>
          <div className={css.image__container}>
            <div className={css.image__body}>
              <img src={`${BASE_URL_SERVER}/${image.imageHero}`} alt={image.imageHero} />
            </div>
            <div>
              <IconButton
                onClick={() => handleDeleteImage(image.id)}>
                <FaTrash />
              </IconButton>
            </div>
          </div>
        </div>
      ))}
      <form onSubmit={handleCreateImage}>
        <div className={css.btn__container}>
          <div>
            <FileUpload handleImageChange={handlePictureChange} />
          </div>
          <div className={css.btn__body}>
            <CustomButton type="submit">Submit</CustomButton>
            <CustomButton onClick={() => {
              setFormFile(undefined)
              naigate(-1)
            }}>
              Back
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ImageAdd;
