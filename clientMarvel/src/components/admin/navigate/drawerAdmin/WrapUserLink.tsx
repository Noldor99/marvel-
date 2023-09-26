import { useNavigate } from 'react-router-dom'
import CustomButton from '../../../UI/customButton/CustomButton'

const WrapUserLink = () => {

  const navigate = useNavigate()


  return (
    <>
      <CustomButton fullWIdth outlined
        onClick={() => navigate('/')}
      >
        User
      </CustomButton>
    </>
  )
}

export default WrapUserLink