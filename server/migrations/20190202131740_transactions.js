exports.up = async function(knex, Promise) {
  await knex.schema.createTable('transactions', table => {
    table
      .increments('trans_id')
      .notNullable()
      .primary()
    table.float('amount')
    table.string('account').notNullable()
    table.string('date').notNullable()
    table.string('type').notNullable()
    table.integer('fk_category_id').notNullable()
    table.specificType('fk_budget_id', 'int[]')
    table.integer('fk_user_id').notNullable()
    table
      .foreign('fk_user_id')
      .references('user_id')
      .inTable('users')
    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('transactions')
}
