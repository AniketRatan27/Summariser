import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client";

console.log(process.env.DATABASE_HOST);
const adapter = new PrismaMariaDb({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
   port: Number(process.env.DATABASE_PORT),
   connectionLimit: 5,
});
// checking the variable in env are loading or not
console.log(process.env.DATABASE_HOST);
export const prismaConnection = new PrismaClient({ adapter });
