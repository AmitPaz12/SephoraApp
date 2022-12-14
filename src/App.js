import './App.css';
import HomePage from './HomePage/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHomePage from './HomePage/HomePage';
import Product from './Product/Product'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {UserContext} from './UserContext'

function App() {

  // create the element user to hold the current user
  const [user,setUser] = useState(null);
  
  return (
    // wrap all app with the provider to use the Context
    <UserContext.Provider value={{user, setUser}}>
    <div className="App">
      <Router>
      {!user ? (
        <Routes>
          <Route path="/Products/:productId" element={<Product/>} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      ) : (
      <div className="App-body"> 
        <Routes>
          <Route path="/Products/:productId" element={<Product/>} />
          <Route path="*" element={[<HomePage />]} />
          
        </Routes>
      </div>
      )}
      </Router>
    </div>
    </UserContext.Provider>
  );
}

export default App;
