# Inmobiliaria Backend

Backend para la gestión inmobiliaria desarrollado con Node.js, TypeScript y Express. La API permite administrar propiedades, propietarios, localidades, servicios, consultas, visitas, usuarios y carga de imágenes asociadas a inmuebles.

## Tecnologías utilizadas

- Node.js 20+
- TypeScript
- Express
- pnpm
- MySQL
- MikroORM
- Swagger / Swagger UI
- Cloudinary
- JWT para autenticación
- Zod para validación
- Vitest + Supertest para testing
- GitHub Actions para CI

## Arquitectura del proyecto

La aplicación sigue una estructura orientada a features por dominio:

- `src/app.ts`: configuración principal de la aplicación Express y montaje de rutas.
- `src/server.ts`: arranque del servidor.
- `src/shared/db/orm.ts`: inicialización de MikroORM y sincronización del esquema.
- `src/*`: módulos principales del dominio, cada uno con su entidad, rutas y controladores.
- `src/shared/docs/swagger.ts`: configuración de la documentación OpenAPI.
- `.github/workflows/ci.yml`: pipeline de integración continua.

La idea general es:

1. La request entra por una ruta definida en el módulo correspondiente.
2. El controlador procesa la lógica de negocio.
3. Se usa MikroORM para interactuar con MySQL.
4. La respuesta se devuelve en formato JSON.
5. La documentación de la API se expone con Swagger.

## Requisitos previos

- Node.js 20 o superior
- pnpm
- MySQL 8 en ejecución localmente
- Base de datos llamada `inmobiliaria`

## Instalación

1. Clonar el repositorio.
2. Ir a la carpeta del backend.
3. Instalar dependencias:

```bash
pnpm install
```

## Variables de entorno

Se usan variables para JWT y Cloudinary. El proyecto incluye un archivo `.env` local con valores de desarrollo.

Ejemplo de variables esperadas:

```env
JWT_SECRET=tu_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

Importante: si vas a correr la app con otra base de datos o credenciales distintas, también deberás ajustar la configuración de conexión en `src/shared/db/orm.ts`.

## Scripts disponibles

```bash
pnpm test
```

Ejecuta la suite de tests con Vitest.

```bash
pnpm build
```

Compila el proyecto con TypeScript.

```bash
pnpm run start:dev
```

Levanta el backend en modo desarrollo con recompilación automática.

## Ejecución local

```bash
pnpm install
pnpm run start:dev
```

La aplicación queda disponible en el puerto configurado del servidor, y la base de datos debe estar corriendo para que las operaciones CRUD funcionen correctamente.

## Testing

El proyecto cuenta con pruebas de integración y pruebas unitarias para validar la lógica principal. Las pruebas usan:

- Vitest
- Supertest
- Base de datos MySQL en entorno de prueba

Antes de correr la suite, el esquema de la base se sincroniza para garantizar que las tablas existan con las entidades definidas.

## Documentación de la API

La documentación de la API se genera con Swagger y está disponible en la ruta:

```text
/api-docs
```

## CI con GitHub Actions

El proyecto incluye un workflow en `.github/workflows/ci.yml` para ejecutar la validación automática en cada push y pull request.

La pipeline realiza lo siguiente:

- instala dependencias con pnpm
- levanta un contenedor de MySQL
- compila el proyecto con TypeScript
- ejecuta la suite de tests

Esto permite detectar errores de integración antes de hacer merge.

## Integrantes

- Irina Repupilli
- Facundo Gregoret
- Bruno Schiffo
- Lautaro Frassine

## Observaciones

Este repositorio corresponde al backend de la aplicación inmobiliaria y no incluye el frontend. La lógica principal está centrada en la gestión de inmuebles, propietarios, servicios, consultas y usuarios.
