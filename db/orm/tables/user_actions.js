const schema = {
  name: 'user_actions',
  columnMap: {
    id: 'id',
    userId: 'user_id',
    representativeId: 'representative_id',
    actionId: 'action_id',
    issueId: 'issue_id',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

const load = () => {
  const relationships = require('../relationships')(schema, {
    belongsTo: ['users', 'representatives', 'actions', 'issues']
  })

  return require('../buildTable')(schema, {
    whereWithAssociations: relationships.where
  })
}

module.exports = { schema, load }
