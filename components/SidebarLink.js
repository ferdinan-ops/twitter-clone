import React from "react";

function SidebarLink({ Icon, text, active }) {
  return (
    <div
      className={`hoverAnimation flex items-center justify-center space-x-3 text-xl text-secondary xl:justify-start ${
        active && "font-bold"
      }`}
    >
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </div>
  );
}

export default SidebarLink;
