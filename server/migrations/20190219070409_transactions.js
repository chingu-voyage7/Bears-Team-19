exports.up = async function(knex, Promise) {
  await knex.schema.createTable('transactions', table => {
    table
      .increments('trans_id')
      .notNullable()
      .primary()
    table.float('amount')
    table.string('date').notNullable()
    table.string('type').notNullable()
    table.integer('fk_category_id').notNullable()
    table.integer('fk_budget_id').notNullable()
    table.integer('fk_account_id').notNullable()
    table.integer('fk_user_id').notNullable()
    table
      .foreign('fk_user_id')
      .references('user_id')
      .inTable('users')
    // table
    //   .foreign('fk_budget_id')
    //   .references('budget_id')
    //   .inTable('budgets')
    // table
    //   .foreign('fk_account_id')
    //   .references('account_id')
    //   .inTable('accounts')
    table.timestamps(true, true)
  })
}

exports.down = async function(knex, Promise) {
  await knex.schema.dropTableIfExists('transactions')
}
