# Base Misionera – Sitio estático

Sitio web estático para la Base Misionera (HTML, CSS y JS). Incluye carrusel con navegación táctil y lightbox para galería.

## Estructura
- `web/` contenido del sitio (`index.html`, `styles.css`, `script.js`, imágenes en `fts/`).
- `Dockerfile` y `nginx.conf` para servir con Nginx en Docker.

## Ejecutar local
Abra `web/index.html` directamente en su navegador.

## Docker
```
# Construir
docker build -t base-misionera:latest .
# Ejecutar
docker run --rm -p 8080:80 base-misionera:latest
```
Visite `http://localhost:8080`.

## Publicar en línea

### GitHub Pages (Recomendado)
Este repositorio está configurado para despliegue directo con GitHub Pages:

1. Ve a **Settings** > **Pages** en tu repositorio de GitHub
2. Selecciona la rama que deseas publicar (ej: `copilot/add-page-visualization` o `main`)
3. Selecciona `/ (root)` como carpeta
4. Guarda y espera unos minutos

Tu sitio estará disponible en: `https://ignaxiobwn.github.io/proyecto-web-base-Misio/`

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para instrucciones detalladas.

### Otras opciones
- Netlify o Cloudflare Pages también funcionan.
- Para formularios activos, considera usar Formspree o Netlify Forms.
