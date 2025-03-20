import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 

import ProtectedRoute from './components/login/ProtectedRoute';
import Root from './pages/Root'; 
import LoginPage from './pages/LoginPage'; 
import HomePage from './pages/HomePage'; 
import RegisterPage from './pages/RegisterPage'; 
import WorkoutsPage from './pages/WorkoutsPage';
import DietPage from './pages/DietPage';
import AccountPage from './pages/AccountPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, 
    children: [
      {
        path: '/login', 
        element: <LoginPage />
      }, 
      {
        index: true, 
        element: <ProtectedRoute>
                  <HomePage />
                 </ProtectedRoute>
      }, 
      {
        path: '/register', 
        element: <RegisterPage />
      }, 
      {
        path: '/workouts', 
        element: <ProtectedRoute>
                  <WorkoutsPage />
                </ProtectedRoute>
      }, 
      {
        path: '/diet', 
        element: <ProtectedRoute>
                  <DietPage />
                </ProtectedRoute>

      }, 
      {
        path: '/account', 
        element: <ProtectedRoute>
                  <AccountPage/>
                </ProtectedRoute>
      }
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}