import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
const CategoryPage = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = axiosConfig.get(`/api/v1/blog/category/${category}`);
      // const response = await axios.get(`http://localhost:9999/api/v1/blog/category/${category}`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col justify-start items-center bg-white">
      <div className="flex flex-col w-full sm:w-[70%] px-10 py-5">
        <h1 className="font-bold text-xl">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <div className="grid gap-5 w-full py-5 grid-cols-1 sm:grid-cols-3">
            {blogs.map((val) => {
              return (
                <Card sx={{ maxWidth: 345 }} key={val._id}>
                  <CardActionArea
                    onClick={() => navigate(`/blogs/${val.slug}`)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
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
                        {val.title}
                      </Typography>
                      <Typography gutterBottom component="div" variant="p">
                        {val.excerpt}
                      </Typography>
                      <div className="flex gap-4 items-center"></div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
