import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, useMediaQuery, Drawer } from "@mui/material";
import MenuItem from "./MenuItem"; // Certifique-se de que isso está correto
import SearchBar from "./SearchBar";
import logo from "../../assets/img/logok.png";
import MenuIcon from "@mui/icons-material/Menu";
import CartIcon from "../Cart/CartIcon";
import CartPage from "../Cart/CartPage";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

// Interfaces
interface Item {
  id: string;
  title: string;
}

interface Category {
  id: string;
  title: string;
  items?: Item[]; // Subcategorias (opcional)
}

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoriesCollection);
      const categoryList = categorySnapshot.docs.map((doc) => {
        const data = doc.data() as Category;
        return { id: doc.id, title: data.title, items: data.items || [] };
      });
      
      console.log("Categorias carregadas:", categoryList);
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const toggleCartDrawer = (open: boolean) => () => {
    setCartDrawerOpen(open);
  };

  const handleSubCategoryClick = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#d87dab" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box
              component="img"
              src={logo}
              alt="Logotipo da Loja"
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                objectFit: "contain",
                marginRight: 1,
              }}
            />
            <Typography
              variant="h4"
              component="div"
              sx={{
                marginRight: "20px",
                fontFamily: "Roboto",
                color: "#FFD700",
                fontSize: isMobile ? "1.5rem" : "2.5rem",
              }}
            >
              KeraProf
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 2, display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: isMobile ? "90%" : "100%" }}>
              <SearchBar
                onSearchResults={(results) => console.log(results)}
                isMobile={isMobile}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleCartDrawer(true)}>
              <CartIcon />
            </IconButton>
          </Box>

          {isMobile && (
            <>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{ "& .MuiDrawer-paper": { width: "50%" } }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
                  <SearchBar
                    onSearchResults={(results) => console.log(results)}
                    isMobile={isMobile}
                  />
                  {categories.map((category) => (
                    <MenuItem
                      key={category.id}
                      title={category.title}
                      subItems={category.items ? category.items.map((item) => ({
                        id: item.id,
                        title: item.title,
                        link: item.id, // Usar ID do produto
                      })) : []}
                      onSubItemClick={handleSubCategoryClick} // Passar a função de clique
                    />
                  ))}
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={cartDrawerOpen}
        onClose={toggleCartDrawer(false)}
        sx={{ "& .MuiDrawer-paper": { width: "300px" } }}
      >
        <CartPage />
      </Drawer>

      <Box
        sx={{
          display: "flex",
          color: "white",
          backgroundColor: "#B5A642",
          padding: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton color="inherit" size="large">
              <HomeIcon />
            </IconButton>
          </Link>
        </Box>

        <Box
          sx={{
            display: "flex",
            color: "white",
            justifyContent: "center",
            backgroundColor: "#B5A642",
            padding: 1,
          }}
        >
          {!isMobile &&
            categories.map((category) => (
              <MenuItem
                key={category.id}
                title={category.title}
                subItems={category.items ? category.items.map((item) => ({
                  id: item.id,
                  title: item.title,
                  link: item.id, // Usar ID do produto
                })) : []}
                onSubItemClick={handleSubCategoryClick} // Passar a função de clique
              />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
