exports.up = function(knex, Promise) {
  return knex.schema.createTable('team_users', (t) => {
    t.increments('id').unsigned().primary().notNull()
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at');

    t.integer('user_id').notNull().index();
    t.integer('team_id').notNull().index();
    t.unique(['user_id', 'team_id'])

    t.boolean('is_leader').notNull().defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('team_users')
};
