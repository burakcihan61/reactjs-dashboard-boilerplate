import React from 'react';

interface IMenuItem {
  icon: JSX.Element;
  label: string;
}
export default function MenuItem({ icon, label }: IMenuItem) {
  return (
    <div className="flex items-center gap-x-1">
      <>
        {icon}
        {label}
      </>
    </div>
  );
}
