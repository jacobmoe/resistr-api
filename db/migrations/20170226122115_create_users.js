
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary().notNull()

    t.dateTime('created_at').notNull();
    t.dateTime('updated_at').nullable();

    t.string('encrypted_password').notNull();
    t.string('reset_password_token');
    t.string('reset_password_sent_at');

    t.string('email').notNull().unique().index();
    t.string('name').notNull();

    t.string('avatar_file_name')
    t.string('avatar_content_type')
    t.integer('avatar_file_size')
    t.dateTime('avatar_updated_at')

    t.text('description')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
