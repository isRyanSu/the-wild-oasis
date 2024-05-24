import { SubmitHandler, useForm } from 'react-hook-form'

import { Cabin, NewCabinData } from '@/features/cabins/types/Cabin'

import useEditCabin from '@/features/cabins/hooks/useEditCabin'

import Form from '@/components/Form'
import FormRow from '@/components/FormRow'
import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import FileInput from '@/components/FileInput'
import Button from '@/components/Button'

type FormData = {
  name: string
  maxCapacity: string
  regularPrice: string
  discount: string
  description: string
  image: string | FileList
}

function EditCabinForm({ selecedCabin }: { selecedCabin: Cabin }) {
  const { editCabin, isEditing } = useEditCabin()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: String(selecedCabin.name),
      maxCapacity: String(selecedCabin.maxCapacity),
      regularPrice: String(selecedCabin.regularPrice),
      discount: String(selecedCabin.discount),
      description: String(selecedCabin.description),
      image: String(selecedCabin.image),
    },
  })

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const isImageChanged = typeof formData.image !== 'string' // 记录图片是否发生了变化
    const newCabinData: NewCabinData = {
      ...formData,
      maxCapacity: parseInt(formData.maxCapacity),
      regularPrice: parseFloat(formData.regularPrice),
      discount: parseFloat(formData.discount),
      image: isImageChanged
        ? (formData.image[0] as File)
        : (formData.image as string), // 如果图片发生了变化，则提取 FileList 数组中的第一个 File 对象作为图片，否则使用原本的图片
    }

    editCabin({ id: selecedCabin.id, newCabinData, isImageChanged })
  }

  return (
    <Form type="normal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          id="name"
          type="text"
          disabled={isEditing}
          {...register('name', {
            required: 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          id="maxCapacity"
          type="number"
          disabled={isEditing}
          {...register('maxCapacity', {
            required: 'This field is required.',
            min: {
              value: 1,
              message: 'Capacity should be at least 1.',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          id="regularPrice"
          type="number"
          disabled={isEditing}
          {...register('regularPrice', {
            required: 'This field is required.',
            min: {
              value: 1,
              message: 'Price should be at least 1.',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          id="discount"
          type="number"
          disabled={isEditing}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required.',
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price.',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isEditing}
          {...register('description', {
            required: 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register('image', {
            required: false,
          })}
        />
      </FormRow>

      <FormRow>
        <Button type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button disabled={isEditing}>Edit</Button>
      </FormRow>
    </Form>
  )
}

export default EditCabinForm
