import jwt from 'jsonwebtoken';

const checkAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json("No access token");
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json("Invalid token");
            next();
        }
    )
}

export { checkAccessToken }