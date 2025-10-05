import jwt from "jsonwebtoken";

// Middleware pour vérifier le token JWT
function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        return res.status(401).send({ message: "Unauthorized" });
    }
}