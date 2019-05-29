exports.up = async function(knex, Promise) {
  await knex.schema.createTable('users', table => {
    table
      .increments('user_id')
      .notNullable()
      .primary()
    table
      .string('email')
      .unique()
      .notNullable()
    table.string('username').notNullable()
    table
      .string('uid')
      .notNullable()
      .unique()
    table
      .boolean('notifications')
      .notNullable()
      .defaultTo(true)
    table
      .string('currency')
      .notNullable()
      .defaultTo('USD')

    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('users')
}
