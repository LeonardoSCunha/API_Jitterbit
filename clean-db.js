import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.order.deleteMany({})
  await prisma.item.deleteMany({})
  console.log('Database cleaned!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
