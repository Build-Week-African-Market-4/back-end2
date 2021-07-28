exports.up = async (knex) => {
  await knex.schema

    .createTable('users', tbl => {
      tbl.increments('')
      tbl.string('user_name', 200)
        .notNullable()
      tbl.string('password', 200)
        .notNullable()
      tbl.string('location')
    })

    .createTable('sellers', tbl => {
      tbl.increments('')
      tbl.string('seller_name')
        .notNullable()
      tbl.string('password')
        .notNullable()
      tbl.string('location')
        .notNullable()
      tbl.string('photo')
    })

    .createTable('category', tbl => {
      tbl.increments('')
      tbl.string('category_name')
    })

    .createTable('products', tbl => {
      tbl.increments('id')
      tbl.string('product_name')
      tbl.integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('category')
    })

    .createTable('product_info', tbl => {
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
      tbl.string("description")
        .notNullable()
    })
}

exports.down = async (knex) => {
  await knex.schema
  .dropTableIfExists('product_info')
  .dropTableIfExists('products')
  .dropTableIfExists('category')
  .dropTableIfExists('sellers')
  .dropTableIfExists('users')
}
