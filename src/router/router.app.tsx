import { Welcome } from '@/app/components/Welcome'
import { LoginPage } from '@/app/login/LoginPage'
import { RegisterPage } from '@/app/login/RegisterPage'
import { createHashRouter } from 'react-router'

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
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
