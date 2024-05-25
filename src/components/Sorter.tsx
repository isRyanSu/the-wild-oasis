import { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'

import Select from '@/components/Select'

interface Option {
  value: string
  label: string
}

interface SortByProps {
  options: Option[]
}

function Sorter({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const sort = searchParams.get('sort') || '' // 获取 sort 值

  // 处理 sort 值改变
  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    searchParams.set('sort', e.target.value)

    setSearchParams(searchParams)
  }

  return (
    <Select
      type="white"
      value={sort}
      options={options}
      onChange={handleChange}
    />
  )
}

export default Sorter
