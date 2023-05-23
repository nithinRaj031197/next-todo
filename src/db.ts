import { PrismaClient } from "@prisma/client";

// Due to hot-reloading during development mode, nextjs only serves only recently changed files,
//but in case of Prisma it create a new Client. So apply concept called 'Singleton'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV != "production") globalForPrisma.prisma = prisma;
