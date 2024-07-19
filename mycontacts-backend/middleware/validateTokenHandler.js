const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        console.log("Token:", token); // Log the token for debugging
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log("JWT Error:", err);
                res.status(401);
                throw new Error("User is not authorized.");
            }
            console.log("Decoded JWT:", decoded); // Log the decoded token for debugging
            req.user = decoded.user; // Assign the user object to req.user
            console.log("Decoded user:", req.user); // Log the decoded user for debugging
            next();
        });
    } else {
        res.status(401);
        throw new Error("User is not authorized.");
    }
});

module.exports = validateToken;
