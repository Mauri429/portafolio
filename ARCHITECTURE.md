# Mauricio Portfolio OS

## Arquitectura propuesta
Aplicación React + Vite + TypeScript estricto, completamente estática. Tailwind para utilidades, CSS para el lenguaje visual retro, Framer Motion para transiciones y React Icons para iconografía libre. Sin backend ni router: las aplicaciones son ventanas en una única página.

## Árbol de archivos
```text
src/
  components/
    desktop/   Desktop, DesktopIcon, Taskbar, StartMenu, Clock
    window/    Window, WindowManager, TitleBar
    apps/      AppContent (base inicial; se separará por aplicación)
  config/profile.ts
  data/apps.ts, projects.ts, documents.ts
  hooks/useViewport.ts
  store/windows.ts
  types/index.ts
  App.tsx
  styles.css
public/wallpapers/
.github/workflows/deploy.yml
```

## Componentes y estado
Desktop coordina accesos y selección; WindowManager representa ventanas; Window controla geometría con pointer capture; TitleBar ofrece controles accesibles; Taskbar restaura y minimiza; StartMenu ofrece navegación y apagado ficticio. En móvil todas las ventanas ocupan el área sobre la barra inferior.

## Modelo de datos
Profile: identidad y enlaces opcionales. AppDefinition: id, etiqueta, icono y destino opcional. Project: nombre, descripción, stack, captura, estado, sitio y repositorio. PortfolioDocument: nombre, tipo, fecha, tamaño, icono, URL y descripción. WindowState: id, posición, tamaño, minimizada y maximizada; el orden del arreglo determina la profundidad.

## Plan por etapas
1. Arquitectura, escritorio, selección, ventanas, arrastre, redimensionado, taskbar, menú, móvil y GitHub Pages.
2. Completar aplicaciones de perfil, CV, proyectos y contacto con datos reales.
3. Explorador de documentos y visor PDF.
4. Snake con controles de teclado y táctiles.
5. FPS original y carga diferida.
6. Personalización completa, sonidos, rendimiento y revisión de accesibilidad/SEO.

Esta entrega implementa la etapa 1 y contenido básico real para navegar. No inventa CV, datos de contacto ni documentos. Los destinos aún no disponibles muestran un estado explícito.

## Publicación estática
Vite usa base relativa por defecto. Actions obtiene la base de configure-pages; VITE_BASE_PATH permite fijarla manualmente. Todos los archivos públicos deben pasar por assetUrl y no se usarán rutas de navegador que requieran rewrites. Dominio personalizado: configurar Pages y volver a ejecutar el workflow.

## Avance posterior
Etapas 2–4 implementadas: aplicaciones separadas, visor PDF diferido con validación local, proyectos configurables, contacto con portapapeles, explorador por carpetas y Snake con motor probado. Los registros de documentos permanecen vacíos hasta disponer de archivos reales. Pendientes FPS y personalización final.

## Etapas 5–6
Implementados SettingsApp, PreferencesProvider, juegos independientes y visor PDF. Sonidos originales mediante Web Audio y preferencias locales validadas. Lighthouse y pruebas manuales multidispositivo aún no realizados.

## Games expansion
El catálogo abre cada juego como una aplicación independiente usando el gestor de ventanas existente. Los módulos se cargan mediante importaciones dinámicas. `src/games/shared` centraliza el loop, audio sintetizado y las claves de localStorage. Minesweeper usa DOM; Pong, Breakout, Asteroids y SCL Network Adventure usan Canvas. El plataformas tiene tres niveles, checkpoints, paquetes, obstáculos, QR final y achievement persistente.
