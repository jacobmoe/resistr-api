
exports.seed = function(knex, Promise) {
  return knex('issues').del()
    .then(function () {
      return knex('issues').insert([
        {id: 1, name: 'health care', created_at: new Date, updated_at: new Date},
        {id: 2, name: 'voting rights', created_at: new Date, updated_at: new Date},
        {id: 3, name: 'immigration', created_at: new Date, updated_at: new Date}
      ]);
    });
};
