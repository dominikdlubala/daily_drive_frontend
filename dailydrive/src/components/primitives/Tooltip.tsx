import React, { useState, useRef, useEffect, ReactNode } from "react";

interface TooltipProps {
  content: string; 
  children: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false); 
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null); 

  const handleMouseEnter = () => setIsVisible(true);
  
  const handleMouseLeave = () => setIsVisible(false);

  useEffect(() => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      tooltipRef.current.style.top = `${triggerRect.top - tooltipRect.height - 8}px`;
      tooltipRef.current.style.left = `${triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2}px`;
    }
  }, [isVisible]);

  return (
    <div className="tooltip-container" style={{ position: "relative", display: "flex" }}>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className="tooltip"
          style={{
            // position: "absolute",
            backgroundColor: "#333",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            zIndex: 10,
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

