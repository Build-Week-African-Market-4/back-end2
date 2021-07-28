exports.up = async (knex) => {
  await knex.schema

    .createTable("users", tbl => {
      tbl.increments()
      tbl.text("user_name")
        .notNullable()
      tbl.text("password")
        .notNullable()
      tbl.text("location")
    })

    .createTable("sellers", tbl => {
      tbl.increments()
      tbl.text("seller_name")
        .notNullable()
      tbl.text("password")
        .notNullable() 
      tbl.text("location")
        .notNullable()
      tbl.text("photo")
    })

    .createTable("category", tbl => {
      tbl.increments()
      tbl.string("category_name")
    })

    .createTable("products", tbl => {
      tbl.increments("id")
      tbl.text("product_name")
      tbl.integer("category_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("category")
    })

    .createTable("product_info", tbl => {
      tbl.increments("id")
      tbl.integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
      tbl.integer("seller_id")
        .unsigned()
        .references("id")
        .inTable("sellers")
      tbl.float("seller_price")
        .notNullable()
      tbl.integer("qty")
        .unsigned()
        .notNullable()
      tbl.text("description")
        .notNullable()
    })
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists("product_info")
  .dropTableIfExists("products")
  .dropTableIfExists("category")
  .dropTableIfExists("sellers")
  .dropTableIfExists("users")
}
