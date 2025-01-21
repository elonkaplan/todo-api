import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export const connectDB = () => prisma.$connect();
export const disconnectDB = () => prisma.$disconnect();
