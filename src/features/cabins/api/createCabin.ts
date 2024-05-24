import { NewCabinData } from '@/features/cabins/types/Cabin'

import supabase, { supabaseCabinImagesUrl } from '@/lib/supabase'

async function createCabin(newCabinData: NewCabinData) {
  // 生成图片的唯一文件名
  const imageName =
    `${Math.trunc(Math.random() * 100000000)}-${(newCabinData.image as File).name}`.replaceAll(
      '/',
      '',
    )

  // 创建 Cabin
  const { data: newCabin, error: createCabinError } = await supabase
    .from('Cabins')
    .insert([
      { ...newCabinData, image: `${supabaseCabinImagesUrl}/${imageName}` },
    ])
    .select()
    .single()

  // 如果创建 Cabin 时出现错误
  if (createCabinError) {
    // 输出错误信息
    console.error('[CreateCabinError]: ', createCabinError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to create cabin. Please check your network connection or try again later.',
    )
  }

  // 上传 Image
  const { error: uploadImageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabinData.image)

  // 如果上传 Image 时出现错误，则删除刚刚创建的 Cabin
  if (uploadImageError) {
    // 删除 Cabin
    await supabase.from('Cabins').delete().eq('id', newCabin.id)

    // 输出错误信息
    console.error('[UploadImageError]: ', uploadImageError)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to upload the cabin image, and the cabin was not created. Please check your network connection or try again later.',
    )
  }

  return null
}

export default createCabin
