const schema = {
  name: 'team_users',
  columnMap: {
    id: 'id',
    userId: 'user_id',
    teamId: 'team_id',
    isLeader: 'is_leader',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const load = () => {
  return require('../buildTable')(schema, {

  })
}

module.exports = { schema, load }
