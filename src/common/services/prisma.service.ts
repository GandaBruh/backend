import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
prisma = new PrismaClient();
const PrismaService = prisma;
export { PrismaService };