import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: number;
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    //get the jwt token from the request header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "לא מורשה" });
      return;
    }

    //extract the token
    const token = authHeader.split(" ")[1];

    //verify the token with the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };

    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ message: "טוקן לא תקין" });
  }
};
