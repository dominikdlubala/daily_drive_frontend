import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 

import ProtectedRoute from './components/login/ProtectedRoute';
import Root from './pages/Root'; 
import LoginPage from './pages/LoginPage'; 
import HomePage from './pages/HomePage'; 
import RegisterPage from './pages/RegisterPage'; 
import WorkoutsPage from './pages/workouts/WorkoutsPage';
import DietPage from './pages/DietPage';
import AccountPage from './pages/AccountPage';
import StatisticsPage from './pages/StatisticsPage';
import CurrentWorkoutPage from './pages/current_workout/CurrentWorkoutPage';
import ModalManager from './components/modal/ModalManager';

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
      },
      {
        path: '/statistics', 
        element: <ProtectedRoute>
                  <StatisticsPage/>
                </ProtectedRoute>
      }, 
      {
        path: '*', 
        element: <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
      }, 
      {
        path: '/currentWorkout', 
        element: <ProtectedRoute>
            <CurrentWorkoutPage />
        </ProtectedRoute>
      }
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}