## applyTo: '\*\*'

# Instrucciones de Desarrollo: MTG Card Manager

## Contexto del Proyecto

Backend NestJS + TypeScript + MongoDB para gestionar cartas de Magic: The Gathering usando la API pública de Scryfall.

> **IMPORTANTE:** Siempre trabajar y ejecutar comandos dentro de la carpeta `mtg-card-manager` para evitar errores de estructura y dependencias.

## Pasos de Desarrollo

### 1. Configuración Inicial

- ✅ Configurar Docker Compose para MongoDB (`docker-compose.yml`).
- ✅ Instalar dependencias: `@nestjs/mongoose`, `mongoose`, `axios`, `class-validator`, `class-transformer`, `@nestjs/config`, `@nestjs/swagger`, `swagger-ui-express`.
- ✅ Configurar variables de entorno (`.env`) y conexión a MongoDB usando Mongoose y `@nestjs/config` en el módulo principal.
- Antes de iniciar el desarrollo, levantar la base de datos ejecutando:

  ```bash
  docker compose up -d
  ```

  - ✅ Configurar Swagger en `main.ts` para documentar la API en `/api`.

### 2. Estructura del Proyecto

- ✅ Crear módulo `cards` con:
  - ✅ Controlador (`cards.controller.ts`)
  - ✅ Servicio de negocio (`cards.service.ts`)
  - ✅ Servicio de integración Scryfall (`scryfall.service.ts`)
  - ✅ Esquema/Entidad Mongoose (`card.schema.ts`)
  - ✅ DTOs para request/response (`dto/`)
  - ✅ Interfaces para tipado fuerte (`interfaces/`)

### 3. Endpoints y Lógica

#### ✅ GET /cards/search

- ✅ Implementar endpoint que consulta Scryfall:
  - ✅ URL: `https://api.scryfall.com/cards/search?...`
  - ✅ Filtrar y retornar solo los primeros 5 resultados con los campos: `id`, `name`, `set_name`, `image_uris.normal` (o imagen disponible), `mana_cost`, `oracle_text`.
  - ✅ No guardar nada en la base de datos.
- ⭐ Extra: En Swagger solo aparecen los campos disponibles para búsqueda, facilitando el uso del endpoint.

#### ✅ POST /cards/save

- ✅ Recibir en el body un array de IDs de Scryfall.
- ✅ Por cada ID, consultar Scryfall: `https://api.scryfall.com/cards/{id}`.
- ✅ Guardar la carta completa en MongoDB (previniendo duplicados por ID).
- ⭐ Extra: El endpoint retorna un objeto de estadísticas con el resumen de guardadas, ya existentes y no encontradas.

#### ✅ PATCH /cards/:id

- ✅ Modificar una carta existente en MongoDB por su ID de Scryfall.
- ✅ Recibir campos a modificar en el body (ejemplo: `name`, `oracle_text`).
- ⭐ Extra: En Swagger se muestran ejemplos de payload (completo, un campo, dos campos) para facilitar el uso del endpoint.

### 4. Consideraciones Técnicas

- ✅ Separar responsabilidades: un servicio para Scryfall, otro para la base de datos.
- ✅ Usar DTOs y validaciones con `class-validator` para POST y PATCH.
- ✅ Tipado fuerte en todo el código (TypeScript, interfaces, DTOs).
- ✅ Esquema/Entidad basada en el payload de Scryfall.
- ⬜ Testing con Jest: crear archivos `.spec.ts` para cada servicio.
- ✅ No se requiere autenticación para los endpoints.
- ✅ Manejo de errores: devolver mensajes claros y específicos. Ejemplo: si se intenta crear una carta que ya existe, retornar "No se pudo crear la carta debido a que ya existe una carta con el id ${id}". Si ocurre un error con la API de Scryfall, devolver el error tal cual lo envía Scryfall.
- ✅ Para el endpoint POST /cards/save, implementar un rate limiter simple (delay de 50-100ms entre requests a Scryfall, máximo 10 peticiones por segundo) para evitar sobrecargar la API externa.
- ✅ Usar variables de entorno para configuración sensible (URLs, MongoDB, etc.) e instalar y configurar `@nestjs/config`.
- ✅ Todas las respuestas deben retornar solo la data solicitada, sin envoltorios adicionales.
- ✅ Documentar la API usando Swagger (OpenAPI) con NestJS.
- ✅ Commits atómicos y trabajo colaborativo solo entre IA y usuario.

### 5. Buenas Prácticas

- Código limpio, modular y documentado.
- Manejo de errores y respuestas claras según lo indicado arriba.
- Actualizar este archivo si surgen cambios o dudas durante el desarrollo.
- Mantener las convenciones de commits atómicos.

---
