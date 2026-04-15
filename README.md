# Mis UserScripts para Tampermonkey 

Este repositorio contiene una colección de scripts personalizados para mejorar la experiencia de usuario en distintas plataformas web.

## Scripts Disponibles

### 1. Claude AI - Mostrar Solo Proyectos
Limpia la interfaz de [Claude.ai](https://claude.ai), ocultando el historial reciente, chats y menús innecesarios para centrar la vista únicamente en la sección de **Proyectos**.

* **Instalación:** [Haz clic aquí para instalar](https://raw.githubusercontent.com/rx32555/tampermonkey-userscripts/main/claude_ocultar_panel.user.js)
* **Funciones:**
    * Oculta panel lateral izquierdo (excepto Proyectos).
    * Elimina botones de "Nuevo Chat" y "Personalizar".
    * Remueve secciones de Artefactos y Código de la navegación.

---

## Cómo instalar
1. Instala la extensión **Tampermonkey** en tu navegador.
2. Haz clic en el enlace de instalación del script que desees arriba.
3. Presiona el botón "Instalar" en la pestaña que se abrirá automáticamente.

## Actualizaciones
Los scripts están configurados con `@updateURL`. Cada vez que haga un `git push` con una nueva versión del script, Tampermonkey detectará el cambio y se actualizará solo.