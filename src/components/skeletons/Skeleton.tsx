import '@styles/skeleton/skeleton.scss'

import { CSSProperties } from "react";

interface SkeletonProps {
  className?: string; 
  width?: number; 
  height?: number; 
  style?: CSSProperties; 
}
export default function Skeleton({
  className = '', 
  width, 
  height, 
  style 
}: SkeletonProps) {

  const customStyle = {
    width, 
    height, 
    ...style
  }; 

  const classes = `skeleton ${className}`; 

  return (
    <div className={classes} style={customStyle}></div>
  )
}