const userModel = require("../models/userModel.js");
const JWT = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, password, confirmpassword, email } = req.body;
    if (!name || !password || !email || !confirmpassword) {
      return res.status(400).send({
        success: false,
        message: "Invalid details",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists! Please login",
      });
    }
    if (password !== confirmpassword) {
      return res.status(400).send({
        success: false,
        message: "Passwords don't match",
      });
    }
    const user = new userModel({
      name,
      email,
      password,
    });
    await user.save();
    res.status(201).send({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).send({
        success: false,
        message: "Duplicate field value: Email or User ID already exists",
        error: error.message,
      });
    }
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User does not exist",
      });
    }

    if (password !== user.password) {
      return res.status(401).send({
        success: false,
        message: "Passwords don't match",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.token = token;
    return res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in login",
      error: error.message,
    });
  }
};

const resetpassword = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      res.status(400).send({ message: "Enter credentials" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid User",
      });
    }

    if (name !== user.name) {
      return res.status(401).send({
        success: false,
        message: "Name doesn't match",
      });
    }

    await userModel.findByIdAndUpdate(user._id, { password: password });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

const profile = async (req, res) => {
  const {
    name,
    email,
    contact,
    gender,
    organization,
    degree,
    branch,
    skills,
    expertise,
    city,
    state,
    country,
    address,
  } = req.body;
  try {
    const user = await userModel.findById(req.user._id);

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.contact = contact || user.contact;
    user.gender = gender || user.gender;
    user.organization = organization || user.organization;
    user.degree = degree || user.degree;
    user.branch = branch || user.branch;
    user.skills = skills || user.skills;
    user.expertise = expertise || user.expertise;
    user.city = city || user.city;
    user.state = state || user.state;
    user.country = country || user.country;
    user.address = address || user.address;

    await user.save();

    res.send({ success: true, user });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

const getprofile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user);
    res.statis(200).send({ success: true, user });
  } catch (error) {
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { register, login, resetpassword, profile, getprofile };
