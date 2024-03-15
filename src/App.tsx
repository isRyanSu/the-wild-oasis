import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom'

import Account from '@/pages/Account'
import Booking from '@/pages/Booking'
import Bookings from '@/pages/Bookings'
import Cabins from '@/pages/Cabins'
import Checkin from '@/pages/Checkin'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import PageNotFound from '@/pages/PageNotFound'
import Settings from '@/pages/Settings'
import Users from '@/pages/Users'

import AppLayout from '@/components/AppLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate replace to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/:bookingId" element={<Booking />} />
        <Route path="checkin/:bookingId" element={<Checkin />} />
        <Route path="cabins" element={<Cabins />} />
        <Route path="users" element={<Users />} />
        <Route path="settings" element={<Settings />} />
        <Route path="account" element={<Account />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>,
  ),
)

function App() {
  return <RouterProvider router={router} />
}

export default App
