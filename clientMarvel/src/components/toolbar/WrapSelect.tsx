import { useState } from 'react'
import { useTypedDispatch } from '../../hook/useTypedDispatch';
import { Select, SelectOption } from '../UI/costomSelect/Select';


const options = [
  // { label: 'latest', value: 1 },
  { label: 'lowest-price', value: 2 },
  { label: 'highest-price', value: 3 },
  { label: 'a-z', value: 4 },
  { label: 'z-a', value: 5 },
]

const WrapSelect = () => {


  const [sort, setSort] = useState<SelectOption | undefined>(options[0])

  const { SORT_HEROES } = useTypedDispatch()


  const nundleSort = (o_0: SelectOption | undefined): void => {
    setSort(o_0)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    SORT_HEROES({ sort: o_0.label });
  }

  return (
    <div>
      <Select
        options={options}
        value={sort}
        onChange={nundleSort} />
    </div>
  )
}

export default WrapSelect