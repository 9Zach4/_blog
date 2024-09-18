import { faker } from "@faker-js/faker"
import UserModel from "../models/UserModel.mjs"

const password = process.env.PASSWORD
const [passwordHash, passwordSalt] = await UserModel.hashPassword(password)
export const seed = async (db) => {
  await db("posts").delete()
  await db("comments").delete()
  await db("users").delete()

  await db("users").insert(
    [...Array(1)].map(() => ({
      email: process.env.EMAIL,
      passwordHash,
      username: process.env.USERNAME,
      passwordSalt,
    })),
  )

  const userIds = await db("users").pluck("id")

  //   const postIds = await db("posts").pluck("id")
  
  await db("posts").insert(
    [new Array(1)].map(() => ({
      title: "Hello World",
      content: "This is a test post",
      authorId: userIds[faker.number.int({ min: 0, max: userIds.length - 1 })],
      username: process.env.USERNAME,
    })),
  )
}  


  // await db("posts").insert(
  //   [...new Array(15)].map(() => ({
  //    title: faker.word.words({ count: { min: 2, max: 10 } }),
  //     content: faker.lorem.paragraph(),
  //     authorId: userIds[faker.number.int({ min: 0, max: userIds.length - 1 })],
  //   })),
  // )
//   await db("comments").insert(
//     [...new Array(100)].map(() => ({
//     content: faker.lorem.paragraph(),
//     postId: postIds[faker.number.int({ min: 0, max: postIds.length + 1 })],
//     userId: userIds[faker.number.int({ min: 0, max: userIds.length - 1 })],
//     })),
//   )
// }
