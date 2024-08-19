import React, { useState } from 'react';
import { Menu, MenuItem as MuiMenuItem, Button } from '@mui/material';

interface MenuItemProps {
  title: string;
  subItems: string[];
}

const MenuItem: React.FC<MenuItemProps> = ({ title, subItems }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        {title}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {subItems.map((subItem, index) => (
          <MuiMenuItem key={index} onClick={handleClose}>
            {subItem}
          </MuiMenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MenuItem; // Adicionando export para que o arquivo seja reconhecido como um módulo
