import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, profileImageUrl } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //Check if user already exist
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl,
    });
    return res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
      },
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing field required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not Exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      profileImageUrl: user.profileImageUrl,
    };

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true, // JS thi access nai thai
        secure: false, // production ma true (HTTPS)
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        success: true,
        userData,
        message: "User Login Successfully",
      });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// export const uploadImage = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file uploaded",
//       });
//     }
//     const user = await User.findById(req.user.id).select("-password");

//     if(!user) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found"
//       })
//     }

//     const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
//       req.file.filename
//     }`;

//     user.profileImageUrl = imageUrl;
//     await user.save();

//     // console.log(user)
//     res.status(200).json({ imageUrl });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    return res.status(200).json({
      success: true,
      imageUrl,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });

  } catch (error) {
    console.error("Server Error", error)
  }
}
