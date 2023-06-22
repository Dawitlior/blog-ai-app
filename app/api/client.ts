import { PrismaClient } from "@prisma/client";

let prismInit: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prismInit = new PrismaClient();
} else {
    if (!(global as any).prisma) {
        (global as any).prisma = new PrismaClient();
    }
    prismInit = (global as any).prisma;
}

export const prisma = prismInit;