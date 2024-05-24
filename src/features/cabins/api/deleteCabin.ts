import supabase from '@/lib/supabase'

async function deleteCabin(cabinId: number) {
  // 删除 Cabin
  const { error: deleteCabinError } = await supabase
    .from('Cabins')
    .delete()
    .eq('id', cabinId)

  // 如果删除 Cabin 时出现错误
  if (deleteCabinError) {
    // 输出错误信息
    console.error('[DeleteCabinError]: ', deleteCabinError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to delete cabin. Please check your network connection or try again later.',
    )
  }

  return null
}

export default deleteCabin
