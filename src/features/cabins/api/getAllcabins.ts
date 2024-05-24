import supabase from '@/lib/supabase'

async function getAllCabins() {
  // 获取所有 Cabin
  const { data: allCabins, error: getAllCabinsError } = await supabase
    .from('Cabins')
    .select('*')

  // 如果获取所有 Cabin 时出现错误
  if (getAllCabinsError) {
    // 输出错误信息
    console.error('[GetAllCabinsError]: ', getAllCabinsError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to load cabins. Please check your network connection or try again later.',
    )
  }

  return allCabins
}

export default getAllCabins
