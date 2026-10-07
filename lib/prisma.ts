import { PrismaClient } from '@prisma/client'

const getDatabaseUrl = () => {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.SUPABASE_DATABASE_URL ||
    process.env.DATABASE_PUBLIC_URL ||
    process.env.DIRECT_URL ||
    ''
  );
};

const prismaClientSingleton = () => {
  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
    return new PrismaClient({
      datasources: {
        db: {
          url: dbUrl,
        },
      },
    });
  }
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

