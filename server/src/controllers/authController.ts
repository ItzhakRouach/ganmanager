import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// REGISTER
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    //get data from the req
    const { email, password, name } = req.body;

    //check if user allready exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: "משתמש כבר קיים" });
      return;
    }

    // hash the password - never store raw password
    const hashPassword = await bcrypt.hash(password, 10);

    //create the user
    const user = await prisma.user.create({
      data: { email, password: hashPassword, name },
    });

    //create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // paylaod - what store in the token
      process.env.JWT_SECRET as string, // Secret key to sign it only kowning to us
      { expiresIn: "1d" }, // token expires in 1 day
    );

    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: "שגיאת שרת" });
  }
};

// LOGIN
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    //get email and password from request
    const { email, password } = req.body;

    //find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(400).json({ message: "אימייל או סיסמה שגויים" });
      return;
    }

    // compare the password with the hashed one in the db
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "אימייל או סיסמה שגויים" });
      return;
    }

    //create JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    res.status(500).json({ message: "שגיאת שרת" });
  }
};
