import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/NavBar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import GroceryList from './pages/GroceryList';
import Calendar from './pages/Calendar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const BackdropContext = React.createContext<{ backdrop: number; setBackdrop: React.Dispatch<React.SetStateAction<number>>; } | null>(null);

const App = () => {
  const [backdrop, setBackdrop] = React.useState(0);

  return (
  <React.StrictMode>
    <BrowserRouter>
      <BackdropContext.Provider value={{ backdrop, setBackdrop }}>
        <div onDragStart={e => e.preventDefault()} className='flex w-[calc(100vw-2rem)] h-[calc(100vh-3.5rem-2rem)] mt-14 overflow-y-auto overflow-x-hidden ml-4 translate-y-4'>
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/grocerylist' element={<GroceryList />} />
            <Route path='/calendar' element={<Calendar />}/>
            <Route path='*' element={<PageNotFound />}/>
          </Routes>
        </div>
        <NavBar />
        {backdrop && <div className='backdrop' onDragStart={e => e.preventDefault()} style={{ opacity: backdrop }}></div>}
      </BackdropContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
  );

}

root.render(
  <App />
);
