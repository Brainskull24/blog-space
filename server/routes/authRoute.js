const express = require("express");
const router = express.Router();
const {
  register,
  login,
  // resetpassword,
  // profile,
  // getprofile,
} = require("../controllers/authController.js");
// const { requireSignIn } = require("../controllers/Middleware.js");

router.post("/register", register);
router.post("/login", login);
// router.post("/reset-password", resetpassword);
// router.put("/profile", requireSignIn, profile);
// router.put("/getprofile", requireSignIn, getprofile);

module.exports = router;
