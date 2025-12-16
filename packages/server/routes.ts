import express from "express";
import type { Response, Request } from "express";
import { ChatController } from "./Controller/chat.controller";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
   res.send("Hello World! ");
});

// router.get("/api/hello", (req: Request, res: Response) => {
//    res.send({ message: "Hello World!" });
// });

// router.post("/api/chat", ChatController.sendMessage);

const adapter = new PrismaMariaDb({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
   connectionLimit: 5,
});

router.get("/api/products/:id/reviews", async (req: Request, res: Response) => {
   const prisma = new PrismaClient({ adapter });
   const productId = Number(req.params.id);

   const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
   });

   res.json(reviews);
});

export default router;
