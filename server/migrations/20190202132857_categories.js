exports.up = async function(knex, Promise) {
  await knex.schema.createTable('categories', table => {
    table
      .increments('category_id')
      .notNullable()
      .primary()
    table.string('name').notNullable()
    table.integer('fk_trans_id')
    table
      .foreign('fk_trans_id')
      .references('trans_id')
      .inTable('transactions')
    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('categories')
}
