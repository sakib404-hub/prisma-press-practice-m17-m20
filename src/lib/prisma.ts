import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import config from "../config/config";
import { PrismaClient } from "../../prisma/generated/prisma/client";


const connectionString = `${config.databse_url}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };