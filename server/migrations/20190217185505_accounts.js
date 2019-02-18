exports.up = async function(knex, Promise) {
  await knex.schema.createTable('accounts', table => {
    table
      .increments('account_id')
      .notNullable()
      .primary()
    table.string('account_name').notNullable()
    table
      .decimal('balance', 10, 2)
      .notNullable()
      .defaultTo(0.0)
    table.integer('fk_user_id').notNullable()
    table
      .foreign('fk_user_id')
      .references('user_id')
      .inTable('users')
    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('accounts')
}
