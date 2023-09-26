import { FC } from 'react'
import { useModal } from '../../../../hook/useModal';
import { IHero } from '../../../../model/heroModel';
import CustomButton from '../../../UI/customButton/CustomButton';
import Modal from '../../../UI/modal/Modal';
import PowerAdd from '../../powerAdd/PowerAdd';

interface WrapPowerProps {
  hero: IHero
}

const WrapPower: FC<WrapPowerProps> = ({ hero }: WrapPowerProps) => {

  const { isOpen, openModal, closeModal } = useModal();


  return (
    < >
      <CustomButton outlined
        onClick={openModal}
      >
        AddPower
      </CustomButton>
      <Modal title="Модальне Вікно" open={isOpen} onClose={closeModal}>
        <PowerAdd hero={hero} />
      </Modal>
    </>
  )
}

export default WrapPower