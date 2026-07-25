import jwt from "jsonwebtoken"

const protect = async(req , res,next) => {
    try {
        const token = req.cookies.token;
        // console.log(token)

        if(!token) {
            return res.status(404).json({
                success: false,
                message: "Not  authorized , token Missing"
            })
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decode);
        req.user = decode;
        next();

    } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Token Server Error",
    });
  }
}

export default protect;