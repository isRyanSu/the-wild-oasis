import supabase from '@/lib/supabase'

async function getAllSettings() {
  // 获取所有 Setting
  const { data: allSettings, error: getAllSettingsError } = await supabase
    .from('Settings')
    .select('*')
    .single()

  if (getAllSettingsError) {
    // 输出错误信息
    console.error('[GetAllSettingsError]: ', getAllSettingsError)

    // 抛出错误信息
    throw new Error('Settings could not be loaded')
  }

  return allSettings
}

export default getAllSettings
