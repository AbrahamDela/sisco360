# SISCO360 Web Platform

Plataforma web para SISCO360, construida con Next.js y gestionada por Decap CMS.

## Características

- **Diseño Premium:** Interfaz moderna con tema oscuro y glassmorphism.
- **CMS Integrado:** Panel de administración (Decap CMS) para gestionar Productos y Vlogs sin tocar código.
- **SEO Avanzado:** Generación automática de Sitemap, Schema.org JSON-LD para productos y artículos.
- **Optimizado:** Next.js App Router para máximo rendimiento.

## Estructura del Proyecto

- `content/`: Archivos Markdown que contienen la información de productos y posts.
- `public/admin/`: Configuración del CMS.
- `src/app/`: Rutas y páginas de la aplicación.
- `src/lib/`: Utilidades para leer el contenido (Markdown).

## Instrucciones de Despliegue (Netlify)

1. **Subir a GitHub/GitLab:** Sube este código a un repositorio.
2. **Crear sitio en Netlify:** Conecta tu repositorio.
3. **Configuración de Build:**
   - Build Command: `npm run build`
   - Publish Directory: `.next` (o dejar automático)
4. **Habilitar Identity:**
   - Ve a "Site Settings > Identity" y habilítalo.
   - En "Registration", permite el registro (o solo invitación).
   - En "Services > Git Gateway", habilítalo para permitir que el CMS edite el repositorio.
5. **Acceder al Admin:**
   - Una vez desplegado, ve a `tusitio.com/admin` para iniciar sesión y gestionar el contenido.

## Desarrollo Local

```bash
npm install
npm run dev
```

El servidor iniciará en `http://localhost:3000`.
El CMS local puede requerir `npx decap-server` si quieres probarlo localmente sin Netlify (opcional, mejor probar en producción o preview).
