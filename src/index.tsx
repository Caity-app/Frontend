import React, { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/NavBar';
import { Routes, Route, BrowserRouter, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import { AuthProvider, useAuth } from './components/AuthProvider';
import Login from './pages/Login';
import Calendar from './pages/Calendar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = useAuth();
  const location = useLocation();


  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (<>
    <div onDragStart={e => e.preventDefault()} className='flex w-[calc(100vw-2rem)] h-[calc(100vh-3.5rem-2rem)] mt-14 overflow-y-auto overflow-x-hidden ml-4 translate-y-4'>
      {children}
    </div>
    <NavBar />
  </>);
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/calendar' element={<Calendar />}/>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);