# LoginApp


## <p align="center">Preview <p>
<p align="center">
  <img src="src/assets/preview.jpg" alt="preview" width='400px' height='400px' />
</p>

## Construido usando Vite con 🛠️ 

_Herramientas utilizadas:_

* [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) - Framework CSS
* [Shadcn UI](https://ui.shadcn.com/) - Incorporación de componentes
* [ReactRouter](https://reactrouter.com/start/data/installation) - Usado para manejo de rutas
* [React-Spinners](https://www.davidhu.io/react-spinners/) - Spinners implementados al cambiar de componente
* [Sonner](https://sonner.emilkowal.ski/getting-started) - Toast component minimalista
* [React-Hook-Form](https://react-hook-form.com/get-started) - Manejo de formulario, validación de datos
* [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) - Zustand para manejo del estado global

## Tailwind 🚀
```javascript
npm install tailwindcss @tailwindcss/vite
```
```javascript
// Archivo vite.config.ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```
```javascript
// Archivo src/index.css
@import "tailwindcss";
```

## Shadcn 📋
```javascript
// Archivo tsconfig.json
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
```javascript
// Archivo tsconfig.app.json
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```
```javascript
// resolve paths without error
npm install -D @types/node
```
```javascript
// Archivo vite.config.ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```
```javascript
// Ejecutar proyecto
npx shadcn@latest init
```






















