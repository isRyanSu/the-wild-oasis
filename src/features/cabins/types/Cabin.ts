export type Cabin = {
  id: number
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  description: string
  image: string
}

export type NewCabinData = {
  name: string
  maxCapacity: number
  regularPrice: number
  discount: number
  description: string
  image: string | File
}
