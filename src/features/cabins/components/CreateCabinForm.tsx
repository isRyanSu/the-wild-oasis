import { useForm, SubmitHandler } from 'react-hook-form'

import { NewCabinData } from '@/features/cabins/types/Cabin'

import useCreateCabin from '@/features/cabins/hooks/useCreateCabin'

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
  image: FileList
}

interface CreateCabinFormProps {
  onCloseModal?: () => void
}

function CreateCabinForm({ onCloseModal }: CreateCabinFormProps) {
  const { createCabin, isCreating } = useCreateCabin()

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      maxCapacity: '',
      regularPrice: '',
      discount: '',
      image: undefined as unknown as FileList,
      description: '',
    },
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newCabinData: NewCabinData = {
      ...data,
      maxCapacity: parseInt(data.maxCapacity),
      regularPrice: parseFloat(data.regularPrice),
      discount: parseFloat(data.discount),
      image: data.image[0], // 提取 FileList 数组中的第一个 File 对象作为 Image
    }

    createCabin(newCabinData, {
      onSuccess: () => {
        // 创建 Cabin 成功后清空表单并且关闭 Modal
        reset()
        onCloseModal?.()
      },
    })
  }

  return (
    <Form
      type={onCloseModal ? 'modal' : 'normal'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          id="name"
          type="text"
          disabled={isCreating}
          {...register('name', {
            required: 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          id="maxCapacity"
          type="number"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
            required: 'This field is required.',
          })}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Create</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
