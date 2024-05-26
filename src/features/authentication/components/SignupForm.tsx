import { useForm } from 'react-hook-form'

import useSignup from '@/features/authentication/hooks/useSignup'

import Form from '@/components/Form'
import FormRow from '@/components/FormRow'
import Input from '@/components/Input'
import Button from '@/components/Button'

type FormData = {
  fullName: string
  email: string
  password: string
  passwordConfirm: string
}

function SignupForm() {
  const { signup, isSigningUp } = useSignup()
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  function onSubmit({ fullName, email, password }: FormData) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(), // 清空表单
      },
    )
  }

  return (
    <Form type="normal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          id="fullName"
          type="text"
          disabled={isSigningUp}
          {...register('fullName', { required: 'This field is required.' })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          id="email"
          type="email"
          disabled={isSigningUp}
          {...register('email', {
            required: 'This field is required.',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address.',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          id="password"
          type="password"
          disabled={isSigningUp}
          {...register('password', {
            required: 'This field is required.',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters.',
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          id="passwordConfirm"
          type="password"
          disabled={isSigningUp}
          {...register('passwordConfirm', {
            required: 'This field is required.',
            validate: (value) =>
              value === getValues().password || 'Password needs to match.',
          })}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" disabled={isSigningUp}>
          Cancel
        </Button>
        <Button disabled={isSigningUp}>Create new user</Button>
      </FormRow>
    </Form>
  )
}

export default SignupForm
