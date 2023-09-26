import { useGetAllRoleQuery } from '../../../../store/api/roleApi'
import { useAddRoleToUserMutation, useDeleteRoleFromUserMutation, useGetAllUserQuery } from '../../../../store/api/userApi'
import CustomButton from '../../../UI/customButton/CustomButton'
import css from './AddRole.module.sass'

const AddRole = () => {


  const { data: role } = useGetAllRoleQuery()
  const { data: users } = useGetAllUserQuery()

  const [fetchAddRole] = useAddRoleToUserMutation()
  const [fetchDeleteRole] = useDeleteRoleFromUserMutation()

  return (
    <div className={css.container}>
      <p className={css.title}>Role list:</p>
      {role?.map((role) => (
        <div key={role.id} className={css.content}>
          <p>{role.value}</p>
          <p>{role.description}</p>
        </div>
      ))}
      <p className={css.title}>Users:</p>
      {users?.map((user) => (
        <div className={css.body} key={user.id}>
          <div className={css.user__content}>
            <p>{user.email}</p>
            <p>{user.roles && user.roles?.length !== 0 ? user.roles[0].value : null}</p>
          </div>

          {user.roles?.length === 0 ?
            <CustomButton outlined
              onClick={() => fetchAddRole({ userId: user.id, value: 'ADMIN' })}
            >
              Add Admin
            </CustomButton>
            :
            <CustomButton outlined
              onClick={() => fetchDeleteRole({ userId: user.id, roleValue: 'ADMIN' })}
            >
              Delet Admin
            </CustomButton>
          }
        </div>
      )
      )}
    </div>
  )
}

export default AddRole