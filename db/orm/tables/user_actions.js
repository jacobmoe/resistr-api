const table = {
  name: 'user_actions',
  columns: {
    id: 'id',
    userId: 'user_id',
    actionId: 'action_id',
    representativeId: 'representative_id',
    issueId: 'issue_id',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
}

module.exports = Object.assign(require('../base')(table), {})
