
exports.seed = function(knex, Promise) {
  return knex('actions').del()
    .then(function () {
      return knex('actions').insert([
        {id: 1, name: 'phone call', created_at: new Date, updated_at: new Date},
        {id: 2, name: 'demonstration', created_at: new Date, updated_at: new Date},
        {id: 3, name: 'townhall', created_at: new Date, updated_at: new Date}
      ]);
    });
};
