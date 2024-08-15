import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const user = await prisma.user.upsert({
    where: { username: 'username' },
    update: {},
    create: {
      username: 'username',
      password: 'password',
      name: 'name',
      posts: {
        create: {
          title: 'title',
          content: 'content',
        },
      },
    },
  })
  const user1 = await prisma.user.upsert({
    where: { username: 'user1' },
    update: {},
    create: {
      username: 'user1',
      password: "password",
      name: 'user1',
      posts: {
        create: [
          {
            title: 'user1 title',
            content: 'title content1',
          },
          {
            title: 'user1 title2',
            content: 'title content2',
          },
        ],
      },
    },
  })
  console.log({ user, user1 })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })