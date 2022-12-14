import initialize from 'header/initialize';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import ConsoleUIProvider from './components/ConsoleUIProvider';
import './index.css';
import CreateVehicle from './pages/CreateVehicle';
import EditVehicle from './pages/EditVehicle';
import ErrorPage from './pages/ErrorPage';
import ListVehicles from './pages/ListVehicles';
import ViewVehicle from './pages/ViewVehicle';
import reportWebVitals from './reportWebVitals';
import Root from './routes/root';

initialize();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ListVehicles />,
      },
    ],
  },
  {
    path: '/vehicles',
    element: <Root />,
    errorElement: <ErrorPage />,
    handle: {
      crumb: {
        title: 'Vehicles',
      },
    },
    children: [
      {
        index: true,
        element: <ListVehicles />,
      },
      {
        path: 'create',
        element: <CreateVehicle />,
        handle: {
          crumb: {
            title: 'Create',
          },
        },
      },
      {
        path: ':id',
        element: <Outlet />,
        handle: {
          crumb: {
            title: 'View',
          },
        },
        children: [
          {
            path: '',
            element: <ViewVehicle />,
          },
          {
            path: 'edit',
            element: <EditVehicle />,
            handle: {
              crumb: {
                title: 'Edit',
              },
            },
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ConsoleUIProvider>
      <RouterProvider router={router} />
    </ConsoleUIProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
