import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { date, z } from "zod";
import { verify } from "jsonwebtoken";

export const interviewRouter = express.Router();
const prisma = new PrismaClient();

//auth middleware
interface DecodedToken {
  userId: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] || "";
  const token = authHeader && authHeader.split(".")[1];
  // console.log(authHeader);
  // console.log(token);
  try {
    if (!token) {
      res.status(403).json({ message: "Unauthorized there" });
      return;
    }
    const decoded = verify(
      authHeader,
      process.env.JWT_SECRET_KEY!
    ) as DecodedToken;
    if (!decoded) {
      res.status(403).json({ message: "Unauthorized here" });
      return;
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//create a new interview schedule
const interviewInput = z.object({
  InterviewName: z.string().min(2).max(50),
  InterviewSatuts: z.string().default("pending"),
  InterviewFeedBack: z.string().min(2).max(500),
  InterviewRating: z.number().min(0).max(5),
  // userId: z.number(),
});

interviewRouter.post(
  "/create",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const {
        InterviewFeedBack,
        InterviewSatuts,
        InterviewRating,
        InterviewName,
      } = interviewInput.parse(req.body);
      const authHeader = req.headers["authorization"] || "";
      const decoded = verify(
        authHeader,
        process.env.JWT_SECRET_KEY!
      ) as DecodedToken;
      const userId = Number(decoded.userId);
      // console.log(userId);

      const interview = await prisma.interview.create({
        data: {
          InterviewFeedBack,
          InterviewSatuts,
          InterviewRating,
          InterviewName,
          userId,
        },
      });
      res
        .status(200)
        .json({ data: interview, message: "Interview Created Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error creating interview");
    }
  }
);

//update interview

const updateInterviewInput = z.object({
  InterviewName: z.string().min(2).max(50),
  InterviewSatuts: z.string().default("pending"),
  InterviewFeedBack: z.string().min(2).max(500),
  InterviewRating: z.number().min(0).max(5),
  userId: z.number(),
});

interviewRouter.put(
  "/update/:id",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        InterviewFeedBack,
        InterviewSatuts,
        InterviewRating,
        InterviewName,
        // userId,
      } = updateInterviewInput.parse(req.body);
      const interviewId = parseInt(req.params.id);
      const authHeader = req.headers["authorization"] || "";
      const decoded = verify(
        authHeader,
        process.env.JWT_SECRET_KEY!
      ) as DecodedToken;
      const userId = Number(decoded.userId);
      const interview = await prisma.interview.update({
        where: {
          id: interviewId,
        },
        data: {
          InterviewFeedBack,
          InterviewSatuts,
          InterviewRating,
          InterviewName,
          userId,
        },
      });
      res.status(200).json({ data: interview, message: "Interview Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error updating interview");
    }
  }
);

//delete interview

interviewRouter.delete(
  "/delete/:id",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const interviewId = parseInt(req.params.id);
      await prisma.interview.delete({
        where: {
          id: interviewId,
        },
      });
      res.status(200);
      res.send("Interview Deleted Successfully");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error deleting interview");
    }
  }
);

interviewRouter.get(
  "/all",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const interviews = await prisma.interview.findMany();
      res.json(interviews);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error fetching interviews");
    }
  }
);

//get all interviews for a user
interviewRouter.get(
  "/all/:id",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers["authorization"] || "";
      const decoded = verify(
        authHeader,
        process.env.JWT_SECRET_KEY!
      ) as DecodedToken;
      const userId = Number(decoded.userId);

      const interviews = await prisma.interview.findMany({
        where: {
          userId,
        },
      });
      res.status(200).json(interviews);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error fetching interviews");
    }
  }
);
