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
  onSubItemClick?: (id: string) => void; // Adicionada a propriedade
}

const MenuItem: React.FC<MenuItemProps> = ({ title, subItems, onSubItemClick }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick} sx={{ color: 'white', fontSize: '1.2rem' }}>
        {title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {subItems.map((item) => (
          <MuiMenuItem
            key={item.id}
            onClick={() => {
              handleClose();
              if (onSubItemClick) {
                onSubItemClick(item.id); // Chama a função passada
              }
            }}
            sx={{ margin: '5px 0', fontSize: '1rem' }} // Aumenta a fonte e adiciona espaçamento
          >
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
