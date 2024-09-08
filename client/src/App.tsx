import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';

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
    { path: routes.home, element: <HomePage /> }
])

function App() {
    let isAuth = true;

    return (
        <Suspense>
            <RouterProvider router={isAuth ? authRouter : unauthRouter} />
        </Suspense>
    )
}

export default App
