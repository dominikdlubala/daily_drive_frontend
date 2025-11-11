import { ReactNode } from "react";

export interface TabProps {
  id: string; 
  title: string; 
  children: ReactNode; 
}

export default function Tab({ children }: TabProps) {
  return <>{children}</>
}