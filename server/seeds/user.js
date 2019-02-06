const faker = require('faker')
// faker.seed(10)

const createFakeUser = () => ({
  email: faker.internet.email(),
  username: faker.internet.userName(),
  uid: faker.random.uuid(),
  balance: faker.finance.amount(1, 50, 2),
})
exports.seed = async function(knex, Promise) {
  // Users
  const fakeUsers = []
  const desiredFakeUsers = 10
  const ourUser = {
    email: 'harry@potter.com',
    username: 'harrypotter',
    uid: 'potter',
    balance: 12.9,
  }

  for (let i = 0; i < desiredFakeUsers; i++) {
    fakeUsers.push(createFakeUser())
  }

  fakeUsers.push(ourUser)
  await knex('users').insert(fakeUsers)
}
