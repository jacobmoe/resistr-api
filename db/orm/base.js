module.exports = (tableInfo) => {
  return Object.assign(require('./crud')(tableInfo), {
    name: tableInfo.name,
    columns: Object.values(tableInfo.columns)
  })
}
