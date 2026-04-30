import './App.css'
import { Outlet } from 'react-router'
import { Layout } from './modules/Layout'
import { useAuth } from './contexts/AuthContext';
import axios from 'axios';
import { useEffect } from 'react';

const App: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
      const interceptor = axios.interceptors.request.use(async (config) => {
      if (user) {
        const idToken = await user.getIdToken(true);
        config.headers.Authorization = `Bearer ${idToken}`;
      }
        return config;
      });
  return () => axios.interceptors.request.eject(interceptor);
}, [user]);


  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App
