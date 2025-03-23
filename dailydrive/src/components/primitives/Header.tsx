import { useNavigate, Link, useLocation } from 'react-router-dom'; 
import { useAuth } from '../../hooks/useAuth'; 

export default function Header() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const { token, logout } = useAuth(); 

    const getLinkClassName = (path: string) => {
        return location.pathname === path ? 'link link-header link-header--active' : 'link link-header';
    };

    return (
        <div className="header">
            <div className="header-links--left">
                <Link to={'/workouts'} className={getLinkClassName('/workouts')}>
                    Treningi
                </Link>
                <Link to={'/statistics'} className={getLinkClassName('/statistics')}>
                    Statystyki
                </Link>
                <Link to={'/diet'} className={getLinkClassName('/diet')}>
                    Dieta
                </Link>
            </div>
            <div className="header-links--mid">
                <Link to={'/'} className="link link-header link-header--logo">
                    DailyDrive
                </Link>
            </div>
            <div className="header-links--right">
                { 
                    token 
                    ? 
                    <>
                        <div className={getLinkClassName('/account')} onClick={() => navigate('/account')}>Moje Konto</div>
                        <div className="link link-header link-header--logout" onClick={() => logout()}>Wyloguj</div> 
                    </>
                    : 
                    <div className={getLinkClassName('/login')} onClick={() => navigate('/login')}>Zaloguj się</div>
                }
            </div>
        </div>
    )
}