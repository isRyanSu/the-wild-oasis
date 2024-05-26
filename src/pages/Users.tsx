import Heading from '@/components/Heading'
import SignupForm from '@/features/authentication/components/SignupForm'

function Users() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  )
}

export default Users
