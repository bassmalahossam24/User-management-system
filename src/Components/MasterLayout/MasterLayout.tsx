import React, { useState } from 'react'
import SideBar from '../SideBar/SideBar'

import { Outlet } from 'react-router-dom'

export default function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);
  

  const sidebarWidth = collapsed ? "80px" : "250px";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
     
      <div
        style={{
          width: sidebarWidth,
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          transition: "width 0.3s ease"
        }}
      >
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

    
      <div
        style={{
          flex: 1,
          marginLeft: sidebarWidth,
          transition: "margin-left 0.3s ease"
        }}
      >
        
        <Outlet />
      </div>
    </div>
  )
}
