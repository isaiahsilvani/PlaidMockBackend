const express = require('express');
const app = express();
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

// Initialize the Plaid client
const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Or PlaidEnvironments.production if you're live
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': '66edbca9a1c71b001bc4ec9a',
      'PLAID-SECRET': '3d9c03b6bbd512fb9d88868034d842',
    },
  },
});

const plaidClient = new PlaidApi(configuration);

app.get('/isaiah/create/linktoken', async (req, res) => {
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