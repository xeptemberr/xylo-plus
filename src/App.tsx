import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JoinComplete from './auth/Complete';
import Join from './auth/Join';
import Login from './auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './dashboard/Dashboard';
import NoticeDetailPage from './pages/NoticeDetailPage';
import NoticePage from './pages/NoticePage';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/auth/join' element={<Join />} />
          <Route path='/auth/complete' element={<JoinComplete />} />
          <Route path='/notice' element={<NoticePage />} />
          <Route path='/notice/:id' element={<NoticeDetailPage />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
