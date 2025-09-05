
import { create } from 'zustand'

export interface User {
    nombre: string;
    correo: string;
    telefono: string;
    password: string;
    confirmPassword: string;
}

type AuthState = {
    // Properties
    user: User | null;

    // Getters

    // Actions
    login: (email: string, password: string) => Promise<boolean>;
    register: (usuario: User) => Promise<boolean>;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
    // Implementación del store

    user: null,

    register: async (usuario: User) => {
        try {
            localStorage.setItem('user', JSON.stringify(usuario))
            set({ user: usuario })
            return true
        } catch (error) {
            localStorage.removeItem('user')
            set({ user: null })
            return false
        }
    },

    login: async (email: string, password: string) => {

        try {

            const { correo, password: contraseña } = JSON.parse(localStorage.getItem('user') as string)

            if (email.toLowerCase().trim() === correo.toLowerCase().trim()
                && password.toLowerCase().trim() === contraseña.toLowerCase().trim()) {
                return true
            }
            return false
        } catch (error) {
            localStorage.removeItem('user')
            set({ user: null })
            return false
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null })
    }
}))