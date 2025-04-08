import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

interface PromptProps {
    children: React.ReactNode;
    type: 'success' | 'error';
    onClose: () => void;
    index: number;
}

export default function Prompt({ children, type, onClose, index }: PromptProps) {
    const promptRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const promptElement = promptRef.current;
        if (promptElement) {
            const handleAnimationEnd = () => {
                onClose();
            };
            promptElement.addEventListener('animationend', handleAnimationEnd);

            return () => {
                promptElement.removeEventListener('animationend', handleAnimationEnd);
            };
        }
    }, [onClose]);

    const processedClassNames = classNames(
        'prompt',
        { 'prompt-success': type === 'success' },
        { 'prompt-error': type === 'error' }
    );

    return (
        <div ref={promptRef} className={processedClassNames}
            style={{
                top: `calc(10vh + ${index*70}px)`
            }}
        >
            {children}
            <button 
                className="btn-close--prompt"
                onClick={onClose}
            >x</button>
        </div>
    );
}