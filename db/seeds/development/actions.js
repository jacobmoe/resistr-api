
exports.seed = function(knex, Promise) {
  const date = new Date

  return knex('actions').del()
    .then(function () {
      return knex('actions').insert([
        {id: 1, name: 'phone call', icon_name: 'call', created_at: date, updated_at: date},
        {id: 2, name: 'voice message', icon_name: 'voicemail', created_at: date, updated_at: date},
        {id: 3, name: 'email', icon_name: 'keyboard', created_at: date, updated_at: date},
        {id: 4, name: 'letter', icon_name: 'mail-outline', created_at: date, updated_at: date},
        {id: 5, name: 'demonstration', icon_name: 'people', created_at: date, updated_at: date},
        {id: 6, name: 'town hall', icon_name: 'account-balance', created_at: date, updated_at: date},
        {id: 7, name: 'office visit', icon_name: 'business', created_at: date, updated_at: date},
        {id: 8, name: 'fax', icon_name: 'scanner', created_at: date, updated_at: date}
      ]);
    });
};
