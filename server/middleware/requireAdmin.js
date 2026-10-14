const jwt = require("jsonwebtoken");

const requireAdmin = (req, res, next) => {
    
    const authorization = req.get("authorization") || "";
    const [scheme, token] = authorization.split(" ");
    const urlToAuthorize = req.originalUrl 
    const claims = jwt.decode(token);

    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({ success: false, message: "Sign-in is required." });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ success: false, message: "Authentication is not configured." });
    }

      //    When Author is
      if(claims.role === 'admin') {

      }
    

    try {
        const claims = jwt.verify(token, process.env.JWT_SECRET);
        // if (claims.role !== "admin" || !claims.sub) {
        //     return res.status(403).json({ success: false, message: "Administrator access is required." });
        // }

        req.admin = { id: claims.sub, role: claims.role };
        return next();
    } catch {
        return res.status(401).json({ success: false, message: "Your sign-in has expired. Please sign in again." });
    }
};

module.exports = requireAdmin;
