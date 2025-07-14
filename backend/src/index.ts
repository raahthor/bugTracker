import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();
