export const up = async (db) => {
  await db.schema.createTable("roles", (table) => {
    table.increments("id")
    table.text("name").notNullable()
  })
  await db.schema.createTable("roles_permissions", (table) => {
    table.integer("roleId").notNullable()
    table.integer("permissionId").notNullable()
    table.foreign("roleId").references("id").inTable("roles")
    table.foreign("permissionId").references("id").inTable("permissions")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("roles_permissions")
  await db.schema.dropTable("roles")
}

