import supabase from '@/lib/supabase'

interface loginProps {
  email: string
  password: string
}

async function login({ email, password }: loginProps) {
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    })

  // 如果登陆时出现错误
  if (loginError) {
    // 输出错误信息
    console.error('[LoginError]: ', loginError.message)

    // 抛出错误信息
    throw new Error('Provided email or password are incorrect!')
  }

  return loginData
}

export default login
