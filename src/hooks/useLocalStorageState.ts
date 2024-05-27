import { useState, useEffect, Dispatch, SetStateAction } from 'react'

function useLocalStorageState<T>(
  key: string,
  initialState: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key) // 从 localStorage 中获取初始值

    return storedValue ? (JSON.parse(storedValue) as T) : initialState
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value)) // 把更新的数据保存到 localStorage 中
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorageState
