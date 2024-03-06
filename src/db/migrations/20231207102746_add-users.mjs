export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("email").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.string("username").notNullable()
    table.string("role").notNullable().defaultTo("user")
    table.text("passwordSalt").notNullable()
    table.boolean("status").notNullable().defaultTo(false)
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("users")
}
