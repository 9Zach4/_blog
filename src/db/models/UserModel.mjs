import config from "../../config.mjs"
import BaseModel from "./BaseModel.mjs"
import { pbkdf2, randomBytes } from "node:crypto"
import { promisify } from "node:util"
const pbkdf2Async = promisify(pbkdf2)

class UserModel extends BaseModel {
  static tableName = "users"

  static async hashPassword(
    password,
    salt = randomBytes(config.security.password.keylen).toString("hex")
  ) {
    return [
      (
        await pbkdf2Async(
          password,
          salt + config.security.password.pepper,
          config.security.password.iterations,
          config.security.password.keylen,
          config.security.password.digest
        )
      ).toString("hex"),
      salt,
    ]
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "email", "passwordHash", "passwordSalt"],
      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        passwordHash: { type: "string" },
        passwordSalt: { type: "string" },
        role: { type: "string", default: "user" },
      },
    }
  }
}

export default UserModel
