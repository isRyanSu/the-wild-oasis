import supabase from '@/lib/supabase'

interface signupProps {
  fullName: string
  email: string
  password: string
}

async function signup({ fullName, email, password }: signupProps) {
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  })

  // 如果注册时出现错误
  if (signupError) {
    // 输出错误信息
    console.error('[SignupError]: ', signupError.message)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to sign up. Please check your network connection or try again later.',
    )
  }

  return signupData
}

export default signup
