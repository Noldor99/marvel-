import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../components/UI/customButton/CustomButton';
import CustomInput from '../../components/UI/customInput/CustomInput';
import FileUpload from '../../components/UI/fileUpload/FileUpload';
import { useTypedSelector } from '../../hook/useTypedSelector';
import { ICreateHero, IHero } from '../../model';
import { useCreateHeroMutation, useUpdateHeroMutation } from '../../store/api/heroApi';
import css from './Createhero.module.sass'


const initialState = {
  nickname: '',
  real_name: '',
  origin_description: '',
  catch_phrase: '',
  title_img: undefined,
};

const CreateHeroPage = () => {

  const naigate = useNavigate();

  const { id } = useParams() as { id: string };

  const { heroes } = useTypedSelector(state => state.hero);

  const numericId = parseInt(id, 10);

  const heroesEdit = heroes.find((item: IHero) => item.id === numericId);

  const [formData, setFormData] = useState<ICreateHero>(() => {
    const newState = detectForm(id, initialState, heroesEdit);
    return newState;
  });

  const [createHeroMutation] = useCreateHeroMutation();

  const [updateHeroMutation] = useUpdateHeroMutation();


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function detectForm(id: any, f1: any, f2: any) {
    if (id === 'ADD') {
      return f1;
    }
    return f2;
  }


  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { nickname, real_name, origin_description, catch_phrase, title_img } = formData;


    const formDataObj = new FormData();
    formDataObj.append('nickname', nickname);
    formDataObj.append('real_name', real_name);
    formDataObj.append('origin_description', origin_description);
    formDataObj.append('catch_phrase', catch_phrase);
    if (title_img) {
      formDataObj.append('title_img', title_img);
    }
    if (id === "ADD") {
      await createHeroMutation(formDataObj);
    } else {
      await updateHeroMutation({ id, formDataObj });

    }
    try {
      setFormData(initialState);
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData(prevFormData => ({
        ...prevFormData,
        title_img: file,
      }));
    }
  };

  return (
    <div className={css.container}>
      <h1>{detectForm(id, 'Add New Hero', 'Edit Hero')}</h1>
      <form
        className={css.form__body}
        onSubmit={handleFormSubmit}
      >
        <CustomInput
          label='Nickname'
          name="nickname"
          value={formData?.nickname}
          onChange={handleInputChange}

        />
        <CustomInput
          label='Real name'
          name="real_name"
          value={formData?.real_name}
          onChange={handleInputChange}
        />
        <CustomInput
          label='Origin description'
          name="origin_description"
          value={formData?.origin_description}
          onChange={handleInputChange}
        />
        <CustomInput
          label='Catch phrase'
          name="catch_phrase"
          value={formData?.catch_phrase}
          onChange={handleInputChange}
        />
        <div>
          <FileUpload handleImageChange={handlePictureChange} />
          <div className={css.button__container}>
            <CustomButton orange type="submit">
              {detectForm(id, "Save Hero", "Edit Hero")}
            </CustomButton>
            <CustomButton onClick={() => naigate(-1)}>
              Back
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateHeroPage;

