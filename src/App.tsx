import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router'

const SearchUserRepository = React.lazy(() => import('./pages/search-repository/SearchRepository'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchUserRepository />,
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
