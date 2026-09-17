# Mesas — Diego & Angie

Planificador de mesas con drag-and-drop, guardado compartido (todos los que
abran el link ven y editan las mismas mesas, en cualquier dispositivo).

## Qué incluye

- `index.html` — la app (arrastrar invitados a mesas, exportar Excel/CSV, etc).
- `api/mesas.js` — función serverless de Vercel que lee/guarda el estado
  compartido en una base de datos (Vercel KV).
- `package.json` — dependencia de `@vercel/kv`.

## Pasos para publicarlo (una sola vez)

### 1. Instalar la herramienta de Vercel

En una terminal (Mac: Terminal, Windows: cmd o PowerShell), necesitás tener
[Node.js](https://nodejs.org) instalado. Después corré:

```
npm install -g vercel
```

### 2. Entrar a esta carpeta y desplegar

Descomprimí este proyecto, abrí una terminal DENTRO de la carpeta
(`mesas-vercel`) y corré:

```
vercel login
```

(te va a pedir loguearte con tu cuenta de Vercel — si no tenés, se crea
gratis en el mismo paso, o antes en vercel.com).

Después:

```
vercel
```

Te va a hacer un par de preguntas (aceptá los valores por defecto tocando
Enter). Al terminar te da una URL de prueba tipo
`https://mesas-diego-angie-xxxx.vercel.app`.

Cuando quieras que sea la versión "definitiva" (la que van a usar de verdad):

```
vercel --prod
```

Esa te da la URL final, algo como `https://mesas-diego-angie.vercel.app`.

### 3. Activar la base de datos compartida (Vercel KV)

Sin este paso, la app funciona pero cada navegador guarda solo lo suyo
(como al principio). Para que se comparta entre dispositivos:

1. Entrá a [vercel.com](https://vercel.com) y abrí tu proyecto
   (`mesas-diego-angie`).
2. Andá a la pestaña **Storage**.
3. Elegí **Create Database** → **KV** (es gratis en el plan Hobby, con un
   límite generoso de lecturas/escrituras mensuales — de sobra para esto).
4. Cuando te pregunte a qué proyecto conectarla, elegí este mismo proyecto.
   Esto crea automáticamente las variables de entorno que
   `api/mesas.js` necesita.
5. Volvé a desplegar para que tome las variables nuevas:
   ```
   vercel --prod
   ```

Listo — a partir de ahí, cualquiera que entre a tu URL de Vercel va a ver
las mismas mesas y los cambios de todos se van a sincronizar solos (se
actualiza cada pocos segundos).

## Si preferís hacerlo sin usar la terminal

También podés:

1. Crear un repositorio en GitHub y subir estos archivos ahí (arrastrando
   los archivos en la web de GitHub, sin usar comandos).
2. En vercel.com, tocar **Add New → Project** e importar ese repositorio.
3. Seguir desde el paso 3 de arriba (Storage → Create Database → KV).

## Nota sobre los datos ya cargados

Esta copia ya trae precargados tus 132 invitados confirmados y las 25 mesas
que armaste en tu Excel más reciente, como estado inicial local de cada
navegador. Una vez que conectes la base de datos (paso 3), la primera
persona que abra la app va a "sembrar" ese estado en el servidor
automáticamente, y desde ahí todos comparten lo mismo.
