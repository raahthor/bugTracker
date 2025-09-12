import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

export type TransactionClient = Prisma.TransactionClient;
const prisma = new PrismaClient();

export default prisma;
