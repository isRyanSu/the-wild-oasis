import supabase from '@/lib/supabase'

async function logout() {
  const { error: logoutError } = await supabase.auth.signOut()

  // 如果登出时出现错误
  if (logoutError) {
    // 输出错误信息
    console.error('[LogoutError]: ', logoutError.message)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to log out. Please check your network connection or try again later.',
    )
  }
}

export default logout
