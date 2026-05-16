import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
   prismaConnection: PrismaClient | undefined;
};

export const prismaConnection =
   globalForPrisma.prismaConnection ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
   globalForPrisma.prismaConnection = prismaConnection;
}

/*import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
   prismaConnection: PrismaClient | undefined;
};

const adapter = new PrismaMariaDb({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
   port: Number(process.env.DATABASE_PORT),
   connectionLimit: 10,
});

export const prismaConnection =
   globalForPrisma.prismaConnection ??
   new PrismaClient({
      adapter,
   });

if (process.env.NODE_ENV !== "production") {
   globalForPrisma.prismaConnection = prismaConnection;
}*/
