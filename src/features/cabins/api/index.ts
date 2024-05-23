import supabase from '@/lib/supabase'

export async function getAllCabins() {
  const { data: allCabins, error: getAllCabinsError } = await supabase
    .from('Cabins')
    .select('*')

  if (getAllCabinsError) {
    console.error('[GetAllCabinsError]: ', getAllCabinsError)

    throw new Error(
      'Error: Unable to load cabins. Please check your network connection or try again later.',
    )
  }

  return allCabins
}
