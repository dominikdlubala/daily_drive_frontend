import { Provider as ReduxProvider } from 'react-redux'; 
import store from '../store';
import { ReactNode } from 'react';
import { AuthProvider } from '../hooks/useAuth';
import PromptProvider from '../hooks/usePrompt';

interface ProviderProps {
  children: ReactNode; 
}

export default function Provider({ children }: ProviderProps) {

  return (
    <ReduxProvider store={store}>
        <AuthProvider>
          <PromptProvider>
            {children}
          </PromptProvider>
        </AuthProvider>
    </ReduxProvider>
  )
}