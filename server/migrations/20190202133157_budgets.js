exports.up = async function(knex, Promise) {
  await knex.schema.createTable('budgets', table => {
    table
      .increments('budget_id')
      .notNullable()
      .primary()
    table.string('title').notNullable()
    table.integer('fk_trans_id').notNullable()
    table
      .foreign('fk_trans_id')
      .references('trans_id')
      .inTable('transactions')
    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('budgets')
}
