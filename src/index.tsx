import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/NavBar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='w-[calc(100vw-2rem)] h-[calc(100vh-3.5rem-2rem)] mt-14 overflow-y-auto overflow-x-hidden ml-4 translate-y-4'>
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </div>
      <NavBar />
    </BrowserRouter>
  </React.StrictMode>
);