
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_actions', (t) => {
    t.increments('id').unsigned().primary().notNull()
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();

    t.integer('user_id').notNull().index();;
    t.integer('action_id').notNull().index();;
    t.integer('representative_id').notNull().index();;
    t.integer('issue_id').notNull().index();;
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_actions')
};
