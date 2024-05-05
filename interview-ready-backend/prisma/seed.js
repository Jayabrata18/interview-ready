"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            // where: { email: "user@example.com" },
            // update: {},
            data: {
                email: "user@example.com",
                name: "abc",
                password: "password",
            },
        });
        console.log(user);
        const interviews = yield Promise.all([
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
    });
}
run()
    .catch((err) => {
    console.log(err);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
