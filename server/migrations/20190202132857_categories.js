exports.up = async function(knex, Promise) {
  await knex.schema.createTable('categories', table => {
    table
      .increments('category_id')
      .notNullable()
      .primary()
    table.string('category').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('categories')
}
