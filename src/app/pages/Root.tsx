import { Outlet } from 'react-router-dom'; 
import Nav from '../../components/primitives/Navbar'; 
import { AuthProvider } from '../../hooks/useAuth'; 
import PromptProvider from '../../hooks/usePrompt';
import ModalManager from '../../components/modal/ModalManager';
import Provider from '../provider';

export default function Root() {
    return (
        <Provider>
            <Nav/>
            <ModalManager />
            <Outlet />
        </Provider>
    )
}