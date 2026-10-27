"""Convierte el Excel de reclamos en data/reclamos.js
Uso:  python scripts/build_data.py RUTA/FORMULARIO_DE_RECLAMO.xlsx
Requiere: pip install pandas openpyxl
"""
import sys, re, json, pathlib
import pandas as pd
src = sys.argv[1] if len(sys.argv) > 1 else 'FORMULARIO_DE_RECLAMO.xlsx'
df = pd.read_excel(src, sheet_name='Formularios Data', header=1).iloc[:, :11]
s = lambda v: '' if pd.isna(v) else re.sub(r'\s+', ' ', str(v)).strip()
FIX = {'Cuntas': 'Cunetas', 'Vereda': 'Veredas', 'Limpieza Arrollo': 'Limpieza Arroyo',
       'Emp Publicas/Otros': 'Emp. Públicas/Otros', 'Boca Tormenta': 'Boca de Tormenta', '': 'Sin tarea'}
rows = []
for _, r in df.iterrows():
    t = s(r['Tarea']); res = t.startswith('Resuelto_'); t = t.replace('Resuelto_', ''); t = FIX.get(t, t)
    m = s(r['Localidad']).title().replace('18 De Mayo', '18 de Mayo') or 'Sin municipio'
    g = s(r['GPS']); u = re.search(r'https?://\S+', g)
    u = ('https://' + u.group(0).split('://', 1)[1]) if u else ''
    rows.append(dict(n=s(r['Nº de formulario']), t=t, r=int(res),
        d=r['Fecha'].strftime('%Y-%m-%d') if pd.notna(r['Fecha']) else '', m=m,
        b=s(r['Barrios']).strip('.'), a=s(r['Dirección']), e=s(r['Entre calles']),
        k=s(r['Tipo de reclamo']), x=s(r['Descripción del Reclamo']), g=u, gn='' if u else g))
rows.sort(key=lambda z: z['d'], reverse=True)
out = pathlib.Path(__file__).resolve().parent.parent / 'data' / 'reclamos.js'
out.write_text('window.RECLAMOS=' + json.dumps(rows, ensure_ascii=False, separators=(',', ':')) + ';', encoding='utf-8')
print(len(rows), 'reclamos ->', out)
