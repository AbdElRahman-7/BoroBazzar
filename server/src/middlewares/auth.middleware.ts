import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: "user" | "admin";
  };
}

// ✅ Typed decoded payload — never cast an unverified object directly
interface JwtPayload {
  userId: string;
  role: "user" | "admin";
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // ✅ Support both "Bearer <token>" and raw token
  const authHeader = req.headers.authorization;
  const token =
    authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  if (!token) {
    res.status(401).json({
      success: false,
      message: "No token provided, authorization denied",
    });
    return; // ✅ return void instead of returning the response object
  }

  // ✅ Crash early and loud if JWT_SECRET is missing — don't silently accept tokens
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("FATAL: JWT_SECRET environment variable is not set");
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    // ✅ Validate the shape of the payload — a valid signature doesn't mean valid fields
    if (
      !decoded.userId ||
      typeof decoded.userId !== "string" ||
      !["user", "admin"].includes(decoded.role)
    ) {
      res.status(401).json({
        success: false,
        message: "Token payload is invalid",
      });
      return;
    }

    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    // ✅ Distinguish expired tokens from tampered/invalid ones
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        success: false,
        message: "Token has expired, please log in again",
      });
      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        success: false,
        message: "Token is not valid",
      });
      return;
    }

    // ✅ Unexpected errors shouldn't leak internals
    console.error("Auth middleware unexpected error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ✅ Role-based guard — use after authMiddleware
export const requireRole =
  (...roles: Array<"user" | "admin">) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions",
      });
      return;
    }
    next();
  };