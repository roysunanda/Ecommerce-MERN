import { cloudinary } from "../lib/cloudinary.mjs";
import { generateToken } from "../lib/utils.mjs";
import { User } from "../model/user.model.mjs";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    // if (!fullName || !email || !password) {
    //   return res
    //     .status(400)
    //     .json({ success: false, msg: `all fields are required.` });
    // }

    // if (password.length < 6) {
    //   return res.status(400).json({
    //     success: false,
    //     msg: `password must be atleast 6 characters.`,
    //   });
    // }
    // const user = await User.findOne({ email });
    // if (user) {
    //   console.log(user);
    //   return res
    //     .status(400)
    //     .json({ success: false, msg: `email already exist.` });
    // }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        msg: `invalid user data`,
      });
    }

    // generate jwt token
    generateToken(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      success: true,
      msg: {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    console.log(`error in signup: ${error}`);
    res.status(500).json({ msg: `internal server error` });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return req.status(400).json({ msg: `invalid credentials.` });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: `invalid credentials.` });
    }

    generateToken(user._id, res);
    res.status(200).json({ success: true, msg: user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: `internal server error.` });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "dev",
    });
    res.status(200).json({ msg: `logged out successfully.` });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: `internal server error.` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ msg: `profile pic is required!` });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: `internal server error.` });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: `internal server error.` });
  }
};
