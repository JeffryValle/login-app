import { Button } from "@/components/ui/button"
import { useAuthStore } from "../store/AuthStore"
import { useNavigate } from "react-router";

export const Welcome = () => {

    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-9xl font-geologica">Bienvenido !!!!!</h1>
                <Button className="w-50 h-10 hover:bg-white hover:text-black hover:border-2 hover:border-black"
                    onClick={onLogout}
                >Cerrar Sesión</Button>
            </div>
        </>
    )
}
