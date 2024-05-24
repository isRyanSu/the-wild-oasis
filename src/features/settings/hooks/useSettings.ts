import { useQuery } from '@tanstack/react-query'

import getAllSettings from '@/features/settings/api/getAllSettings'

function useSettings() {
  const {
    isPending: isLoadingAllSettings,
    data: allSettings,
    error: getAllSettingsError,
  } = useQuery({
    queryKey: ['Settings'],
    queryFn: getAllSettings,
  })

  return { isLoadingAllSettings, allSettings, getAllSettingsError }
}

export default useSettings
