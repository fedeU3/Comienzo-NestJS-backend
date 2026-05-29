# Plantilla NestJS Backend

Plantilla de inicio para proyectos backend con NestJS. Incluye autenticación JWT, gestión de usuarios, conexión a PostgreSQL mediante TypeORM y control de acceso basado en roles. Está diseñada para ser usada como punto de partida en nuevos proyectos, evitando configurar desde cero la infraestructura de autenticación y base de datos.

---

## Características

- Registro de usuarios con contraseña hasheada (bcrypt)
- Login con generación de token JWT
- Protección de rutas mediante guard JWT (Passport)
- Control de acceso basado en roles (`user`, `owner`, `admin`, `master`)
- Decorador `@Roles()` para proteger endpoints por rol
- Validación global de DTOs con `class-validator` (whitelist + transform)
- CORS habilitado globalmente
- Conexión a PostgreSQL con TypeORM
- Configuración de variables de entorno con `@nestjs/config`

---

## Tecnologías utilizadas

| Categoría        | Tecnología                              |
|------------------|-----------------------------------------|
| Framework        | NestJS 10                               |
| Lenguaje         | TypeScript 5                            |
| Base de datos    | PostgreSQL (Supabase)                   |
| ORM              | TypeORM 0.3                             |
| Autenticación    | JWT (`@nestjs/jwt`, `passport-jwt`)     |
| Hash contraseñas | bcryptjs                                |
| Validación       | class-validator, class-transformer      |
| Testing          | Jest, Supertest                         |
| Linting          | ESLint + Prettier                       |
| Runtime          | Node.js                                 |

---

## Estructura del proyecto

```
src/
├── main.ts                        # Punto de entrada: configura CORS, ValidationPipe y puerto
├── app.module.ts                  # Módulo raíz: registra TypeORM, ConfigModule y los módulos de la app
│
├── auth/                          # Módulo de autenticación
│   ├── auth.controller.ts         # Rutas: POST /auth/signup, POST /auth/login, GET /auth
│   ├── auth.service.ts            # Lógica: registro, login, obtención del usuario autenticado
│   ├── auth.module.ts             # Configura PassportModule y JwtModule
│   ├── jwt.strategy.ts            # Estrategia JWT para Passport (valida el token y carga el usuario)
│   ├── dto/
│   │   ├── signup.dto.ts          # DTO de registro con validaciones
│   │   └── login.dto.ts           # DTO de login con validaciones
│   ├── decorators/
│   │   └── roles.decorator.ts     # Decorador @Roles() para marcar roles requeridos en un endpoint
│   ├── guards/
│   │   └── roles.guard.ts         # Guard que verifica si el usuario tiene el rol necesario
│   └── enums/
│       └── role.enum.ts           # Enum con los roles disponibles: user, owner, admin, master
│
└── users/                         # Módulo de usuarios
    ├── user.entity.ts             # Entidad TypeORM: tabla 'users' en el schema 'northwind'
    ├── user.service.ts            # Operaciones de base de datos: buscar, crear usuarios
    ├── users.controller.ts        # Rutas: GET /users
    ├── user.module.ts             # Módulo que exporta UserService para uso en AuthModule
    └── dto/
        └── CreateUserDTO.ts       # Tipo para la creación de un usuario
```

---

## Instalación

**Requisitos previos:** Node.js >= 18 y npm instalados.

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd plantilla-nest-js-backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con los valores correspondientes
```

---

## Configuración

Crear un archivo `.env` en la raíz del proyecto basándose en `.env.example`:

```env
# URL de conexión a la base de datos PostgreSQL (formato Supabase o estándar)
DATABASE_URL=postgresql://usuario:password@host:puerto/nombre_db

# Puerto en el que correrá el servidor (por defecto 3000)
PORT=3001

# Clave secreta para firmar los tokens JWT
JWT_SECRET=tu_clave_secreta_aqui

# Tiempo de expiración del token JWT (ej: 1d, 7d, 1h)
JWT_EXPIRE=1d
```

> La base de datos debe tener el schema `northwind` y la tabla `users` creada antes de iniciar la aplicación. TypeORM **no** crea la tabla automáticamente (no está configurado `synchronize: true`).

---

## Uso

```bash
# Desarrollo con recarga automática
npm run start:dev

# Desarrollo sin recarga
npm run start

# Producción (requiere compilar primero)
npm run build
npm run start:prod
```

El servidor estará disponible en `http://localhost:PORT` (por defecto `http://localhost:3000`).

---

## Endpoints disponibles

### Autenticación

| Método | Ruta           | Descripción                                      | Autenticación |
|--------|----------------|--------------------------------------------------|---------------|
| POST   | /auth/signup   | Registra un nuevo usuario y devuelve un token JWT | No            |
| POST   | /auth/login    | Inicia sesión y devuelve un token JWT             | No            |
| GET    | /auth          | Devuelve los datos del usuario autenticado        | JWT requerido |

**Body para `/auth/signup`:**
```json
{
  "name": "string",
  "userID": "string",
  "password": "string (mínimo 6 caracteres)",
  "nombre": "string",
  "apellido": "string",
  "direccion": "string",
  "rol": "string",
  "esAdmin": false,
  "isActive": true
}
```

**Body para `/auth/login`:**
```json
{
  "userID": "string",
  "password": "string (mínimo 6 caracteres)"
}
```

### Usuarios

| Método | Ruta    | Descripción             | Autenticación |
|--------|---------|-------------------------|---------------|
| GET    | /users  | Lista todos los usuarios | No            |

---

## Scripts disponibles

| Script             | Descripción                                                   |
|--------------------|---------------------------------------------------------------|
| `npm run start`    | Inicia la aplicación                                          |
| `npm run start:dev`| Inicia en modo desarrollo con recarga automática (watch)      |
| `npm run start:debug`| Inicia en modo debug con recarga automática                 |
| `npm run start:prod`| Inicia la versión compilada para producción                  |
| `npm run build`    | Compila el proyecto TypeScript a la carpeta `dist/`           |
| `npm run format`   | Formatea el código con Prettier                               |
| `npm run lint`     | Analiza y corrige el código con ESLint                        |
| `npm run test`     | Ejecuta los tests unitarios con Jest                          |
| `npm run test:watch`| Ejecuta los tests en modo watch                             |
| `npm run test:cov` | Ejecuta los tests y genera reporte de cobertura               |
| `npm run test:e2e` | Ejecuta los tests end-to-end                                  |

---

## Autor

**Federico Huespe**
- Email: federicohue@gmail.com
- GitHub: [@federicohuespe](https://github.com/federicohuespe)
