import { compareAsc, format } from 'date-fns'

export const inUse = (id, transactions, type) => {
  return transactions.some(transaction => transaction[type] === id)
}

export const formatData = (array, name) => {
  const formatedArray = array.map(record => {
    return {
      category: format(record.date, 'YYYY-MM-DD'),
      value: record.balance,
    }
  })
  return [{ name: name, data: [...formatedArray] }]
}

export const formatAccounts = accountsArray => {
  return accountsArray
    .map(ac => {
      // map over each account and format the data into the shape that is needed
      return formatData(ac.balanceOverTime, ac.accountName)
    })
    .reduce((prev, curr) => {
      // Reduce the multiple arrays into one array of objects
      return [...prev, ...curr]
    }, [])
}

export const compareDates = (a, b) => {
  return compareAsc(a.date, b.date)
}

export const getMinDate = (accountId, accounts) => {
  const correctAccount = accounts.filter(account => {
    return account.account_id === Number(accountId)
  })
  return correctAccount[0].created_at
}

export const getExpensesForPieChart = transactions => {
  // Only expenses
  const expenses = transactions
    .filter(transaction => transaction.type === 'expense')
    .map(expense => {
      return { ...expense, amount: expense.amount * -1 }
    })

  // 1. Get a list of all categories.
  const categoriesAll = expenses.map(expense => expense.category)
  const catUniques = [...new Set(categoriesAll)]

  // 2. loop over the categories and return only the expenses that belong to that category.

  return catUniques.reduce((acc, prev) => {
    // Get the sum of each category
    const sum = expenses.reduce((total, amount) => {
      // Check if the category is the same in the expense as the one we loop through. If it is, then add the amount to total
      if (prev === amount.category) {
        return Number(total) + Number(amount.amount)
      }
      return total
    }, 0)
    // 3. Sum up the amounts for each category.
    return [...acc, { name: prev, value: sum }]
  }, [])
}

export const COLORS = [
  '#a6cee3',
  '#1f78b4',
  '#b2df8a',
  '#33a02c',
  '#fb9a99',
  '#e31a1c',
  '#fdbf6f',
  '#ff7f00',
  '#cab2d6',
  '#6a3d9a',
]
export const locales = [
  'AED',
  'AFN',
  'ALL',
  'AMD',
  'ANG',
  'AOA',
  'ARS',
  'AUD',
  'AWG',
  'AZN',
  'BAM',
  'BBD',
  'BDT',
  'BGN',
  'BHD',
  'BIF',
  'BMD',
  'BND',
  'BOB',
  'BRL',
  'BSD',
  'BTN',
  'BWP',
  'BYR',
  'BZD',
  'CAD',
  'CDF',
  'CHF',
  'CLP',
  'CNY',
  'COP',
  'CRC',
  'CUP',
  'CVE',
  'CZK',
  'DJF',
  'DKK',
  'DOP',
  'DZD',
  'EGP',
  'ERN',
  'ETB',
  'EUR',
  'FJD',
  'FKP',
  'GBP',
  'GEL',
  'GHS',
  'GIP',
  'GMD',
  'GNF',
  'GTQ',
  'GYD',
  'HKD',
  'HNL',
  'HRK',
  'HTG',
  'HUF',
  'IDR',
  'ILS',
  'INR',
  'IQD',
  'IRR',
  'ISK',
  'JMD',
  'JOD',
  'JPY',
  'KES',
  'KGS',
  'KHR',
  'KMF',
  'KPW',
  'KRW',
  'KWD',
  'KYD',
  'KZT',
  'LAK',
  'LBP',
  'LKR',
  'LRD',
  'LSL',
  'LYD',
  'MAD',
  'MDL',
  'MGA',
  'MKD',
  'MMK',
  'MNT',
  'MOP',
  'MRO',
  'MUR',
  'MVR',
  'MWK',
  'MXN',
  'MYR',
  'MZN',
  'NAD',
  'NGN',
  'NIO',
  'NOK',
  'NPR',
  'NZD',
  'OMR',
  'PAB',
  'PEN',
  'PGK',
  'PHP',
  'PKR',
  'PLN',
  'PYG',
  'QAR',
  'RON',
  'RSD',
  'RUB',
  'RWF',
  'SAR',
  'SBD',
  'SCR',
  'SDG',
  'SEK',
  'SGD',
  'SHP',
  'SLL',
  'SOS',
  'SRD',
  'SSP',
  'STD',
  'SYP',
  'SZL',
  'THB',
  'TJS',
  'TMT',
  'TND',
  'TOP',
  'TRY',
  'TTD',
  'TWD',
  'TZS',
  'UAH',
  'UGX',
  'USD',
  'UYU',
  'UZS',
  'VEF',
  'VND',
  'VUV',
  'WST',
  'XAF',
  'XCD',
  'XOF',
  'XPF',
  'YER',
  'ZAR',
  'ZMW',
  'ZWL',
]
