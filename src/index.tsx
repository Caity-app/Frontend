import React, { PropsWithChildren, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './components/NavBar';
import { Routes, Route, BrowserRouter, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import GroceryList from './pages/GroceryList';
import Calendar from './pages/Calendar';
import BackdropProvider from './contexts/BackdropContext';
import Settings from './pages/Settings';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { AuthContextType } from './@types/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useContext(AuthContext) as AuthContextType;
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (<>
    <div onDragStart={e => e.preventDefault()} className='flex h-[calc(100vh-3.5rem-2rem)] mt-14 overflow-x-hidden translate-y-4'>
      {children}
    </div>
    <NavBar />
  </>);
}

const App = () => {

  return (
  <React.StrictMode>
    <BrowserRouter>
      <BackdropProvider>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login />} />

            <Route path='/' element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
              }
            />
            <Route path='/settings' element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>} 
            />
            <Route path='/grocerylist' element={
              <ProtectedRoute>
                <GroceryList />
              </ProtectedRoute>} 
            />

            <Route path='/calendar' element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>}/>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </BackdropProvider>
    </BrowserRouter>
  </React.StrictMode>
  );

}

root.render(
  <App />
);
