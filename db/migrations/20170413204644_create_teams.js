exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', (t) => {
    t.increments('id').unsigned().primary().notNull()
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at');

    t.string('name').notNull().index();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('teams')
};
