import React from "react";

interface AnimatedBlobsProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedBlobs({ children, className = "", style }: AnimatedBlobsProps) {
  return (
    <div className={`bpd-animated-bg ${className}`} style={style}>
      {children}
    </div>
  );
}
