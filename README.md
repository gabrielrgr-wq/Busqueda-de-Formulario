# Reclamos de obras · Buscador

Buscador móvil de reclamos de obras: busque por **n.º de formulario, municipio, tarea, dirección o descripción**, abra el detalle, ubique el **GPS** en Google Maps y **comparta por WhatsApp**. Incluye un **Panel** con gráficas y se puede **instalar en el celular** como app.

## Estructura

```
reclamos-obras/
├── index.html            Página principal
├── css/style.css         Estilos (tema claro/oscuro, diseño móvil)
├── js/app.js             Búsqueda, filtros, detalle, WhatsApp
├── js/extra.js           Panel con gráficas, tema, instalación
├── data/reclamos.js      Datos (se genera desde el Excel)
├── scripts/build_data.py Convierte el Excel en data/reclamos.js
├── icons/                Íconos de la app
├── manifest.webmanifest  Instalación en el celular (PWA)
├── sw.js                 Funciona sin conexión
└── .nojekyll
```

## Publicar en GitHub Pages

1. Cree un repositorio en GitHub (por ejemplo `reclamos-obras`).
2. Suba el contenido de esta carpeta (arrastrando los archivos en la web de GitHub, o con Git):
   ```bash
   git init && git add . && git commit -m "Primer despliegue"
   git branch -M main
   git remote add origin https://github.com/USUARIO/reclamos-obras.git
   git push -u origin main
   ```
3. En el repositorio: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. En 1 o 2 minutos quedará en `https://USUARIO.github.io/reclamos-obras/`.

## Usar en el celular

Abra la dirección en Chrome o Safari y use **Añadir a pantalla de inicio** (o el botón **Instalar** de la cabecera).

## Actualizar los datos

```bash
pip install pandas openpyxl
python scripts/build_data.py RUTA/FORMULARIO_DE_RECLAMO.xlsx
git add data/reclamos.js && git commit -m "Actualizar datos" && git push
```

Si cambia mucho el sitio, suba también el número de versión `V` en `sw.js` para que los celulares refresquen la copia guardada.

## Importante: privacidad

Los datos incluyen direcciones y descripciones de vecinos. **Un sitio de GitHub Pages es público** (incluso si el repositorio es privado, salvo en planes Enterprise). Antes de publicar, confirme que puede difundir esa información o quite campos sensibles en `scripts/build_data.py`. El `.gitignore` evita subir los Excel por accidente.
