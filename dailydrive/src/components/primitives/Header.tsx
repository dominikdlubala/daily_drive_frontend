import { useNavigate } from 'react-router-dom'; 

import { useAuth } from '../../hooks/useAuth'; 

export default function Header() {

    const navigate = useNavigate(); 
    const { token, logout } = useAuth(); 

    return (
        <div className="header">
            <div className="link link-header link-header--left">
                Treningi
            </div>
            <div className="link link-header link-header--logo">
                DailyDrive
            </div>
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