import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes";
import { prismaConnection } from "./lib/prismaConnection";

dotenv.config();

const app = express();

app.use(
   cors({
      origin: ["http://localhost:5173", "http://13.48.203.65:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
   })
);

app.use(express.json());
app.use(router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});

process.on("SIGINT", async () => {
   await prismaConnection.$disconnect();
   process.exit(0);
});

process.on("SIGTERM", async () => {
   await prismaConnection.$disconnect();
   process.exit(0);
});
