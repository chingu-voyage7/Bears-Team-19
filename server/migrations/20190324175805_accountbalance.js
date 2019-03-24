exports.up = async function(knex, Promise) {
  await knex.schema.createTable('accountbalance', table => {
    table
      .increments('accountbalance_id')
      .notNullable()
      .primary()
    table.integer('fk_account_id').notNullable()
    table.integer('fk_transaction_id')
    table.integer('fk_user_id')
    table
      .decimal('balance', 10, 2)
      .notNullable()
      .defaultTo(0.0)
    table.string('date').notNullable()
    table
      .foreign('fk_account_id')
      .references('account_id')
      .inTable('accounts')
    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('accountbalance')
}
