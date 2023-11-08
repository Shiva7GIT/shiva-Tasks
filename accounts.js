const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Middleware to check Authorization header
const checkAuthorization = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // You can add more validation logic here if needed
  next();
};



// In-memory array to store accounts
const accounts = [];

// Endpoint to open an account
app.post('/accounts/open', checkAuthorization,(req, res) => {
  const { holder, type, status, balance } = req.body;

  // Check if account holder already has 2 accounts of the same type
  const existingAccounts = accounts.filter(account => account.holder == holder && account.type === type);
  if (existingAccounts.length > 0) {
    return res.status(400).json({ error: 'Account limit reached for this account type' });
  }

  // Generate a unique account number (for simplicity, using a random number)
  const accountNumber = Math.floor(Math.random() * 1000000000).toString();

  // Create a new account object and add it to the accounts array
  const newAccount = {
    accountNumber,
    holder,
    type,
    status: 'pending', // Set initial status to 'pending'
    balance
  };
  accounts.push(newAccount);

  res.status(201).json(newAccount);
});

// Endpoint to get all accounts
app.get('/accounts', checkAuthorization, (req, res) => {
  res.status(200).json(accounts);
});

// Endpoint to activate an account
app.put('/accounts/:accountnumber/activate', checkAuthorization, (req, res) => {
  const accountNumber = req.params.accountnumber;
  const accountIndex = accounts.findIndex(account => account.accountNumber === accountNumber);

  if (accountIndex === -1) {
    return res.status(404).json({ error: 'Account not found' });
  }

  // Change account status to 'active'
  accounts[accountIndex].status = 'active';

  res.status(200).json({ message: 'Account activated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});