import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Data from './useContext_Hook/Data';
import { CartProvider } from "react-use-cart";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
  <BrowserRouter>
    <Data>
      <App />
    </Data>
  </BrowserRouter>
  </CartProvider>
);


