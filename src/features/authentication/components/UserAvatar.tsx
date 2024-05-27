import styled from 'styled-components'

import useUser from '@/features/authentication/hooks/useUser'

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
`

const Avatar = styled.img`
  display: block;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`
function UserAvatar() {
  const { user } = useUser()

  return (
    <StyledUserAvatar>
      <Avatar
        src={user?.identities?.[0]?.identity_data?.avatar || 'default-user.jpg'}
        alt={`Avatar of ${user?.identities?.[0]?.identity_data?.fullName}`}
      />
      <span>{user?.identities?.[0]?.identity_data?.fullName}</span>
    </StyledUserAvatar>
  )
}

export default UserAvatar
