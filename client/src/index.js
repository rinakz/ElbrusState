import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Bookings from './components/Bookings';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/main' element={<Main/>}/>
      <Route path='/bookings' element={<Bookings/>}/>
    </Routes>
    </Provider>
  </BrowserRouter>
);

