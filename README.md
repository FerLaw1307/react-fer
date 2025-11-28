**Proyecto**: Michi accounts

Breve: Aplicación React + Vite + TypeScript que muestra cuentas y un layout con drawer lateral.

**Requisitos**:
- **Node.js**: se recomienda Node 18 LTS o superior. Verifica con `node -v`.
- **pnpm**: el proyecto usa `pnpm` como gestor de paquetes. Puedes usar `corepack` (incluido en Node 16.14+) o instalar `pnpm` globalmente.

**Instalación (macOS / Linux — bash / zsh)**:
- Instala Node (recomendado mediante `nvm`):
```
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \ . "$NVM_DIR/nvm.sh"
nvm install 18
nvm use 18
```
- Activar `corepack` y preparar `pnpm` (opcional):
```
corepack enable
corepack prepare pnpm@latest --activate
```
- Instalar dependencias:
```
pnpm install
```

**Instalación (Windows — PowerShell)**:
- Instala `nvm-windows` desde https://github.com/coreybutler/nvm-windows/releases y luego:
```
nvm install 18
nvm use 18
```
- Instala `pnpm` con `corepack` en PowerShell (si Node lo incluye) o con npm:
```
# Si usas PowerShell (ejecutar como Administrador si hace falta)
corepack enable
corepack prepare pnpm@latest --activate
# O alternativamente
npm i -g pnpm
```
- Instala dependencias:
```
pnpm install
```

**Comandos útiles**:
- Iniciar servidor de desarrollo:
```
pnpm dev
```
  - Abre `http://localhost:5173` (o el puerto que indique Vite).
- Construir para producción:
```
pnpm build
```
- Previsualizar build:
```
pnpm preview
```
- Type-check (TypeScript):
```
pnpm -w tsc --noEmit
```
(Si el proyecto no define un script `type-check`, ejecuta `pnpm exec tsc --noEmit`.)

**Estructura principal**
- `src/` : código fuente
  - `components/` : componentes reutilizables (`Layout`, `account-card`, ...)
  - `pages/` : páginas (Home, Contact, Experiments/...)
  - `hooks/` : hooks personalizados (ej. `useAccounts`)
  - `router/` : rutas de la app (`AppRouter.tsx`)
- `public/` : activos públicos
- `index.html`, `vite.config.ts`, `package.json` : configuración del proyecto

**Notas sobre el backend y el hook `useAccounts`**
- Actualmente `src/hooks/useAccounts.ts` usa un método dummy que simula la respuesta del servidor. No necesitas un backend para correr la app.
- Cuando tengas el backend listo, reemplaza el cuerpo de `fetchAccountsFromBackend()` por la llamada real `fetch('/api/accounts')` o tu cliente `axios` y parsea la respuesta a `AccountViewModel`.

**Parámetros de ruta / query params**
- Las rutas usan React Router v6. Los parámetros de ruta llegan como `string | undefined` y debes convertir/validar (número, booleano, fecha) en el componente antes de usarlos.

**Problemas comunes y soluciones**
- Puerto en uso: cambia el puerto de Vite con `pnpm dev -- --port 5174` o exporta `PORT`.
- Errores nativos (node-gyp): instala las toolchains necesarias (Xcode Command Line Tools en macOS, Build Tools en Windows).
- Permisos en macOS/Linux: evita `sudo pnpm install`; mejor ajustar permisos de usuario.

**Cómo contribuir**
- Crea un branch: `git checkout -b feat/mi-cambio`
- Haz commits claros: `git commit -m "feat: añadir ..."`
- Abre un Pull Request apuntando a `dev`.

**Contacto / Soporte**
- Para preguntas sobre el repo, abre un issue en GitHub o contacta al autor.

---
Generated: instrucciones básicas multiplataforma para ejecutar y desarrollar localmente.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
