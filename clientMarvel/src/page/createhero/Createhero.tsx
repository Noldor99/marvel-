import { useNavigate, useParams } from 'react-router-dom';
import CustomButton from '../../components/UI/customButton/CustomButton';
import CustomInput from '../../components/UI/customInput/CustomInput';
import { useTypedSelector } from '../../hook/useTypedSelector';
import { IHero } from '../../model';
import { useCreateHeroMutation, useUpdateHeroMutation } from '../../store/api/heroApi';
import validationSchema from '../../schema'
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import css from './Createhero.module.sass'
import FileUploadValid from '../../components/UI/fileUploadValid/FileUploadValid';

interface IInput {
  nickname: string,
  real_name: string,
  origin_description: string,
  catch_phrase: string,
}

export interface IFormData extends IInput {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title_img?: any
}


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


  const heroesEdit = heroes.find((item: IHero) => item.id === parseInt(id, 10));

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: detectForm(id, initialState, heroesEdit)
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


  const onSubmit: SubmitHandler<IFormData> = async (data) => {

    const { nickname, real_name, origin_description, catch_phrase, title_img } = data;

    const formDataObj = new FormData();
    formDataObj.append('nickname', nickname);
    formDataObj.append('real_name', real_name);
    formDataObj.append('origin_description', origin_description);
    formDataObj.append('catch_phrase', catch_phrase);
    if (title_img) {
      formDataObj.append('title_img', title_img[0]);
    }
    if (id === "ADD") {
      await createHeroMutation(formDataObj);
    } else {
      await updateHeroMutation({ id, formDataObj });

    }
    reset(initialState);
  };



  return (
    <div className={css.container}>
      <h1>{detectForm(id, 'Add New Hero', 'Edit Hero')}</h1>
      <form
        className={css.form__body}
        onSubmit={handleSubmit(onSubmit)}
      >
        {[
          { label: 'Nickname', field: 'nickname', type: 'text' },
          { label: 'Real name', field: 'real_name', type: 'text' },
          { label: 'Origin description', field: 'origin_description', type: 'text' },
          { label: 'Catch phrase', field: 'catch_phrase', type: 'text' },
        ].map((input) => (
          <CustomInput
            key={input.field}
            label={input.label}
            name={input.field}
            register={register}
            errors={errors} />
        ))}
        <div>
          <FileUploadValid
            name='title_img'
            register={register}
            errors={errors}
          />
          <div className={css.button__container}>
            <CustomButton disabled={!isValid} orange type="submit">
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

