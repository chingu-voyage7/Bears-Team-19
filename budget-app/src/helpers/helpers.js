export const inUse = (id, transactions, type) => {
  return transactions.some(transaction => transaction[type] === id)
}
