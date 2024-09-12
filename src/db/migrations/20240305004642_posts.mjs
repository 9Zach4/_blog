export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id").primary()
    table.string("title").notNullable()
    table.text("content").notNullable()
    table.integer("authorId").unsigned().references("id").inTable("users").onDelete("CASCADE")
    table.string("username").unsigned()
  })
}

export const down = async (db) => {
  await db.schema.dropTable("posts")
}
