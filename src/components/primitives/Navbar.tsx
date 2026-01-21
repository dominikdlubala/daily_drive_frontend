import { useNavigate, Link, useLocation } from 'react-router-dom'; 
import { useAuth } from '../../hooks/useAuth'; 
import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { RxHamburgerMenu } from "react-icons/rx";
import { useToast } from 'src/hooks/useToast';


function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate(); 
    const location = useLocation();
    const { token, logout } = useAuth(); 

    const getLinkClassName = (path: string) => {
        return location.pathname === path ? 'link link-header link-header--active' : 'link link-header';
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="header mobile-header">
            <button className="btn-menu" onClick={toggleMenu}>
                { isOpen ? <MdClose /> : <RxHamburgerMenu /> }
            </button>

            <div className={`mobile-links header-links--left ${isOpen ? 'menu-open' : 'menu-closed'}`}>
                <Link to={'/workouts'} className={getLinkClassName('/workouts')}>
                    Treningi
                </Link>
                <Link to={'/statistics'} className={getLinkClassName('/statistics')}>
                    Statystyki
                </Link>
                <Link to={'/diet'} className={getLinkClassName('/diet')}>
                    Dieta
                </Link>
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
            <div className="header-links--mid">
                <Link to={'/'} className="link link-header link-header--logo">
                    DailyDrive
                </Link>
            </div>
        </div>
    )
}

function Navbar() {
    const navigate = useNavigate(); 
    const location = useLocation();
    const { token, logout } = useAuth(); 

    const { notify } = useToast(); 

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
                <button onClick={() => notify({ message: 'prompt testowy', type: 'info'})}>
                    prompt
                </button>
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

export default function Nav() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 900); 
        }
        handleResize(); 

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize); 
        }
    })

    
    return isMobile ? <MobileNav/> : <Navbar/> 
}