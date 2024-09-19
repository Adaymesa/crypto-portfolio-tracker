# Crypto Portfolio Tracker
[![CI](https://github.com/Adaymesa/crypto-portfolio-tracker-bfin-final/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/Adaymesa/crypto-portfolio-tracker-bfin-final/actions/workflows/ci.yml)

This project is a React-based cryptocurrency portfolio tracker that allows users to add, view, and manage their cryptocurrency holdings.

## Features

- Add and edit cryptocurrency holdings
- View a list of all cryptocurrencies in the user's portfolio
- Delete holdings
- Fetch real-time price data from a public API (CoinGecko)
- Data persistence using local storage
- Responsive design for various screen sizes

## Setup and Running the App

1. Clone the repository:
   ```
   git clone https://github.com/Adaymesa/crypto-portfolio-tracker-bfin-final.git
   cd crypto-portfolio-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Running Tests

To run the test suite:
   ```
   npm test
   ```

## Implementation Details

- React for the UI
- Redux (with Redux Toolkit) for state management
- React Router for navigation
- Axios for API calls
- Jest and React Testing Library for testing

## Code Structure

- `src/app`: Contains Redux store and slice configurations
- `src/components`: Reusable React components
- `src/screens`: Main screen components
- `src/services`: API and local storage services

## Additional Enhancements

- Real-time price updates using CoinGecko API
- Responsive design for mobile and desktop views
- Continuous Integration (CI) pipeline with GitHub Actions

## Challenges and Solutions

During development, I encountered a challenge with continuous API calls to the CoinGecko price API when adding new coins. To address this quickly as time was running out, I implemented a state variable to control the requests, limiting unnecessary API calls and improving performance.

## Future Improvements

- Implement user authentication
- Add more detailed cryptocurrency information and charts
- Implement portfolio performance tracking over time
- Optimize API calls to reduce the risk of hitting rate limits
