import type { ReactElement } from 'react'; 
import { Navigate } from 'react-router-dom'; 
import { useAuth } from '../../../hooks/useAuth'; 
import { getToken } from 'src/utils/token/tokenStorage';

export default function ProtectedRoute({ children }: { children: ReactElement<any, any> }) {
    const token = getToken();  
    if(!token) {
        return <Navigate to={'/login'}/>
    }
    return children; 
}