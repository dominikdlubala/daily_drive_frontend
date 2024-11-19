import { useRef, useEffect } from 'react'; 

interface DietDrawerProps {
    isOpen: boolean; 
    onClose: () => void; 
}

export default function DietDrawer({ isOpen, onClose }: DietDrawerProps) {

    const drawerRef = useRef<HTMLDivElement | null>(null); 

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
                onClose(); 
            }
        }

        if(isOpen) document.addEventListener('mousedown', handleClickOutside); 

        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [isOpen, onClose]); 

    const handleDietDrawerClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault(); 
        const target = e.target as HTMLElement; 
        console.log(target.dataset); 
    }

    return (
        <div ref={drawerRef} className="drawer drawer-diet">
            <ul onClick={handleDietDrawerClick} className="drawer--list diet-drawer--list">
                <li 
                data-value="diet1"
                className="drawer--list-item diet-drawer--list-item">
                    Śniadanie
                </li>
                <li 
                data-value="diet2"
                className="drawer--list-item diet-drawer--list-item">
                    Obiad
                </li>
                <li 
                data-value="diet3"
                className="drawer--list-item diet-drawer--list-item">
                    Kolacja
                </li>
            </ul>
        </div>
    )
}