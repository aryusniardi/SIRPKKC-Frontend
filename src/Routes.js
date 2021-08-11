/* eslint-disable */

import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Pasien from 'src/pages/Pasien';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Rumahsakit from './pages/Rumahsakit'
import Petugas from './pages/Petugas'
import Laporan from './pages/Laporan'
import Account from './pages/Account';

const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'rumahsakit', element: <Rumahsakit /> },
      { path: 'pasien', element: <Pasien /> },
      { path: 'petugas', element: <Petugas /> },
      { path: 'laporan', element: <Laporan /> },
      { path: 'account', element: <Account />}
    ]
  },
  {
    path: '/',
    children: [
      {
        path: 'login',
        element:
          localStorage.getItem('email') === null || localStorage.getItem('email') === '' ? (
            <Login />
          ) : (
            <Navigate to="/" />
          )
      },
      { path: '/', element: <Navigate to="/" /> },
      { path: '*', element: <Navigate to="/404" /> },
      { path: '404', element: <NotFound /> }
    ]
  }
];

export default routes