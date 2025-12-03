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

## Publicar
- GitHub Pages, Netlify o Cloudflare Pages.
- Para formularios, usar Formspree o Netlify Forms.
