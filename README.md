# LA DIGITAL — Web Principal

Web de la agencia LA DIGITAL. React single-page app.

## Estructura
```
la-digital-web/
├── public/
│   └── index.html          ← HTML base con SEO
├── src/
│   ├── index.js             ← Punto de entrada React
│   └── App.jsx              ← Toda la web (componentes + estilos)
├── package.json
├── vercel.json              ← Config de Vercel
└── .gitignore
```

## Desarrollo local
```bash
npm install
npm start
```
Se abre en http://localhost:3000

## Desplegar en Vercel

### Primera vez:
1. Sube este repo a GitHub (público o privado)
2. Ve a vercel.com → "Add New Project"
3. Importa el repo de GitHub
4. Vercel detecta React automáticamente → haz clic en "Deploy"
5. En Settings → Domains → añade "ladigital.es"
6. En tu registrador de dominio, configura las DNS que Vercel te indica

### Para iterar:
Cada vez que hagas push a la rama `main` en GitHub, Vercel despliega automáticamente.

```bash
# Editar la web
# ... haz cambios en src/App.jsx ...

git add .
git commit -m "actualización de la web"
git push
# → Vercel despliega solo en ~30 segundos
```

## Conectar dominio ladigital.es

En Vercel → Settings → Domains → Add "ladigital.es"

Vercel te dará instrucciones tipo:
- Registro A: 76.76.21.21
- Registro CNAME: cname.vercel-dns.com

Configura eso en tu registrador de dominio y espera 5-10 minutos.

## Tokens de diseño
```
Verde accent: #5A9A6E
Fondo: #FFFFFF
Texto: #1A1A1A
Texto muted: #7A7A72
Tipografía: DM Sans
```
