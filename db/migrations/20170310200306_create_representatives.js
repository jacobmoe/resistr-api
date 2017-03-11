
exports.up = function(knex, Promise) {
  return knex.schema.createTable('representatives', (t) => {
    t.increments('id').unsigned().primary().notNull()
    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();

    t.string('ocd_division_identifier').notNull().index();
    t.string('office_name').notNull().index();
    t.string('name').notNull().index();

    t.unique(['name', 'office_name', 'ocd_division_identifier'])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('representatives')
};
