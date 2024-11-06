const express = require('express');
const app = express();
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

// Initialize the Plaid client
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Or PlaidEnvironments.production if you're live
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID, // Get from environment variables
      'PLAID-SECRET': process.env.PLAID_SECRET, // Get from environment variables
    },
  },
});

const plaidClient = new PlaidApi(configuration);

// Root route handler
app.get('/', (req, res) => {
  res.send('Hello from the root URL!'); 
});

app.get('/create/linktoken', async (req, res) => {
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: 'unique_user_id', // Replace with a unique ID for the user
      },
      client_name: 'Your App Name',
      products: ['auth', 'transactions'], // Add other products as needed
      country_codes: ['US'],
      language: 'en',
      redirect_uri: 'https://www.spongebobwasokay.com', // Your redirect URI
    });

    res.json(createTokenResponse.data);
  } catch (error) {
    console.error('Error creating Link token:', error);
    res.status(500).json({ error: 'Failed to create Link token' });
  }
});

const port = 3000; 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});