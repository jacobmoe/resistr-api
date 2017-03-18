const relationshipBuilder = require('../relationships')

const table = {
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

const relationships = relationshipBuilder(table, {
  belongsTo: ['users', 'representatives', 'actions', 'issues']
})

module.exports = Object.assign(require('../base')(table), {
  whereWithAssociations: relationships.where
})
