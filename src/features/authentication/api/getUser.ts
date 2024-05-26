import supabase from '@/lib/supabase'

async function getUser() {
  const { data: session } = await supabase.auth.getSession()

  if (!session.session) return null

  // 获取用户
  const {
    data: { user },
    error: getUserError,
  } = await supabase.auth.getUser()

  // 如果获取用户时出现错误
  if (getUserError) {
    // 输出错误信息
    console.error('[GetUserError]: ', getUserError.message)

    // 抛出错误信息
    throw new Error(
      'Error: Unable to get the user info. Please check your network connection or try again later.',
    )
  }

  return user
}

export default getUser
