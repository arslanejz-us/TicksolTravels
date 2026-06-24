import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prismaClient: PrismaClient;

if (typeof window === 'undefined') {
  if (globalForPrisma.prisma) {
    prismaClient = globalForPrisma.prisma;
  } else {
    const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ticksol';
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    prismaClient = new PrismaClient({ adapter });
    
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaClient;
    }
  }
} else {
  // Safe mock for client-side builds
  prismaClient = {} as PrismaClient;
}

export const prisma = prismaClient;
export default prisma;
