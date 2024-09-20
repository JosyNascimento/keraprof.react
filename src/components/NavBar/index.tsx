import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  Drawer,
} from "@mui/material";
import MenuItem from "./MenuItem";
import SearchBar from "./SearchBar";
import logo from "../../assets/img/logok.png";
import MenuIcon from "@mui/icons-material/Menu";
import CartIcon from "../Cart/CartIcon";
import CartPage from "../Cart/CartPage";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { db } from "../../firebase"; // Verifique se o caminho está correto
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

// Adicione isso para tratar o arquivo como módulo
export {};

// Definição de tipos
interface Item {
  id: string;
  title: string;
}

interface Category {
  id: string;
  title: string;
  items?: Item[];
}

const NavBar: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  // Função para adicionar ou atualizar categorias no Firestore
  const addOrUpdateCategories = async () => {
    const categoriesToAdd = [
      {
        title: "Alisamento",
        items: [
          { id: "subcat1", title: "Escova Progressiva Blindagem dos fios" },
          { id: "subcat2", title: "Plastica dos fios Zen Hair 4D" },
          { id: "subcat3", title: "Escova semi definitiva Zero forever liss" },
          { id: "subcat4", title: "Escova Plastica dos fios" },
          { id: "subcat5", title: "Escova Japonesa" },
          { id: "subcat6", title: "Alisamento térmico Job hair" },
        ],
      },
      {
        title: "Cuidados Pessoais",
        items: [
          { id: "subcat7", title: "Hidratantes" },
          { id: "subcat8", title: "Protetores Solares" },
        ],
      },
      {
        title: "Tratamentos para Cabelos",
        items: [
          { id: "subcat9", title: "Reconstrutor dos fios" },
          { id: "subcat10", title: "Kit antiqueda Jaborandi Bioestratus" },
          { id: "subcat11", title: "Finalizador" },
          { id: "subcat12", title: "Tratamento Felps Quiabo XBTX" },
        ],
      },
    ];

    const categoriesCollection = collection(db, "categories");

    // Para cada categoria, verifica se já existe
    for (const category of categoriesToAdd) {
      const q = query(
        categoriesCollection,
        where("title", "==", category.title)
      );
      const categorySnapshot = await getDocs(q);

      if (categorySnapshot.empty) {
        // Se não existe, adiciona nova categoria
        await addDoc(categoriesCollection, category);
      } else {
        // Se existe, atualiza a categoria com novos itens sem duplicação
        const categoryDoc = categorySnapshot.docs[0];
        const existingItems = categoryDoc.data().items || [];

        // Cria um mapa para facilitar a verificação de duplicatas
        const existingItemsMap = new Map(existingItems.map((item: Item) => [item.id, item]));

        // Atualiza os itens, evitando duplicações
        for (const newItem of category.items) {
          existingItemsMap.set(newItem.id, newItem);
        }

        const updatedItems = Array.from(existingItemsMap.values());

        await updateDoc(doc(db, "categories", categoryDoc.id), {
          items: updatedItems,
        });
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoriesCollection);
      const categoryList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Category[];
      setCategories(categoryList);
    };

    fetchCategories();
    addOrUpdateCategories(); // Chama a função para adicionar ou atualizar as categorias, mas apenas uma vez
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const toggleCartDrawer = (open: boolean) => () => {
    setCartDrawerOpen(open);
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
                <Box
                  sx={{ display: "flex", flexDirection: "column", padding: 2 }}
                >
                  <SearchBar
                    onSearchResults={(results) => console.log(results)}
                    isMobile={isMobile}
                  />
                  {categories.map((category) => (
                    <MenuItem
                      key={category.id}
                      title={category.title}
                      subItems={category.items ? category.items.map((item: Item) => ({
                        id: item.id, // Inclua o id aqui
                        title: item.title,
                        link: `/product/${item.id}`,
                      })) : []}
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
              subItems={category.items ? category.items.map((item: Item) => ({
                id: item.id, // Adicione o id aqui
                title: item.title,
                link: `/product/${item.id}`,
              })) : []}
            />
            ))}
        </Box>
      </Box>
    </>
  );
};

export default NavBar;
