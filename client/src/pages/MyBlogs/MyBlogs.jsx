import * as React from "react";
import home from "../../assets/home.png";
import axios from "axios";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
const Home = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const navigate = useNavigate();

  const getAllRecentBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const { data } = await axios.get(
        `http://localhost:9999/api/v1/blog/recentblogs`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecentBlogs(data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllRecentBlogs();
  }, []);
  return (
    <>
      <div className="flex flex-col justify-start items-center bg-white">
        <div className="flex flex-col w-[70%] px-10 py-5">
          <h1 className="font-bold text-xl">My Blogs</h1>
          <div className="grid gap-5 w-full py-5 grid-cols-3">
            {recentBlogs.map((val, index) => {
              return (
                <Card sx={{ maxWidth: 345 }} key={val._id}>
                <CardActionArea onClick={() => navigate(`/recentblogs/${val.slug}`)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:9999/api/v1/blog/blogphoto/${val._id}`}
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
                    <Typography gutterBottom component="div" variant = "h7" className="font-bold">
                      {val.title}
                    </Typography>
                    <Typography gutterBottom component="div" variant = "p">
                      {val.excerpt}
                    </Typography>
                    <div className="flex gap-4 items-center">
                    </div>
                  </CardContent>
                </CardActionArea>
              </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
