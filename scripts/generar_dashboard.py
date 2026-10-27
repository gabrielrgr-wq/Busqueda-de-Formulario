"""Regenera index.html y data/reclamos.json desde el Excel de reclamos.
Uso:  python scripts/generar_dashboard.py RUTA/FORMULARIO_DE_RECLAMO.xlsx
Requiere: pip install pandas openpyxl
"""
import sys, re, json, pathlib
import pandas as pd
raiz = pathlib.Path(__file__).resolve().parent.parent
xlsx = sys.argv[1] if len(sys.argv) > 1 else sys.exit(__doc__)
df = pd.read_excel(xlsx, sheet_name='Formularios Data', header=1).iloc[:, :11]
s = lambda v: '' if pd.isna(v) else re.sub(r'\s+', ' ', str(v)).strip()
TAREAS = {'Cuntas':'Cunetas','Vereda':'Veredas','Limpieza Arrollo':'Limpieza Arroyo','Emp Publicas/Otros':'Emp. Públicas/Otros','Boca Tormenta':'Boca de Tormenta','':'Sin tarea'}
filas = []
for _, r in df.iterrows():
    t = s(r['Tarea']); res = t.startswith('Resuelto_'); t = t.replace('Resuelto_', ''); t = TAREAS.get(t, t)
    m = s(r['Localidad']).title().replace('18 De Mayo', '18 de Mayo') or 'Sin municipio'
    g = s(r['GPS']); u = re.search(r'https?://\S+', g); u = ('https://' + u.group(0).split('://', 1)[1]) if u else ''
    filas.append(dict(n=s(r['Nº de formulario']), t=t, r=int(res), d=r['Fecha'].strftime('%Y-%m-%d') if pd.notna(r['Fecha']) else '',
        m=m, b=s(r['Barrios']).strip('.'), a=s(r['Dirección']), e=s(r['Entre calles']), k=s(r['Tipo de reclamo']), x=s(r['Descripción del Reclamo']), g=u, gn='' if u else g))
filas.sort(key=lambda z: z['d'], reverse=True)
datos = json.dumps(filas, ensure_ascii=False, separators=(',', ':'))
(raiz / 'data').mkdir(exist_ok=True)
(raiz / 'data' / 'reclamos.json').write_text(datos, encoding='utf-8')
html = (raiz / 'scripts' / 'plantilla.html').read_text(encoding='utf-8').replace('__DATA__', datos)
(raiz / 'index.html').write_text(html, encoding='utf-8')
print(f'{len(filas)} reclamos -> index.html y data/reclamos.json')
