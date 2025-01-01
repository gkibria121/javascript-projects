const budget = Object.assign([
  { value: 250, description: 'Sold old TV 📺', user: 'jonas' },
  { value: -45, description: 'Groceries 🥑', user: 'jonas' },
  { value: 3500, description: 'Monthly salary 👩‍💻', user: 'jonas' },
  { value: 300, description: 'Freelancing 👩‍💻', user: 'jonas' },
  { value: -1100, description: 'New iPhone 📱', user: 'jonas' },
  { value: -20, description: 'Candy 🍭', user: 'matilda' },
  { value: -125, description: 'Toys 🚂', user: 'matilda' },
  { value: -1800, description: 'New Laptop 💻', user: 'jonas' },
]);

const spendingLimits = {
  jonas: 1500,
  matilda: 100,
};

const addExpense = function (state, value, description, user = 'jonas') {
  const normalizedUser = user.toLowerCase();

  const limit = spendingLimits[normalizedUser] ?? 0;

  return limit > value
    ? [...state, { value: -value, description, user }]
    : state;
};

function getUserLimit(user, spendingLimits) {
  return spendingLimits[user] ?? 0;
}

const checkExpenses = function (state, spendingLimits) {
  return state.map(entry => {
    const limit = getUserLimit(entry.user, spendingLimits);
    return entry.value < -limit ? { ...entry, flag: 'limit' } : entry;
  });
};

const logBigExpenses = function (state, limit) {
  const output = state
    .filter(entry => entry.value <= -limit)
    .map(entry => entry.description.slice(-2))
    .join('/');

  console.log(output);
};

const newExpenseOptions = [
  { value: 10, description: 'Pizza 🍕', user: 'Jonas' },
  { value: 200, description: 'Stuff', user: 'Jay' },
  { value: 100, description: 'Going to movies 🍿', user: 'Matilda' },
];

const newBudget = newExpenseOptions.reduce(
  (state, { value, description, user }) => {
    return addExpense(state,value, description,user)
  },
  budget
); 
checkExpenses(newBudget, spendingLimits);
logBigExpenses(newBudget, 100);
