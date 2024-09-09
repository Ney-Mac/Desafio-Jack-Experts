import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

import { useAuth } from './utils/useAuth';
import { useRefresh } from './utils/useRefresh';

import { Spinner } from './components/Spinner/Spinner';

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
    const { isLoading } = useRefresh();

    return (
        <Suspense fallback={<Spinner />}>
            {isLoading ?
                <Spinner />
                : <RouterProvider router={user ? authRouter : unauthRouter} />
            }
        </Suspense>
    )
}

export default App
