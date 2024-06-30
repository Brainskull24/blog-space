const Blog = require("../models/Blog.js");
const slugify = require("slugify");
const User = require("../models/userModel.js");
const fs = require("fs");

const addBlog = async (req, res) => {
  try {
    const { title, content, category, author, excerpt } = req.fields;
    const { coverImage } = req.files;
    if (!title || !content || !category || !author || !excerpt) {
      return res
        .status(400)
        .json({ message: "Title, content, and category are required." });
    }
    if (coverImage && coverImage.size > 1000000) {
      return res
        .status(500)
        .send({ error: "photo is Required and should be less then 1mb" });
    }
    const record = new Blog({
      title,
      content,
      category,
      author,
      excerpt,
      creatorId: req.user._id,
      creationDate: Date.now(),
      slug: slugify(title),
    });

    if (coverImage) {
      record.coverImage.data = fs.readFileSync(coverImage.path);
      record.coverImage.contentType = coverImage.type;
    }

    await record.save();
    res.status(201).json({ message: "Blog added successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Error creating the blog" });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).exec();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Error retrieving project listings" });
  }
};

const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    const user = await User.findById(blog.creatorId);
    const creatorName = user ? user.name : "Unknown";
    res.status(200).send({
      success: true,
      blog,
      creatorName: creatorName,
    });
  } catch (error) {
    console.error("Error fetching project details:", error);
    res.status(500).send({
      success: false,
      message: "Error while getting project details",
      error: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { title, author, category, content } = req.body;
    if (!title || !content || !category || !author) {
      return res
        .status(400)
        .json({
          message: "Title, content, category, and author are required.",
        });
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, author, category, content, slug: slugify(title) },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found." });
    }

    res.status(200).send({
      success: true,
      message: "Blog Updated Successfully",
      blog,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updating Blog",
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Blog Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting blog",
      error,
    });
  }
};

const getBlogsByUserId = async (req, res) => {
  try {
    const blogs = await Blog.find({ creatorId: req.user._id });
    res.status(200).send({
      success: true,
      blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const blogPhoto = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.pid).select("coverImage");
    if (blog.coverImage.data) {
      res.set("Content-type", blog.coverImage.contentType);
      return res.status(200).send(blog.coverImage.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting photo",
    });
  }
};

const categoryBlogs = async (req, res) => {
  try {
    const category = req.params.category;
    const blogs = await Blog.find({ category });

    if (blogs.length === 0) {
      return res.status(404).json({ message: 'No blogs found for this category' });
    }
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs by category:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  addBlog,
  getAllBlogs,
  getBlogsByUserId,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  blogPhoto,
  categoryBlogs,
};
