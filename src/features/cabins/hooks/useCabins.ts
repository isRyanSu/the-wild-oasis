import { useQuery } from '@tanstack/react-query'

import getAllCabins from '@/features/cabins/api/getAllcabins'

function useCabins() {
  const {
    isPending: isLoadingAllCabins,
    data: allCabins,
    error: getAllCabinsError,
  } = useQuery({
    queryKey: ['Cabins'],
    queryFn: getAllCabins,
  })

  return { isLoadingAllCabins, allCabins, getAllCabinsError }
}

export default useCabins
