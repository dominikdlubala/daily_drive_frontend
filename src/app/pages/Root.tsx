import { Outlet } from 'react-router-dom'; 
import Header from '../../components/primitives/Header'; 
import { AuthProvider } from '../../hooks/useAuth'; 
import PromptProvider from '../../hooks/usePrompt';
import ModalManager from '../../components/modal/ModalManager';
import Provider from '../provider';

export default function Root() {
    return (
        <Provider>
            <Header/>
            <ModalManager />
            <Outlet />
        </Provider>
    )
}