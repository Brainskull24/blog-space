import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import Navbarr from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import HomePage from "./pages/Home/Home";
import Login from "./components/AuthForm/Login";
import Signup from "./components/AuthForm/Signup";
import AddBlog from "./pages/AddBlog/AddBlog";
import MyBlogs from "./pages/MyBlogs/MyBlogs";
import Blogs from "./components/Blog/Index"
import RecentBlogs from "./components/Blog/RecentBlogs"
import Category from "./pages/Category/Category";
const App = () => {
  
  const [darkMode, setDarkMode] = React.useState(false); 

  const darkTheme = createTheme({ palette: { mode: "dark" } });
  const lightTheme = createTheme({ palette: { mode: "light" } });

  return (
    <>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <BrowserRouter>
          <Navbarr darkMode={darkMode} setDarkMode={setDarkMode} />{" "}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/recentblogs" element={<MyBlogs />} />
            <Route path="/blogs/:slug" element={<Blogs />} />
            <Route path="/recentblogs/:slug" element={<RecentBlogs />} />
            <Route path="/category/:category" element={<Category />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
