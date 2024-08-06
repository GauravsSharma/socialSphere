const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
    try {
        // Get the Authorization header
        const authHeader = req.headers.authorization || req.cookies.token;
        console.log(authHeader);
        
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Please Login First"
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
