import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/NavBar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <div className='border-red-500 border w-[calc(100vw-2rem)] h-[calc(100vh-3.5rem-2rem)] absolute mt-14 overflow-y-auto rounded-2xl ml-4 translate-y-4'>

    </div>
    <NavBar />
  </React.StrictMode>
);