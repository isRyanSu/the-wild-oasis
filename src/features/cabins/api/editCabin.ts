import { NewCabinData } from '@/features/cabins/types/Cabin'

import supabase, { supabaseCabinImagesUrl } from '@/lib/supabase'

async function editCabin(
  cabinId: number,
  newCabinData: NewCabinData,
  isImageChanged: boolean,
) {
  // 如果图片发生变化，则生成图片的唯一文件名，否则使用原有的 Image 地址
  const imageName = isImageChanged
    ? `${Math.trunc(Math.random() * 100000000)}-${(newCabinData.image as File).name}`.replaceAll(
        '/',
        '',
      )
    : (newCabinData.image as string)

  // 更新 Cabin
  const { error: editCabinError } = await supabase
    .from('Cabins')
    .update({
      ...newCabinData,
      image: isImageChanged
        ? `${supabaseCabinImagesUrl}/${imageName}`
        : imageName,
    })
    .eq('id', cabinId)
    .select()
    .single()

  // 如果更新 Cabin 时出现错误
  if (editCabinError) {
    // 输出错误信息
    console.error('[EditCabinError]: ', editCabinError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to edit cabin. Please check your network connection or try again later.',
    )
  }

  // 如果图片没有发生变化，则直接返回
  if (!isImageChanged) return null

  // 上传 Image
  const { error: uploadImageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabinData.image)

  // 如果上传 Image 时出现错误
  if (uploadImageError) {
    // 输出错误信息
    console.error('[UploadImageError]: ', uploadImageError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to upload the cabin image. Please check your network connection or try again later.',
    )
  }

  return null
}

export default editCabin
