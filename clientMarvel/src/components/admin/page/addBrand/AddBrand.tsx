import { FormEvent, useState } from 'react'
import { useCreateBrandMutation, useDeleteBrandMutation, useGetBrandsQuery } from '../../../../store/api/brandApi'
import CustomButton from '../../../UI/customButton/CustomButton'
import InputStandart from '../../../UI/customInput/CustomInput';
import css from './AddBrand.module.sass'

const AddBrand = () => {

  const [brandName, setBrandName] = useState<string>();

  const { data: brands } = useGetBrandsQuery()

  const [fetchDelete] = useDeleteBrandMutation()
  const [fetchCreate] = useCreateBrandMutation()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (brandName) {
      await fetchCreate({ name: brandName })
    }
  };


  return (
    <div className={css.container}>
      {brands?.map((brand) => (
        <div key={brand} className={css.content}>
          <p>{brand}</p>
          <CustomButton red
            onClick={() => fetchDelete(brand)}
          >Delete
          </CustomButton>
        </div>
      ))}
      <form
        className={css.form__body}
        onSubmit={onSubmit}
      >
        <InputStandart
          label='Name Brand'
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        <CustomButton type="submit" >
          Submit
        </CustomButton>
      </form>
    </div>
  )
}

export default AddBrand