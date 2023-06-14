import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  for (let i = 0; i < 5; i++) {
    await prisma.example.createMany({
      data: { createdAt: new Date(), updatedAt: new Date() },
    });
  }
}

await seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);

    await prisma.$disconnect();

    process.exit(1);
  });
