import { Welcome } from '@/app/components/Welcome'
import { LoginPage } from '@/app/login/LoginPage'
import { RegisterPage } from '@/app/login/RegisterPage'
import { createBrowserRouter } from 'react-router'

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },
    {
        path: '/index',
        element: <Welcome />
    },

])
