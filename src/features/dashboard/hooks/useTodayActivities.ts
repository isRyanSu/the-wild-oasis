import { useQuery } from '@tanstack/react-query'

import getAllTodayActivities from '@/features/dashboard/api/getAllTodayActivities'

function useTodayActivities() {
  const { isPending: isLoadingAllTodayActivities, data: allTodayActivities } =
    useQuery({
      queryFn: getAllTodayActivities,
      queryKey: ['Today-Activities'],
    })

  return { isLoadingAllTodayActivities, allTodayActivities }
}

export default useTodayActivities
