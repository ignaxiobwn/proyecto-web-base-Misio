# Instrucciones de Despliegue - GitHub Pages

## Configuración de GitHub Pages

Para visualizar este sitio web en línea, sigue estos pasos:

### Paso 1: Activar GitHub Pages
1. Ve a tu repositorio en GitHub: https://github.com/ignaxiobwn/proyecto-web-base-Misio
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral izquierdo, busca y haz clic en **Pages**
4. En la sección **Source** (Origen):
   - Selecciona la rama: `copilot/add-page-visualization` (o la rama principal que desees)
   - Selecciona la carpeta: `/ (root)`
   - Haz clic en **Save** (Guardar)

### Paso 2: Esperar el despliegue
- GitHub Pages tardará unos minutos en construir y desplegar tu sitio
- Verás un mensaje indicando que tu sitio está listo
- La URL será algo como: `https://ignaxiobwn.github.io/proyecto-web-base-Misio/`

### Paso 3: Verificar el sitio
- Una vez que el sitio esté desplegado, visita la URL proporcionada
- El sitio debería mostrar la página de inicio de Base Misionera

## Notas Adicionales

### Actualizar el sitio
Cada vez que hagas cambios y los subas (push) a la rama configurada, GitHub Pages actualizará automáticamente el sitio.

### Dominio personalizado (opcional)
Si deseas usar un dominio personalizado:
1. En la página de Settings > Pages
2. Ingresa tu dominio en la sección **Custom domain**
3. Configura los registros DNS según las instrucciones de GitHub

### Solución de problemas
- Si el sitio no carga, verifica que la rama correcta esté seleccionada
- Asegúrate de que `index.html` esté en la raíz del repositorio
- Revisa la pestaña **Actions** para ver si hay errores en el despliegue
