import { ReactNode, useContext, useState } from "react";
import { createContext } from 'react';
import Prompt from "../components/primitives/Prompt";

interface PromptInstance {
    message: string; 
    type: 'success' | 'error'; 
    id: string; 
}

interface PromptContextType {
    success: (message: string) => void;
    fault: (message: string) => void;
    removePrompt: (id: string) => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined); 

export const usePrompt = () => {
    const context = useContext(PromptContext); 
    if(!context) {
        throw new Error('usePrompt must be used within a PromptProvider');
    }
    return context; 
}

export default function PromptProvider({ children }: { children: ReactNode }) {
    const [prompts, setPrompts] = useState<PromptInstance[]>([])

    const success = (message: string) => {
        const id = Math.random().toString(36).substring(2, 15);
        setPrompts([...prompts, { message, type: 'success', id }]);
    }
    const fault = (message: string) => {
        const id = Math.random().toString(36).substring(2, 15);
        setPrompts([...prompts, { message, type: 'error', id }]);
    }

    const removePrompt = (id: string) => {
        setPrompts(prompts.filter(prompt => prompt.id !== id));
    }

    return (
        <PromptContext.Provider value={{ success, fault, removePrompt }}>
            <div>
                <div className="prompt-container">
                    {prompts.map(prompt => (
                        <Prompt
                            key={prompt.id}
                            type={prompt.type}
                            onClose={() => removePrompt(prompt.id)}
                        >
                            {prompt.message}
                        </Prompt>
                    ))}
                </div>
                {children}
            </div>
        </PromptContext.Provider>
    )

}