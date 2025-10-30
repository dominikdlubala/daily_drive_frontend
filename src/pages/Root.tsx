import { Outlet } from 'react-router-dom'; 
import Header from '../components/primitives/Header'; 
import { AuthProvider } from '../hooks/useAuth'; 
import PromptProvider from '../hooks/usePrompt';

export default function Root() {
    return (
        <div>
            <AuthProvider>
                <PromptProvider>
                    <Header/>
                    <Outlet />
                </PromptProvider>
            </AuthProvider>
        </div>
    )
}