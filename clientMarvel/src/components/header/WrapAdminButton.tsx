import { useNavigate } from 'react-router-dom';
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute'
import CustomButton from '../UI/customButton/CustomButton'

const WrapAdminButton = () => {

  const navigate = useNavigate();


  return (
    <>
      <AdminOnlyLink>
        <CustomButton outlined green
          onClick={() => navigate('admin')}
        >
          ADMIN
        </CustomButton>
      </AdminOnlyLink>
    </>
  )
}

export default WrapAdminButton