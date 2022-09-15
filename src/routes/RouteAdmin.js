import React from 'react'

const Users = React.lazy(() => import('../pages/Admin/User'))
const Location = React.lazy(() => import('../pages/Admin/Location'))
const Room = React.lazy(() => import('../pages/Admin/Room'))

const routes = [
    { path: '/user', name: 'Users', element: Users, exact: true },
    { path: '/location', name: 'Locations', element: Location, exact: true },
    { path: '/room', name: 'Rooms', element: Room, exact: true },
  ]

export default routes  
