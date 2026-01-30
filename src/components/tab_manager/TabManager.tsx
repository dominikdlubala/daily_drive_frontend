import { ReactElement, ReactNode, useState } from "react"
import { TabProps } from "./Tab";


interface TabManagerProps {
  children: ReactElement<TabProps>[]; 
  defaultTabId?: string; 
}

export default function TabManager({ children, defaultTabId }: TabManagerProps) {
  const tabs = children.map(child => ({
    id: child.props.id, 
    title: child.props.title, 
    content: child.props.children
  }))

  const [activeTab, setActiveTab] = useState<string | undefined>(defaultTabId || tabs[0].id); 

  const activeContent = tabs.find(tab => tab.id === activeTab)?.content; 

  return (
    <div className="tab-manager">
      <div className="tab-manager__tabs">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`tab-manager__tab ${tab.id === activeTab ? 'tab-manager__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}  
          >{tab.title}</button>
        ))}
      </div>
      <div className="tab-manager__content">{activeContent}</div>
    </div>
  )
}