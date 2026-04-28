import './App.css'
import { Outlet } from 'react-router'
import { Layout } from './modules/Layout'
import { useAuth } from './contexts/AuthContext';
import axios from 'axios';

const App: React.FC = () => {
  const auth = useAuth();

  axios.interceptors.request.use(async (config) => {
    if (auth.user) {
      const idToken = await auth.user.getIdToken(true);
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${idToken}`;
      config.headers["X-User-Role"] = "Admin";
    }

    return config;
  });


  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default App
