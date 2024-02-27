import BaseModel from "@/db/models/BaseModel"

class UserModel extends BaseModel {
  static tableName = "users"

  static jsonSchema = {
    type: "object",
    required: ["email", "username", "passwordHash", "passwordSalt"],
    properties: {
      id: { type: "integer" },
      email: { type: "string", minLength: 1, maxLength: 255 },
      username: { type: "string", minLength: 1, maxLength: 255 },
      passwordHash: { type: "string", minLength: 1, maxLength: 255 },
      passwordSalt: { type: "string", minLength: 1, maxLength: 255 },
      role: { type: "string", minLength: 1, maxLength: 255 },
      status: {type: "boolean", default: true},
    },
  }
}

export default UserModel
