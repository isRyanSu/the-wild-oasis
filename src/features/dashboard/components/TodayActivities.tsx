import styled from 'styled-components'

import useTodayActivities from '@/features/dashboard/hooks/useTodayActivities'
import TodayActivity from '@/features/dashboard/components/TodayActivity'

import Row from '@/components/Row'
import Heading from '@/components/Heading'
import Spinner from '@/components/Spinner'

const StyledToday = styled.div`
  display: flex;
  flex-direction: column;
  grid-column: 1 / span 2;
  gap: 2.4rem;
  padding: 3.2rem;
  padding-top: 2.4rem;

  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
`

const TodayActivityList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`

const NoActivity = styled.p`
  margin-top: 0.8rem;
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
`

function TodayActivities() {
  const { isLoadingAllTodayActivities, allTodayActivities } =
    useTodayActivities()

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoadingAllTodayActivities ? (
        allTodayActivities?.length !== 0 ? (
          <TodayActivityList>
            {allTodayActivities?.map((todayActivity) => (
              <TodayActivity
                key={todayActivity.id}
                todayActivity={todayActivity}
              />
            ))}
          </TodayActivityList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  )
}

export default TodayActivities
