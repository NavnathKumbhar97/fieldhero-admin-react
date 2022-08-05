import React from "react";

const SidebarLogic = () => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return {
    open,
    setOpen,
    handleDrawerClose,
    handleDrawerOpen
  };
};

export default SidebarLogic;
