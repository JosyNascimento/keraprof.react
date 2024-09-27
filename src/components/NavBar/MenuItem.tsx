import React from 'react';
import { Menu, MenuItem as MuiMenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface SubItem {
  id: string;
  title: string;
  link: string;
}

interface MenuItemProps {
  title: string;
  subItems: SubItem[];
}

const MenuItem: React.FC<MenuItemProps> = ({ title, subItems }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick} sx={{ color: 'white' }}>
        {title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {subItems.map((item) => (
          <MuiMenuItem key={item.id} onClick={handleClose}>
            <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
              {item.title}
            </Link>
          </MuiMenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default MenuItem;
