import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key"
);

const DEV_USER = {
  userId: "1",
  email: "admin@example.com",
  isSuperAdmin: true,
  isAdmin: true
};

export async function verifyToken(token: string) {
  try {
    // Pour le développement, accepter le token de développement
    if (process.env.NODE_ENV !== "production" && token === "development_token") {
      return DEV_USER;
    }
    
    const verified = await jwtVerify(token, JWT_SECRET);
    return verified.payload;
  } catch (error) {
    console.error("Token verification error:", error);
    // En développement, retourner l'utilisateur par défaut même si le token est invalide
    if (process.env.NODE_ENV !== "production") {
      return DEV_USER;
    }
    return null;
  }
}