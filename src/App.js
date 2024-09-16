import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import AddEditHoldingScreen from './screens/AddEditHoldingScreen';
import DetailsScreen from './screens/DetailsScreen';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Crypto Portfolio</h1>
        <Routes>
          <Route path="/" element={<HomeScreen cryptos={[]} onDelete={() => {}} />} />
          <Route path="/add" element={<AddEditHoldingScreen />} />
          <Route path="/edit/:id" element={<AddEditHoldingScreen />} />
          <Route path="/details/:id" element={<DetailsScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;