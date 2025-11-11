import { Outlet } from 'react-router-dom'; 
import Header from '../components/primitives/Header'; 
import { AuthProvider } from '../hooks/useAuth'; 
import PromptProvider from '../hooks/usePrompt';
import ModalManager from '../components/modal/ModalManager';

export default function Root() {
    return (
        <div>
            <AuthProvider>
                <PromptProvider>
                    <Header/>
                      <ModalManager />
                    <Outlet />
                </PromptProvider>
            </AuthProvider>
        </div>
    )
}