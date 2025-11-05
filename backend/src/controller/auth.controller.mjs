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

export const login = (req, res) => {
  res.send("login route");
};

export const logout = (req, res) => {
  res.send("logout route");
};
