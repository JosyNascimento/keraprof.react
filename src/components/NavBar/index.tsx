import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, useMediaQuery, Drawer } from "@mui/material";
import MenuItem from "./MenuItem"; 
import SearchBar from "./SearchBar";
import logo from "../../assets/img/logok.png";
import MenuIcon from "@mui/icons-material/Menu";
import CartIcon from "../Cart/CartIcon";
import CartPage from "../Cart/CartPage";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../../services/productService'; 

interface Item {
  id: string;
  title: string;
}

interface Category {
  id: string;
  title: string;
  items?: Item[]; 
}

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width:675px)"); // Alterado para 675px
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]); 
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
    setDrawerOpen(false); // Fechar o drawer após a navegação
  };

  const handleSearchResults = (results: Product[]) => {
    setSearchResults(results);
    console.log("Resultados da busca:", results);
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

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: isMobile ? "90%" : "100%" }}>
              <SearchBar
                onSearchResults={handleSearchResults}
                isMobile={isMobile}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleCartDrawer(true)}>
              <CartIcon />
            </IconButton>
            {isMobile && (
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para o menu de hambúrguer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{ "& .MuiDrawer-paper": { width: "250px" } }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
          <SearchBar
            onSearchResults={handleSearchResults}
            isMobile={isMobile}
          />
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              title={category.title}
              subItems={category.items ? category.items.map((item) => ({
                id: item.id,
                title: item.title,
                link: item.id,
              })) : []}
              onSubItemClick={handleSubCategoryClick}
            />
          ))}
        </Box>
      </Drawer>

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
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: { xs: 1, md: 0 }, marginRight: { xs: 0, md: 2 } }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton color="inherit" size="large">
              <HomeIcon />
            </IconButton>
          </Link>
        </Box>

        <Box
          sx={{
            display: isMobile ? 'none' : 'flex', // Ocultar em telas móveis
            color: "white",
            justifyContent: "center",
            backgroundColor: "#B5A642",
            padding: 1,
            flexWrap: "wrap",
          }}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              title={category.title}
              subItems={category.items ? category.items.map((item) => ({
                id: item.id,
                title: item.title,
                link: item.id,
              })) : []}
              onSubItemClick={handleSubCategoryClick}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
