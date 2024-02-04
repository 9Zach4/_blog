import BaseModel from "@/db/models/BaseModel"
import UserModels from "@/db/models/UserModel"

class RoleModel extends BaseModel {
  static tableName = "roles"
  
  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: UserModels,
        join: {
          from: "roles.id",
          through: {
            from: "users_roles.roleId",
            to: "users_roles.userId",
          },
          to: "users.id",
        },
      }
    }
  }
}

export default RoleModel
     