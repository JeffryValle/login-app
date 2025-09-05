import { useState } from "react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "../store/AuthStore"
import { ClimbingBoxLoader } from "react-spinners"
import { toast } from "sonner"
import { useForm } from "react-hook-form"

type initialValue = {
    email: string,
    password: string,
}

export const LoginForm = () => {

    const [isActive, setIsActive] = useState<boolean>(false)
    const navigate = useNavigate()
    const { login } = useAuthStore();

    const { register, handleSubmit,
        formState: { errors }, getValues
    } = useForm<initialValue>();

    const onHandleSubmit = async () => {


        const email = getValues('email');
        const password = getValues('password');

        const isValid = await login(email, password);

        if (isValid) {
            setIsActive(true); // Mostrar loader
            setTimeout(() => {
                setIsActive(false); // Ocultar loader
                toast.success('Inicio Sesión Exitoso', {
                    closeButton: true,
                    style: {
                        color: 'green',
                    },
                })
                navigate('/index')
            }, 4000);
            return
        }


        setIsActive(true); // Mostrar loader
        setTimeout(() => {
            setIsActive(false); // Ocultar loader
        }, 2000);

        setTimeout(() => {
            toast.warning('Correo y/o contraseña inválidos',
                {
                    closeButton: true,
                    style: {
                        color: 'red',
                    },
                    position: "top-center"
                }
            )
        }, 2000);

    }

    if (isActive) {
        return (
            <div className="flex justify-center items-center h-96">
                <ClimbingBoxLoader color="green" size="70" />
            </div>
        );
    }

    return (
        <div className={"flex flex-col gap-6 font-geologica"}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
                    <CardDescription>Ingresa tu correo y contraseña para iniciar sesión</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo</Label>
                                {errors.email && (<p className="text-red-500 text-sm">El correo es requerido</p>)}
                                <Input id="email" type="email" placeholder="m@example.com"
                                    {...register('email', {
                                        required: true,
                                    })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>

                                    <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                        Olvidaste la contraseña?
                                    </a>
                                </div>
                                {errors.password && (<p className="text-red-500 text-sm">La contraseña es obligatoria y deben contener minimo 6 caracteres</p>)}
                                <Input id="password" type="password"
                                    {...register('password', {
                                        required: true,
                                        minLength: 6
                                    })}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Iniciar Sesión
                            </Button>
                            {/* <Button variant="outline" className="w-full">
                                Login with Google
                            </Button> */}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            No tienes cuenta?{" "}
                            <a href="#" className="underline underline-offset-4"
                                onClick={() => navigate('/register')}
                            >
                                Registrar
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
