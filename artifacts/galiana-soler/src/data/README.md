# Contenido dinámico: investigaciones y recursos

Las investigaciones y los recursos educativos ya **no** se editan como archivos
JSON en el frontend. Ahora viven en la base de datos y se gestionan a través de
la API del proyecto (`artifacts/api-server`), para que el contenido se pueda
crear, editar o eliminar sin tocar código ni volver a desplegar el sitio.

## Dónde vive el contenido

- Tablas: `investigations` y `resources`, definidas en
  `lib/db/src/schema/investigations.ts` y `lib/db/src/schema/resources.ts`.
- API: endpoints `GET/POST /api/investigations`, `PATCH/DELETE /api/investigations/:id`
  y los equivalentes `GET/POST /api/resources`, `PATCH/DELETE /api/resources/:id`,
  definidos en `lib/api-spec/openapi.yaml` e implementados en
  `artifacts/api-server/src/routes/`.
- Frontend: `src/pages/Home.tsx` y `src/pages/Resources.tsx` consumen estos
  endpoints mediante los hooks generados de `@workspace/api-client-react`
  (`useListInvestigations`, `useListResources`, etc.), en vez de leer un JSON local.

## Cómo añadir o editar contenido

Las operaciones de lectura (`GET`) son públicas. Las operaciones de escritura
(crear, actualizar, borrar) requieren la cabecera `X-Admin-Token` con el valor
del secreto `ADMIN_API_TOKEN` configurado en el proyecto.

Ejemplo — crear una nueva investigación:

```bash
curl -X POST "$SITE_URL/api/investigations" \
  -H "Content-Type: application/json" \
  -H "X-Admin-Token: $ADMIN_API_TOKEN" \
  -d '{
    "slug": "garcia-martinez",
    "href": "/garcia-martinez",
    "period": "Segle XIX",
    "periodLabel": "Valencia, 1850–1920",
    "title": "Nombre de la persona investigada",
    "role": "Ocupación o rol breve",
    "text": "Resumen de la investigación (2–4 frases).",
    "tags": ["Urbanismo", "Educación"],
    "featured": false,
    "sortOrder": 1
  }'
```

Ejemplo — crear un nuevo recurso educativo:

```bash
curl -X POST "$SITE_URL/api/resources" \
  -H "Content-Type: application/json" \
  -H "X-Admin-Token: $ADMIN_API_TOKEN" \
  -d '{
    "title": "Nombre del recurso",
    "text": "Descripción breve del recurso.",
    "url": "https://ejemplo.org",
    "category": "Archivo",
    "tags": ["Genealogía"],
    "featured": false,
    "sortOrder": 7
  }'
```

Para editar o borrar un registro existente, usa `PATCH` o `DELETE` en
`/api/investigations/:id` o `/api/resources/:id` con la misma cabecera de
autenticación.

## Campos disponibles

### Investigación (`investigations`)

| Campo | Obligatorio | Descripción |
|---|---|---|
| `slug` | Sí | Identificador único, sin espacios (ej. `"garcia-martinez"`). |
| `href` | Sí | Ruta interna a la página de la biografía completa. |
| `period` | Sí | Etiqueta corta del periodo, usada para el filtro "Periodo". |
| `periodLabel` | Sí | Texto descriptivo mostrado en la tarjeta. |
| `title` | Sí | Nombre de la persona investigada. |
| `role` | Sí | Ocupación o rol breve. |
| `text` | Sí | Resumen de la investigación (2–4 frases). |
| `tags` | No | Lista de temas, usada para el filtro "Tema". |
| `featured` | No | Si se muestra destacada. |
| `sortOrder` | No | Orden de aparición (ascendente). |

### Recurso educativo (`resources`)

| Campo | Obligatorio | Descripción |
|---|---|---|
| `title` | Sí | Nombre del recurso o institución. |
| `text` | Sí | Descripción breve. |
| `url` | Sí | Enlace externo al recurso. |
| `category` | No | Categoría (ej. `"Archivo"`, `"Biblioteca"`, `"Curso interactivo"`). |
| `tags` | No | Lista de etiquetas temáticas. |
| `featured` | No | Si se muestra destacado en la página de recursos. |
| `sortOrder` | No | Orden de aparición (ascendente). |

## Sembrar contenido inicial

El script `scripts/src/seedAbuelaContent.ts` (ejecutable con
`pnpm --filter @workspace/scripts run seed:abuela`) inserta el contenido base
del proyecto si las tablas están vacías, sin duplicar registros existentes.
