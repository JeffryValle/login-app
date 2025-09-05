import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useAuthStore, type User } from "../store/AuthStore"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { PacmanLoader } from "react-spinners"
import { useForm } from 'react-hook-form'

type initialValue = {
    name: string,
    email: string,
    phone: string,
    password: string,
    confirmPassword: string,
}

export const RegisterForm = () => {

    const { register: registro, handleSubmit,
        formState: { errors }, getValues, watch
    } = useForm<initialValue>();

    const [isActive, setIsActive] = useState<boolean>(false)
    const { register } = useAuthStore();
    const navigate = useNavigate();


    const securePass = watch("password");

    const onHandleSubmit = async () => {

        const nombre = getValues('name');
        const correo = getValues('email');
        const telefono = getValues('phone');
        const password = getValues('password');
        const confirmPassword = getValues('confirmPassword');


        const user: User = {
            nombre,
            correo,
            telefono,
            password,
            confirmPassword
        }

        const isValid = await register(user)

        if (isValid) {
            setIsActive(true); // Mostrar loader
            setTimeout(() => {
                setIsActive(false); // Ocultar loader
                toast.success('Usuario Creado Correctamente', {
                    closeButton: true,
                    style: {
                        color: 'green',
                    },
                    position: "top-center"
                })
                navigate('/')
            }, 4000);
            return
        }

        toast.warning('Datos inválido')
    };

    if (isActive) {
        return (
            <div className="flex justify-center items-center h-96">
                <PacmanLoader color="red" size="70" />
            </div>
        );
    }

    return (
        <div className={"flex flex-col gap-6 font-geologica"}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Registrar</CardTitle>
                    <CardDescription>Ingresa los datos para registrarse</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nombre</Label>
                                {errors.name && (<p className="text-red-500 text-sm">El nombre es requerido</p>)}
                                <Input id="name" type="name" placeholder="Post Malone"
                                    {...registro('name', {
                                        required: true,
                                        minLength: 3,
                                    })}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo</Label>
                                {errors.email && (<p className="text-red-500 text-sm">El correo es requerido</p>)}
                                <Input id="email" type="email" placeholder="post.malone@gmail.com"
                                    {...registro('email', {
                                        required: true,
                                    })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Telefono</Label>
                                {errors.phone && (<p className="text-red-500 text-sm">El telefono debe contener 8 digitos</p>)}
                                <Input id="phone" type="phone" placeholder="99994444"
                                    {...registro('phone', {
                                        required: true,
                                        minLength: 8,
                                        maxLength: 8
                                    })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Contraseña</Label>
                                {errors.password && (<p className="text-red-500 text-sm">La contraseña es obligatoria y deben contener minimo 6 caracteres</p>)}
                                <Input id="password" type="password"
                                    {...registro('password', {
                                        required: true,
                                        minLength: 6
                                    })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Confirmar Contraseña</Label>
                                {errors.confirmPassword && (<p className="text-red-500 text-sm">
                                    {errors.confirmPassword.message}
                                </p>)}
                                <Input id="confirmPassword" type="password"
                                    {...registro('confirmPassword', {
                                        required: true,
                                        minLength: 1,
                                        validate: (value) =>
                                            value === securePass || "Las contraseñas no coinciden",
                                    })} />
                            </div>
                            <Button type="submit" className="w-full">
                                Registrar
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Ya tienes una cuenta?{" "}
                            <a href="#" className="underline underline-offset-4" onClick={() => navigate('/')}>
                                Inicia Sesión
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
