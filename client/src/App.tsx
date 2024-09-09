import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { useAuth } from './utils/useAuth';

import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const LoginPage = lazy(() => import('./pages/login/Login'));
const RegisterPage = lazy(() => import('./pages/register/Register'));
const HomePage = lazy(() => import('./pages/home/Home'));

import './App.scss';

const routes = {
    login: '/login',
    register: '/cadastrar',
    home: '/'
}

const unauthRouter = createBrowserRouter([
    { path: routes.home, element: <Navigate to={routes.login} /> },
    { path: routes.login, element: <LoginPage /> },
    { path: routes.register, element: <RegisterPage /> }
]);

const authRouter = createBrowserRouter([
    { path: routes.login, element: <Navigate to={routes.home} /> },
    { path: routes.register, element: <Navigate to={routes.home} /> },
    { path: routes.home, element: <HomePage /> },
])

function App() {
    const { user } = useAuth();

    return (
        <Suspense>
            <RouterProvider router={user ? authRouter : unauthRouter} />
            <ToastContainer />
        </Suspense>
    )
}

export default App
