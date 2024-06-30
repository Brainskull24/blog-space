import * as React from "react";
import home from "../../assets/home.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import axiosConfig from "../../utils/axiosConfig";
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const maxTitleLength = 50;
  const maxExcerptLength = 150;
  const navigate = useNavigate();

  const truncateString = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("https://blog-space-r1kd.onrender.com/api/v1/blog/allblogs");
      const formattedBlogs = res.data.map((blog) => ({
        ...blog,
        formattedDate: new Date(blog.creationDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      }));
      setBlogs(formattedBlogs);
      setFilteredBlogs(formattedBlogs); 
      const categoriesSet = new Set(
        formattedBlogs.map((blog) => blog.category)
      );
      setCategories(Array.from(categoriesSet));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterBlogs(category);
  };

  const filterBlogs = (category) => {
    let filtered = blogs.filter(
      (blog) => category === "" || blog.category === category
    );
    setFilteredBlogs(filtered);
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center bg-white">
        <div className="flex sm:w-[70%] items-center justify-center px-10 py-5">
          <img src={home} alt="Home" />
        </div>
        <div className="flex flex-col w-[70%] sm:px-10 sm:py-5">
          <div className="flex gap-3">
            <button
              className={`px-3 py-2 border rounded-lg ${
                selectedCategory === ""
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handleCategoryFilter("")}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-2 border rounded-lg ${
                  category === selectedCategory
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => handleCategoryFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <h1 className="font-bold text-xl mt-5">Featured Blogs</h1>
          <div className="grid gap-5 w-full py-5 grid-cols-3">
            {filteredBlogs.map((val, index) => (
              <Card key={index} sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => navigate(`/blogs/${val.slug}`)}>
                  <CardMedia
                    component="img"
                    height="140"
                    style={{ objectFit: "cover" }}
                    image={`https://blog-space-r1kd.onrender.com/api/v1/blog/blogphoto/${val._id}`}
                    alt={val.title}
                  />
                  <CardContent className="flex gap-2 flex-col">
                    <div className="flex justify-between items-center">
                      <span className="w-fit flex border-[1px] px-2 m-0 py-1 text-[#4B6BFB] bg-blue-50 rounded-lg">
                        {val.category}
                      </span>
                      <span className="flex justify-end">
                        {val.formattedDate}
                      </span>
                    </div>
                    <Typography
                      gutterBottom
                      component="div"
                      variant="h7"
                      className="font-bold"
                    >
                      {truncateString(val.title, maxTitleLength)}
                    </Typography>
                    <Typography gutterBottom component="div" variant="p">
                      {truncateString(val.excerpt, maxExcerptLength)}
                    </Typography>
                    <div className="flex gap-4 items-center"></div>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
