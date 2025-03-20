import { useNavigate, Link } from 'react-router-dom'; 

import { useAuth } from '../../hooks/useAuth'; 

export default function Header() {

    const navigate = useNavigate(); 
    const { token, logout } = useAuth(); 


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
                    <>
                        <div className="link link-header--login" onClick={() => navigate('/account')}>Moje Konto</div>
                        <div className="link link-header--login" onClick={() => logout()}>Wyloguj</div> 
                    </>
                    : 
                    <li className="link link-header--login" onClick={() => navigate('/login')}>Zaloguj się</li>
                }
            </div>
        </div>
    )
}