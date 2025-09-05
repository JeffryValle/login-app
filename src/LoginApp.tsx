import { RouterProvider } from "react-router"
import { appRouter } from "./router/router.app"
import { Toaster } from 'sonner'

export const LoginApp = () => {
    return (
        <>
            <RouterProvider router={appRouter} />
            <Toaster />
        </>
    )
}
