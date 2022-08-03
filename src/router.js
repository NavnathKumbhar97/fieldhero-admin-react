import React from 'react'



    const Dashboard = React.lazy(() => import("./Pages/Drawer/SidebarDesign"))

    const routes = [
        { path: "/dashboard", exact: true, name: "Home" },
        { path: "/dashboard", name: "Dashboard", component: Dashboard },

    ]

  return (
    <div>router</div>
  )


export default routes