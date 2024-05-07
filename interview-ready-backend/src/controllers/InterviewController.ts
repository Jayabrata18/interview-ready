import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { date, z } from "zod";

export const interviewRouter = express.Router();
const prisma = new PrismaClient();

//create a new intervie
const interviewInput = z.object({
  InterviewName: z.string().min(2).max(50),
  InterviewSatuts: z.string().default("pending"),
  InterviewFeedBack: z.string().min(2).max(500),
  InterviewRating: z.number().min(0).max(5),
  userId: z.number(),
});

interviewRouter.post("/create", async (req: Request, res: Response) => {
  try {
    const {
      InterviewFeedBack,
      InterviewSatuts,
      InterviewRating,
      InterviewName,
      userId,
    } = interviewInput.parse(req.body);
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
});

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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        InterviewFeedBack,
        InterviewSatuts,
        InterviewRating,
        InterviewName,
        userId,
      } = updateInterviewInput.parse(req.body);
      const interviewId = parseInt(req.params.id);
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


interviewRouter.get("/all", async (req: Request, res: Response) => {
  try {
    const interviews = await prisma.interview.findMany();
    res.json(interviews);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching interviews");
  }
});

//get all interviews for a user
interviewRouter.get("/all/:id", async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.id);
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
});