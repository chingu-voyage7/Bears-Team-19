exports.up = async function(knex, Promise) {
  await knex.schema.createTable('balancelog', table => {
    table
      .increments('balancelog_id')
      .notNullable()
      .primary()
    table.integer('fk_account_id').notNullable()
    table.integer('fk_transaction_id')
    table
      .decimal('balance', 10, 2)
      .notNullable()
      .defaultTo(0.0)
    table.string('date').notNullable()
    table.integer('fk_user_id').notNullable()
    table
      .foreign('fk_user_id')
      .references('user_id')
      .inTable('users')
    table
      .foreign('fk_account_id')
      .references('account_id')
      .inTable('accounts')
    table
      .foreign('fk_transaction_id')
      .references('trans_id')
      .inTable('transactions')
    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('balancelog')
}