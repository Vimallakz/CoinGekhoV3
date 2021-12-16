import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './tailwind.css';
import reportWebVitals from './reportWebVitals';
import CoinList from './pages/CoinsList/CoinList';

import '../node_modules/primereact/resources/themes/lara-light-indigo/theme.css';    // theme
import '../node_modules/primereact/resources/primereact.min.css';                    // core css
import '../node_modules/primeicons/primeicons.css';                        // icons
import '../node_modules/primeflex/primeflex.css';

ReactDOM.render(
  <React.StrictMode>
    <CoinList />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
