import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Avatar from "@mui/material/Avatar";
import axiosConfig from "../../utils/axiosConfig";

const Blogs = () => {
  const [blog, setBlog] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params?.slug) {
      fetchBlogDetails();
    }
  }, [params?.slug]);

  const fetchBlogDetails = async () => {
    try {
      const { data } = axiosConfig.get(
        `/api/v1/blog/getblog/${params.slug}`
      );

      const formattedDate = new Date(
        data?.blog.creationDate
      ).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      setBlog({
        ...data?.blog,
        formattedDate: formattedDate,
      });
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center bg-white">
      <div className="flex w-[70%] flex-col gap-5 justify-center px-20 py-10">
        <div className="flex items-start px-3">
          <h1 className="flex text-md rounded-lg bg-[#4B6BFB] text-white py-2 px-3">
            {blog.category}
          </h1>
        </div>
        <h1 className="text-5xl font-bold px-3">{blog.title}</h1>
        <div className="flex flex-col gap-5">
          <div className="flex px-3 items-center gap-3">
            <Avatar alt={blog.author} src="/static/images/avatar/2.jpg" />
            <span>{blog.author}</span>
            <span className="flex ml-5">{blog.formattedDate}</span>
          </div>
          <ReactQuill
            readOnly
            value={blog.content}
            className=""
            theme="bubble"
          />
        </div>
      </div>
    </div>
  );
};

export default Blogs;
