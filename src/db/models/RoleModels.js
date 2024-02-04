// RoleModel.js
import BaseModel from "@/db/models/BaseModel"
import PermissionModel from "@/db/models/PermissionModel"
import UserModel from "@/db/models/UserModel"
 
class RoleModel extends BaseModel {
  static tableName = "roles"

  static get relationMappings() {
    return {
      users: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: UserModel,
        join: {
          from: "roles.id",
          through: {
            from: "users_roles.roleId",
            to: "users_roles.userId",
          },
          to: "users.id",
        },
      },
      permissions: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: PermissionModel,
        join: {
          from: "roles.id",
          through: {
            from: "roles_permissions.roleId",
            to: "roles_permissions.permissionId",
          },
          to: "permissions.id",
        },
      },
    }
  }
}

export default RoleModel
