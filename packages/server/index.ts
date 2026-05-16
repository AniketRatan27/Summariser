import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import { prismaConnection } from "./lib/prismaConnection";

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});

// Gracefully close Prisma connection
process.on("SIGINT", async () => {
   console.log("Disconnecting Prisma...");
   await prismaConnection.$disconnect();
   process.exit(0);
});

process.on("SIGTERM", async () => {
   console.log("Disconnecting Prisma...");
   await prismaConnection.$disconnect();
   process.exit(0);
});
