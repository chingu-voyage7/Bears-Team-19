exports.up = async function(knex, Promise) {
  await knex.schema.createTable('budgets', table => {
    table
      .increments('budget_id')
      .notNullable()
      .primary()
    table.string('budget_name').notNullable()
    table.integer('fk_user_id').notNullable()
    table
      .foreign('fk_user_id')
      .references('user_id')
      .inTable('users')
    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('budgets')
}
