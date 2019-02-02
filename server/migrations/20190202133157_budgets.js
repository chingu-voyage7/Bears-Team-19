exports.up = async function(knex, Promise) {
  await knex.schema.createTable('budgets', table => {
    table
      .increments('budget_id')
      .notNullable()
      .primary()
    table.string('title').notNullable()
    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('budgets')
}
