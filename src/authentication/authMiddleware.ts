import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"

interface AuthRequest extends Request {
  userId?: string | (() => string) 
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token: string | null = extractToken(req.headers.authorization);

  if (!token) return res.status(401).json({ error: "Token invalido"})

  try {
    const secret = process.env.JWT_SECRET

    if (!secret) throw new Error();

    const decoded = jwt.verify(token, secret).sub

    if (!decoded) throw new Error();

    req.userId = decoded;

    next()
  } catch (error) {
    return res.status(401).json({ error: "Token invalido ou expirado" })
  }
}

function extractToken(authHeader: string | undefined): string | null {
  if (!authHeader) return null;
  if (!authHeader.startsWith("Bearer ")) return null;

  return authHeader.substring(7);
}
