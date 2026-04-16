// ==UserScript==
// @name         Claude AI - Mostrar Solo Proyectos
// @namespace    https://github.com/rx32555/
// @version      1.8
// @description  Oculta el historial, chats recientes y opciones del panel izquierdo de claude.ai, dejando visible solo Proyectos.
// @author       rx32555
// @match        https://claude.ai/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/rx32555/tampermonkey-userscripts/main/claude/claude_ocultar_panel.user.js
// @downloadURL  https://raw.githubusercontent.com/rx32555/tampermonkey-userscripts/main/claude/claude_ocultar_panel.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=claude.ai
// ==/UserScript==

(function () {
    'use strict';

    // Redirigir automáticamente a /projects si se accede a la raíz
    if (window.location.pathname === '/' || window.location.pathname === '') {
        window.location.replace('https://claude.ai/projects');
        return;
    }

    GM_addStyle(`

        /* Ocultar Buscar */
        a[href*="search"],
        button[data-testid="sidebar-search-button"] {
            display: none !important;
        }

        /* Ocultar Nuevo chat, Personalizar */
        a[href="/new"],
        a[href*="personalize"] {
            display: none !important;
        }

        /* Ocultar Chats, Artefactos, Código */
        a[href="/chats"],
        a[href*="/chats"],
        a[href*="artifacts"],
        a[href*="artefacts"],
        a[href*="/code"] {
            display: none !important;
        }

        /* Ocultar Destacados y Recientes en panel izquierdo */
        [data-testid="recents-section"],
        [data-testid="sidebar-recents"],
        [data-testid="starred-section"],
        [data-testid="sidebar-starred"] {
            display: none !important;
        }

        /* Ocultar label Recientes y Destacados */
        span:has(+ ul) {
            display: none !important;
        }

        /* Ocultar info usuario inferior */
        [data-testid="sidebar-user-section"],
        [data-testid="user-menu"] {
            display: none !important;
        }

        /* Ocultar botón mostrar/ocultar panel lateral izquierdo */
        button[data-testid="pin-sidebar-toggle"] {
            display: none !important;
        }

        /* Ocultar panel derecho exacto (Memoria, Instrucciones, Archivos) */
        div[class*="xl\\:col-span-5"][class*="xl\\:pl-12"],
        div[class*="col-span-7"][class*="xl\\:col-span-5"] {
            display: none !important;
        }

    `);

    function ocultarElementos() {

        // Ocultar enlaces de navegación no deseados
        document.querySelectorAll('nav a').forEach(el => {
            const href = el.getAttribute('href') || '';
            if (href === '/projects') return;
            if (href.includes('/projects/')) return;
            if (
                href === '/new' ||
                href.includes('/chats') ||
                href.includes('/artifacts') ||
                href.includes('/code') ||
                href.includes('search') ||
                href.startsWith('/chat/')
            ) {
                el.style.display = 'none';
            }
        });
		
		// Auto-expandir descripción del proyecto haciendo clic en "Mostrar más"
document.querySelectorAll('button').forEach(el => {
    if (el.textContent.trim() === 'Mostrar más' && el.style.display !== 'none') {
        el.click();
    }
});


        // Ocultar por texto visible en nav
        document.querySelectorAll('nav a, nav button').forEach(el => {
            const texto = el.textContent.trim();
            if ([
                'Chats', 'Artefactos', 'Código', 'Buscar',
                'Personalizar', 'Nuevo chat', 'Destacados'
            ].includes(texto)) {
                el.style.display = 'none';
            }
        });

        // Ocultar secciones Recientes y Destacados por texto de encabezado
        document.querySelectorAll('span, p, h2, h3').forEach(el => {
            const texto = el.textContent.trim();
            if (['Recientes', 'Destacados'].includes(texto)) {
                const parent = el.closest('div[class]') || el.closest('section') || el.parentElement;
                if (parent) parent.style.display = 'none';
            }
        });

        // Ocultar panel derecho por contenido como fallback
        document.querySelectorAll('div.w-full').forEach(el => {
            const clases = el.className || '';
            if (!clases.includes('1.375rem')) return;
            const texto = el.textContent.trim();
            if (
                texto.startsWith('Memoria') ||
                texto.startsWith('Instrucciones') ||
                texto.startsWith('Archivos')
            ) {
                el.style.display = 'none';
            }
        });

        // Ocultar "Mostrar más" en descripción del proyecto
        document.querySelectorAll('button, a').forEach(el => {
            if (el.textContent.trim() === 'Mostrar más') {
                el.style.display = 'none';
            }
        });

        // Ocultar botones ⋮ y ★ del proyecto
        document.querySelectorAll('button[aria-label]').forEach(el => {
            const label = (el.getAttribute('aria-label') || '').toLowerCase();
            if (
                label.includes('opcion') || label.includes('option') || label.includes('more') ||
                label.includes('favorit') || label.includes('star') ||
                label.includes('abrir barra')
            ) {
                el.style.display = 'none';
            }
        });

        // Ocultar "Todos los proyectos" (flecha atrás)
        document.querySelectorAll('a').forEach(el => {
            if (el.textContent.trim() === 'Todos los proyectos') {
                el.style.display = 'none';
            }
        });

        // Ocultar info de usuario inferior
        document.querySelectorAll('[data-testid="user-menu"], [data-testid="sidebar-user-section"]').forEach(el => {
            el.style.display = 'none';
        });

        // Ocultar nombre/plan usuario
        document.querySelectorAll('nav > div:last-child').forEach(el => {
            if (el.textContent.includes('Plan')) {
                el.style.display = 'none';
            }
        });

        // Ocultar botón pin-sidebar-toggle por data-testid
        document.querySelectorAll('button[data-testid="pin-sidebar-toggle"]').forEach(el => {
            el.style.display = 'none';
        });
    }

    window.addEventListener('load', ocultarElementos);
    setTimeout(ocultarElementos, 500);
    setTimeout(ocultarElementos, 1500);
    setTimeout(ocultarElementos, 3000);

    const observer = new MutationObserver(() => {
        ocultarElementos();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
