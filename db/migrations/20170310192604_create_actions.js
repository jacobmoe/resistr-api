
exports.up = function(knex, Promise) {
  return knex.schema.createTable('actions', (t) => {
    t.increments('id').unsigned().primary().notNull()
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();

    t.string('name').notNull();
    t.text('description')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('actions')
};
