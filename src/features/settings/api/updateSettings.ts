import supabase from '@/lib/supabase'

async function updateSetting(newSetting: {
  [key in
    | 'minBookingLength'
    | 'maxBookingLength'
    | 'maxGuestsPerBooking'
    | 'breakfastPrice']?: number
}) {
  // 更新 Settings
  const { error: updateSettingError } = await supabase
    .from('Settings')
    .update(newSetting)
    .eq('id', 1) // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .single()

  // 如果更新 Settings 时出现错误
  if (updateSettingError) {
    // 输出错误信息
    console.error('[UpdateSettingError]: ', updateSettingError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to update setting. Please check your network connection or try again later.',
    )
  }

  return null
}

export default updateSetting
