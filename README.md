# Mauricio Portfolio OS

Portafolio estático inspirado en escritorios clásicos, con recursos originales: escritorio, ventanas reutilizables, aplicaciones del portafolio, explorador de documentos, juegos y personalización.

## Desarrollo
```sh
npm install
npm run dev
npm run build
npm run preview
```
`npm run build` valida TypeScript y genera `dist/`. No requiere Node.js en producción.

## GitHub Pages
1. Subir el proyecto a un repositorio con rama `main`.
2. En Settings → Pages → Build and deployment, seleccionar **GitHub Actions**.
3. Cada push a `main` ejecuta `.github/workflows/deploy.yml`.

El workflow obtiene `base_path` de `actions/configure-pages`, por lo que sirve tanto en `/nombre-repositorio/` como desde un dominio personalizado configurado en Pages. Volver a ejecutar el workflow después de cambiar el dominio. El build local usa `./` y funciona en cualquier subdirectorio. Para fijar la base manualmente, establecer `VITE_BASE_PATH=/nombre-repositorio/` (o `/` para dominio propio) antes del build.

No se usa routing por rutas de servidor. Los assets importados pasan por Vite; los archivos de `public` usados por componentes deben pasar por `assetUrl()` de `src/config/profile.ts`. Evitar `/archivo.pdf`; usar `assetUrl('documents/archivo.pdf')`. Esto aplica también a juegos, audio e imágenes futuras.

## Personalización
- `src/config/profile.ts`: identidad, enlaces y ruta relativa de CV; campos vacíos no inventan datos.
- `src/data/apps.ts`: accesos del escritorio.
- `src/data/projects.ts`: proyectos.
- `src/data/documents.ts`: documentos (estructura preparada para etapa 3).
- `public/wallpapers/countryside.png`: paisaje generado originalmente para este proyecto.

## Uso
Doble clic en accesos; un toque en pantallas táctiles; Tab y Enter para teclado. Arrastrar la barra de título, redimensionar con la esquina inferior derecha (también admite flechas al enfocarla), doble clic en título para maximizar. La barra de tareas minimiza o restaura. Escape cierra Inicio. Alt+F4 dentro de una ventana la cierra cuando el navegador permite interceptarlo. En móvil las ventanas ocupan la pantalla disponible. Propiedades guarda la preferencia de tema localmente.

## Pendiente
CV, email, teléfono y LinkedIn incorporados. WhatsApp y documentos adicionales pendientes de suministro. No se incluyen documentos ficticios.

## Etapas 2, 3 y 4
Implementadas en componentes independientes: AboutApp, CVApp, ProjectsApp, ContactApp, DocumentsApp y GamesApp. PDFViewer y SnakeGame se cargan bajo demanda. La aplicación maneja errores por ventana.

### Cargar el CV
Guardar el PDF en `public/documents/cv.pdf` y establecer `cv: 'documents/cv.pdf'` en `src/config/profile.ts`. Se comprueba la disponibilidad de PDFs locales antes de mostrarlos. Los PDFs externos dependen de que el proveedor permita incrustarlos; siempre queda disponible el enlace para abrirlos. La descarga de archivos externos puede abrir otra pestaña según las restricciones del navegador.

### Datos personales
Completar email, phone, linkedin y whatsapp en profile.ts. WhatsApp acepta una URL HTTPS o número internacional. También se pueden editar introduction, technologies e interests. Los botones para copiar usan el portapapeles del navegador (HTTPS o localhost) y muestran un mensaje si no está disponible.

### Agregar documentos
Guardar los archivos en `public/documents/` y agregar registros en `src/data/documents.ts`:
```ts
{
  name: 'Mi presentación.pptx',
  type: 'pptx',
  date: '2026-09-11',
  size: '2 MB',
  folder: 'Presentaciones',
  url: 'documents/mi-presentacion.pptx',
  description: 'Presentación del proyecto.'
}
```
Este ejemplo no se incluye como documento real. Los tipos disponibles son pdf, pptx y link; folder puede ser Presentaciones o PDF. PDF usa el visor interno; PPTX y enlaces se abren externamente. Doble clic en escritorio, un toque en móvil, Enter con teclado. No existe ninguna operación de borrado.

### Agregar proyectos
Cada registro en projects.ts admite name, description, stack, screenshot, status, url y repository. screenshot puede ser una ruta relativa a public o una URL HTTPS. Los botones y capturas opcionales solo aparecen al configurar sus datos. SCL Solutions enlaza al sitio publicado y al repositorio.

### Snake
Abrir Juegos → Jugar Snake. Flechas/WASD, controles táctiles y espacio para pausar cuando el tablero tiene foco. Se pausa al salir de la aplicación o cambiar de pestaña. Minimizar o cerrar la ventana reinicia su contenido al volver a abrirla en esta versión.

Pruebas de reglas del juego:
```sh
node --test tests/snake.test.mjs
```
Personalización implementada. Sigue pendiente publicar el portfolio en su repositorio de GitHub.


## Personalización

Propiedades permite elegir Campo y cielo, Azul clásico o Noche; alternar tema oscuro; activar sonidos y ajustar volumen. Los sonidos son tonos originales sintetizados con Web Audio, no archivos de sistema. Solo suenan en interacciones de apertura y al usar Probar sonido; empiezan desactivados. La bandeja del escritorio también permite silenciarlos. Las preferencias se guardan localmente y funcionan aunque el almacenamiento esté bloqueado (sin persistencia).

Las pruebas automatizadas y la compilación TypeScript/Vite validan las reglas de los juegos y el build estático. No se ha realizado una auditoría Lighthouse ni una validación visual exhaustiva en dispositivos reales.


## Iconos de escritorio
Los accesos de perfil, CV, proyectos, contacto, papelera, juegos y propiedades usan PNGs de Tango Icon Theme 0.8.90, de dominio público. Se incluyen localmente en public/icons/tango, con su licencia y fuente. GitHub y LinkedIn conservan sus logos de React Icons con un marco de estilo retro. El mismo icono se muestra en escritorio, menú Inicio, barra de tareas y título de ventana. No se incluyen recursos de Windows XP.



## CV en PDF
Mi CV abre directamente el PDF original dentro de la ventana. También ofrece botones para abrirlo en otra pestaña o descargarlo.

Datos centralizados en src/config/profile.ts y PDF original en public/documents/CV_MauricioSantana.pdf. Se conserva la condición de estudiante y el archivo original sin modificaciones.

## Games

La carpeta Games abre cada juego en una ventana independiente del escritorio: Snake, Minesweeper, Pong, Breakout, Asteroids y SCL Network Adventure. Cada módulo se descarga solo al abrir su ventana.

SCL Network Adventure incluye los niveles Network, Server Room e Internet, data packets, checkpoints, obstáculos, QR final y `achievement.txt`. El QR se genera desde `PORTFOLIO_QR_URL` en `src/config/game.ts`; por defecto toma automáticamente el origen y base path actuales, por lo que funciona en un repositorio de GitHub Pages y en un dominio personalizado.

Los récords, el mute y el achievement usan la abstracción `gameStorage` con el prefijo `mauricio-games:`. Los efectos son tonos sintetizados y empiezan sujetos a la interacción del usuario. No se agregaron música ni archivos de audio externos.

La única dependencia nueva es `qrcode` (MIT), más sus tipos de desarrollo. No se agregó Phaser.

Para probar y compilar:

```sh
npm install
npm run dev
npm test
npm run build
```

El build final permanece completamente estático en `dist/` y conserva la configuración de GitHub Pages.
