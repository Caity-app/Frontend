import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/NavBar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import GroceryList from './pages/GroceryList';
import Calendar from './pages/Calendar';
import BackdropProvider from './contexts/BackdropContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App = () => {

  return (
  <React.StrictMode>
    <BrowserRouter>
      <BackdropProvider>
        <div onDragStart={e => e.preventDefault()} className='flex h-[calc(100vh-3.5rem-2rem)] mt-14 overflow-x-hidden translate-y-4'>
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/grocerylist' element={<GroceryList />} />
            <Route path='/calendar' element={<Calendar />}/>
            <Route path='*' element={<PageNotFound />}/>
          </Routes>
        </div>
        <NavBar />
      </BackdropProvider>
    </BrowserRouter>
  </React.StrictMode>
  );

}

root.render(
  <App />
);
