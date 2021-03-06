
exports.up = function(knex, Promise) {
  return knex.schema.createTable('issues', (t) => {
    t.increments('id').unsigned().primary().notNull()
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();

    t.string('name').notNull();
    t.text('description')
    t.string('icon_name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('issues')
};
