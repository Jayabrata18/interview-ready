import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { sign } from "jsonwebtoken";

export const userRouter = express.Router();
const prisma = new PrismaClient();
require("dotenv").config();

//signup
const signupInput = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
});
userRouter.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = signupInput.parse(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.json(user);
    res.send("User Created Successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error signing up user");
  }
});

//signin

const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
userRouter.post("/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = signinInput.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(400).send("Invalid password");
    }
    //generate jwt token
    const token = sign({ userId: user.id }, process.env.JWT_SECRET_KEY!);
    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error signing in user");
  }
});
