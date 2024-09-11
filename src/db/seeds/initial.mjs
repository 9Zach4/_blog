import { faker } from "@faker-js/faker"

export const seed = async (db) => {
  await db("posts").delete()
  await db("comments").delete()
  await db("users").delete()
  await db("users").insert(
    [...Array(1000)].map(() => ({
      email: faker.internet.email(),
      passwordHash: "alskdjalsdkjasdlkj",
      username: faker.internet.userName(),
      passwordSalt: "alskdjalsdkjasdlkj",

    })),
  )
  const userIds = await db("users").pluck("id")
  const postIds = await db("posts").pluck("id")
 



  await db("posts").insert(
    [...new Array(15)].map(() => ({
     title: faker.word.words({ count: { min: 2, max: 10 } }),
      content: faker.lorem.paragraph(),
      authorId: userIds[faker.number.int({ min: 0, max: userIds.length - 1 })],
      username: faker.internet.userName(),
    })),
  )
  await db("comments").insert(
    [...new Array(100)].map(() => ({
    content: faker.lorem.paragraph(),
    postId: postIds[faker.number.int({ min: 0, max: postIds.length + 1 })],
    userId: userIds[faker.number.int({ min: 0, max: userIds.length - 1 })],
    })),
  )
}
