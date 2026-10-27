# Dashboard de reclamos de obras

Buscador de reclamos (Las Piedras, La Paz, 18 de Mayo, Progreso) por n.º de formulario, municipio, tarea, dirección y descripción, con ubicación GPS y envío por WhatsApp.

## Contenido
| Ruta | Qué es |
|---|---|
| `index.html` | Dashboard completo (datos incluidos; funciona sin servidor) |
| `data/reclamos.json` | Los mismos datos en JSON |
| `informes/` | Informe PDF por localidad y semestre, con resumen 2026 |
| `scripts/` | `generar_dashboard.py` y `plantilla.html` para actualizar con un Excel nuevo |
| `.nojekyll` | Evita que GitHub Pages procese el sitio con Jekyll |

## Publicar en GitHub Pages
1. Cree un repositorio en GitHub (por ejemplo `reclamos-obras`).
2. Suba el contenido de esta carpeta (arrastrando los archivos en la web, o con git):
   ```bash
   git init && git add . && git commit -m "Dashboard de reclamos"
   git branch -M main
   git remote add origin https://github.com/USUARIO/reclamos-obras.git
   git push -u origin main
   ```
3. En el repositorio: **Settings > Pages > Build and deployment > Source: Deploy from a branch > Branch: `main` / `(root)` > Save**.
4. En uno o dos minutos quedará en `https://USUARIO.github.io/reclamos-obras/`.

## Actualizar los datos
```bash
pip install pandas openpyxl
python scripts/generar_dashboard.py RUTA/FORMULARIO_DE_RECLAMO.xlsx
git add . && git commit -m "Actualizar reclamos" && git push
```

## Privacidad
Los datos incluyen direcciones, descripciones y ubicaciones de vecinos. Un repositorio público y GitHub Pages los dejan visibles para cualquiera con el enlace. Valore usar un repositorio privado (Pages privado requiere un plan de pago de GitHub) o retirar campos sensibles antes de publicar. El Excel original no se sube (`.gitignore`).
