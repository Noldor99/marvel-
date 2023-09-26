import { FC, useState } from 'react'
import { useModal } from '../../../../hook/useModal';
import { useGetBrandsQuery } from '../../../../store/api/brandApi'
import { useUpdateHeroMutation } from '../../../../store/api/heroApi'
import CustomButton from '../../../UI/customButton/CustomButton';
import CustomRadioInput from '../../../UI/customRadioInput/CustomRadioInput'
import Modal from '../../../UI/modal/Modal';
import css from './WrapAddBrand.module.sass'

const initState = {

  selectedSubject: '',
}

interface WrapAddBrandProps {
  id: number
}

const WrapAddBrand: FC<WrapAddBrandProps> = ({ id }: WrapAddBrandProps) => {

  const { isOpen, openModal, closeModal } = useModal();

  const [formValue, setFormValue] = useState(initState);

  const { data: brands } = useGetBrandsQuery()

  const [updateHeroMutation] = useUpdateHeroMutation();

  const handleSubjectSelect = (label: string) => {
    setFormValue((prevData) => ({ ...prevData, selectedSubject: label }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append('brandName', formValue.selectedSubject);


    await updateHeroMutation({ id, data: formDataObj })
  };

  return (
    < >
      <CustomButton outlined
        onClick={openModal}
      >
        AddBrand
      </CustomButton>
      <Modal title="Модальне Вікно" open={isOpen} onClose={closeModal}>
        <form
          className={css.form__body}
          onSubmit={onSubmit}
        >
          {brands?.map((label) => (
            <CustomRadioInput
              key={label}
              label={label}
              name='simple'
              selected={formValue.selectedSubject === label}
              onSelect={() => handleSubjectSelect(label)}
            />
          ))}
          <CustomButton type="submit" >
            Submit
          </CustomButton>
        </form>
      </Modal>
    </>
  )
}

export default WrapAddBrand