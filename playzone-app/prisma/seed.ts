import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.unitPS.createMany({
    data: [
      { nama_unit: 'PS5 - Layar 1', harga_jam: 15000, status: 'TERSEDIA' },
      { nama_unit: 'PS5 - Layar 2', harga_jam: 15000, status: 'TERSEDIA' },
      { nama_unit: 'PS4 - Layar 3', harga_jam: 10000, status: 'DISEWA' },
      { nama_unit: 'PS4 - Layar 4', harga_jam: 10000, status: 'MAINTENANCE' },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });