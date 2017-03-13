module.exports = (tableInfo) => {
  return Object.assign(require('./crud')(tableInfo), {
    name: tableInfo.name,
    columnMap: tableInfo.columnMap,
    columns: Object.values(tableInfo.columnMap)
  })
}
