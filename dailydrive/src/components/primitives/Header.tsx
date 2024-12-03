import { useNavigate, Link } from 'react-router-dom'; 

import { useAuth } from '../../hooks/useAuth'; 

// test code
import { useAppSelector } from '../../hooks/useAppSelector';

export default function Header() {

    const navigate = useNavigate(); 
    const { token, logout } = useAuth(); 

    const currentWorkout  = useAppSelector(state => state.workout.currentWorkout); 

    console.log(currentWorkout); 

    return (
        <div className="header">
            <Link to={'/workouts'}className="link link-header link-header--left">
                Treningi
            </Link>
            <Link to={'/'} className="link link-header link-header--logo">
                DailyDrive
            </Link>
            <div className="link link-header link-header--left">
                { 
                    token 
                    ? 
                    <li className="link link-header--login" onClick={() => logout()}>Wyloguj</li> 
                    : 
                    <li className="link link-header--login" onClick={() => navigate('/login')}>Zaloguj się</li>
                }
            </div>
        </div>
    )
}