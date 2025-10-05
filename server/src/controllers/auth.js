import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PASSWORD_REGEX, EMAIL_REGEX } from "../utils/regex.js";

async function register(req, res) {
  if (!req.body){
    return res.status(400).json({ message: "No data provided" });
  }
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email adress already used" });
    }

    if (!email.match(EMAIL_REGEX)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!password.match(PASSWORD_REGEX)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }
    const hashedPassword = await bcrypt.hash(password,  10);
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: `Server error : ${error}` });
  }
}

async function login(req, res) {
  const { email, password, remember } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Générer un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn:  remember ? "7d" : "24h",
    });
    res.status(200).json({ token:token, user:user });
  } catch (error) {
    res.status(500).json({ message: `Server error : ${error}` });
  }
}

export default {
  register,
  login,
};
