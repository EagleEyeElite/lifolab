import React from 'react';

interface SubHeadingProps {
  children: React.ReactNode;
}

export default function SubHeading({ children}: SubHeadingProps) {
  return (
    <h2 className={`text-responsive-md font-body font-bold`}>
      {children}
    </h2>
  );
}