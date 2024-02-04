import BaseModel from "@/db/models/BaseModel"
import RoleModel from "@/db/models/RoleModel"


class PermissionModel extends BaseModel {
  static tableName = "permissions"

  static get relationMapping() {
    return {
      roles: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: RoleModel,
        join: {
          from: "permissions.id",
          through: {
            from: "roles_permissions.permissionId",
            to: "roles_permissions.roleId",
          },
          to: "roles.id",
        },
      },
    }
  }
}

export default PermissionModel