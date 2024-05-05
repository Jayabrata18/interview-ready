import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.create({
    // where: { email: "user@example.com" },
    // update: {},
    data: {
      email: "user@example.com",
      name: "abc",
      password: "password",
    },
  });
  console.log(user);

  const interviews = await Promise.all([
    prisma.interview.create({
      data: {
        userId: user.id,
        InterviewName: "Interview 1",
        InterviewSatuts: "Pending",
        InterviewFeedBack: "Feedback for Interview 1",
        InterviewRating: 4,
      },
    }),
    prisma.interview.create({
      data: {
        userId: user.id,
        InterviewName: "Interview 2",
        InterviewSatuts: "Approved",
        InterviewFeedBack: "Feedback for Interview 2",
        InterviewRating: 5,
      },
    }),
    prisma.interview.create({
      data: {
        userId: user.id,
        InterviewName: "Interview 3",
        InterviewSatuts: "Pending",
        InterviewFeedBack: "Feedback for Interview 3",
        InterviewRating: 3,
      },
    }),
    prisma.interview.create({
      data: {
        userId: user.id,
        InterviewName: "Interview 4",
        InterviewSatuts: "Approved",
        InterviewFeedBack: "Feedback for Interview 4",
        InterviewRating: 5,
      },
    }),
  ]);

  console.log("Interviews created:", interviews);
}
run()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
