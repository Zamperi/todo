import jwt from 'jsonwebtoken';
import { ApiError } from "./ApiError.js";

const { JWT_SECRET_KEY } = process.env;

function signAccessToken(dbUser) {
  return jwt.sign(
    { sub: dbUser.id, email: dbUser.email },
    JWT_SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "15m",
      issuer: "your-app",
      audience: "your-app-clients"
    }
  );
}

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new ApiError("No token provided", 401));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET_KEY, {
        algorithms: ["HS256"],
        issuer: "your-app",
        audience: "your-app-clients"
    });

    req.user = { id: payload.sub, email: payload.email };
    return next();
  } catch {
    return next(new ApiError("Invalid or expired token", 401));
  }
};

export { signAccessToken, auth };