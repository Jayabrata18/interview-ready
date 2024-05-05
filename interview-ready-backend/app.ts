import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
// require("dotenv").config();
import "dotenv/config";
import { interviewRouter } from "./src/controllers/InterviewController";
import { userRouter } from "./src/controllers/userController";
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);
app.get("/status", async (req: Request, res: Response) => {
  try {
    await prisma.$connect();
    res.json({ status: "Database connected" });
  } catch (error) {
    console.error("Error connecting to database:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

//api
app.use("/api/v1/user", userRouter);
app.use("/api/v1/interview", interviewRouter);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
