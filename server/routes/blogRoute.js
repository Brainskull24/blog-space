const express = require("express");
const router = express.Router();
const {
  addBlog,
  getAllBlogs,
  getBlogsByUserId,
  getSingleBlog,
  deleteBlog,
  updateBlog,
  blogPhoto,
  categoryBlogs
} = require("../controllers/blogController.js");
const { requireSignIn } = require("../controllers/Middleware.js");
const formidable = require("express-formidable")
router.post("/addblog", express.json(), formidable(),requireSignIn, addBlog);
router.get("/allblogs", getAllBlogs);
router.get("/recentblogs", requireSignIn, getBlogsByUserId);
router.get("/getblog/:slug", getSingleBlog);
router.delete("/deleteblog/:id", deleteBlog);
router.put("/updateblog/:id", express.json(), requireSignIn, updateBlog);
router.get("/blogphoto/:pid", blogPhoto);
router.get("/category/:category", categoryBlogs);
// router.post("/createfeed", createFeed);
// router.get("/getfeeds", getFeeds);
// router.get("/projects-by-domain", projectsByDomain);
// router.get("/latest-projects", latestListing);
module.exports = router;
