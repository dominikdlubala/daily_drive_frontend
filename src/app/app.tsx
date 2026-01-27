import '../styles/global.scss'; 

import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 

import ProtectedRoute from '../features/login/components/ProtectedRoute';
import Root from './pages/Root'; 
import LoginPage from './pages/login/LoginPage'; 
import HomePage from './pages/home/HomePage'; 
import WorkoutsPage from './pages/workouts/WorkoutsPage';
import DietPage from './pages/diet/DietPage';
import AccountPage from './pages/profile/AccountPage';
import CurrentWorkoutPage from './pages/current_workout/CurrentWorkoutPage';
import RegisterPage from './pages/register/RegisterPage';
import StatisticsPage from './pages/statistics/StatisticsPage';
import WorkoutTemplatesPage from './pages/workouts/WorkoutTemplatesPage';
import WorkoutTemplatesFormPage from './pages/workouts/WorkoutTemplatesFormPage';

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
        element: 
                  <HomePage />
                 
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
        path: '/workouts/current-workout', 
        element: <ProtectedRoute>
            <CurrentWorkoutPage />
        </ProtectedRoute>
      }, 
      {
        path: '/workouts/templates', 
        element: (
          <ProtectedRoute>
            <WorkoutTemplatesPage />
          </ProtectedRoute>
        )
      }, 
      {
        path: '/workouts/templates/create', 
        element: (
          <ProtectedRoute>
            <WorkoutTemplatesFormPage />
          </ProtectedRoute>
        )
      }, 
      {
        path: '/workouts/templates/edit/:id?', 
        element: (
          <ProtectedRoute>
            <WorkoutTemplatesFormPage />
          </ProtectedRoute>
        )
      }
    ]
  }
])

export default function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}