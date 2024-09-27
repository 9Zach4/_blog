import { faker } from "@faker-js/faker"
import UserModel from "../models/UserModel.mjs"

const { PASSWORD, EMAIL} = process.env
const baseUser = { PASSWORD, EMAIL  }
const [passwordHash, passwordSalt] = await UserModel.hashPassword(baseUser.PASSWORD)
export const seed = async (db) => {
  await db("posts").delete()
  await db("comments").delete()
  await db("users").delete()

  await db("users").insert(
    [new Array(1)].map(() => ({
      email: baseUser.EMAIL,
      passwordHash,
      username: "ninja60",
      passwordSalt,
    })),
  )

  const userIds = await db("users").pluck("id")
  // const postIds = await db("posts").pluck("id")  
  
  
  
  await db("posts").insert(
    [...new Array(1)].map(() => ({
     title: "Hello World",
      content: faker.lorem.paragraph(),
      authorId: userIds[faker.number.int({ min: 0, max: userIds.length - 1 })],
      username: "ninja60",
    })),
  )
  // await db("comments").insert(
  //   [new Array(10)].map(() => ({
  //   content: faker.lorem.paragraph(),
  //   postId: postIds[faker.number.int({ min: 0, max: postIds.length + 1 })],
  //     userId: userIds[faker.number.int({ min: 0, max: userIds.length - 1 })],
  //   })),
  // )
}
