import { useState, FormEvent, ChangeEvent } from 'react'

import useLogin from '@/features/authentication/hooks/useLogin'

import Form from '@/components/Form'
import FormRowVertical from '@/components/FormRowVertical'
import Input from '@/components/Input'
import Button from '@/components/Button'
import SpinnerMini from '@/components/SpinnerMini'

function LoginForm() {
  const [email, setEmail] = useState('isRyanSu@gmail.com')
  const [password, setPassword] = useState('99170188')
  const { login, isLogining } = useLogin()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) return

    login({ email, password })
  }

  function handleEmailChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  return (
    <Form type="normal" onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          id="email"
          type="email"
          value={email}
          autoComplete="username"
          disabled={isLogining}
          onChange={handleEmailChange}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          id="password"
          type="password"
          value={password}
          autoComplete="current-password"
          disabled={isLogining}
          onChange={handlePasswordChange}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLogining}>
          {isLogining ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm
