const express = require("express");
const cors = require("cors");
const connectDB = require("./db.js");
const authRoutes = require("./routes/authRoute.js");
const blogRoutes = require("./routes/blogRoute.js");

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
require('dotenv').config();

connectDB();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", blogRoutes);

app.listen(process.env.PORT, () => {
  console.log(`BLOGSPACE STARTED AT ${process.env.PORT}`);
});
