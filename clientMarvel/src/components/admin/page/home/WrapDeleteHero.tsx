import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useModal } from '../../../../hook/useModal';
import { IHero } from '../../../../model/heroModel';
import { useDeleteHeroMutation } from '../../../../store/api/heroApi';
import CustomButton from '../../../UI/customButton/CustomButton';
import IconButton from '../../../UI/iconButton/IconButton';
import Modal from '../../../UI/modal/Modal';
import css from './WrapDeleteHero.module.sass'

interface WrapDeleteHeroProps {
  hero: IHero
}

const WrapDeleteHero: FC<WrapDeleteHeroProps> = ({ hero }: WrapDeleteHeroProps) => {

  const { isOpen, openModal, closeModal } = useModal()


  const [deleteHero] = useDeleteHeroMutation();

  return (
    < >
      <IconButton onClick={openModal}>
        <FaTrash />
      </IconButton>
      <Modal
        open={isOpen} onClose={closeModal}
        title='Do you want delete this hero?'
      >
        <div className={css.modal__body}>
          <CustomButton type="button" onClick={closeModal}>
            no
          </CustomButton>
          <CustomButton
            red
            onClick={() => {
              deleteHero(hero.id)
              closeModal()
            }}
          >
            yes
          </CustomButton>
        </div>
      </Modal>
    </>
  )
}

export default WrapDeleteHero