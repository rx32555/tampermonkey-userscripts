// ==UserScript==
// @name         Claude AI - Mostrar Solo Proyectos
// @namespace    https://github.com/rx32555/
// @version      1.0
// @description  Oculta el historial, chats recientes y opciones del panel izquierdo de claude.ai, dejando visible solo Proyectos. 
// @author       rx32555
// @match        https://claude.ai/*
// @grant        GM_addStyle
// @updateURL    https://raw.githubusercontent.com/rx32555/tampermonkey-userscripts/main/claude_ocultar_panel.user.js
// @downloadURL  https://raw.githubusercontent.com/rx32555/tampermonkey-userscripts/main/claude_ocultar_panel.user.js
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(`

        /* Ocultar botones superiores: Nuevo chat, Buscar, Personalizar */
        a[href="/new"],
        button[data-testid="sidebar-search-button"],
        a[href*="personalize"],
        nav > div:first-child {
            display: none !important;
        }

        /* Ocultar sección "Chats" del menú lateral */
        a[href="/chats"],
        a[href*="/chats"] {
            display: none !important;
        }

        /* Ocultar sección "Artefactos" */
        a[href*="artifacts"],
        a[href*="artefacts"] {
            display: none !important;
        }

        /* Ocultar sección "Código" */
        a[href*="code"] {
            display: none !important;
        }

        /* Ocultar sección "Recientes" y todos los chats recientes */
        [data-testid="recents-section"],
        [data-testid="sidebar-recents"],
        .overflow-y-auto ul,
        nav ul {
            display: none !important;
        }

        /* Ocultar label "Recientes" */
        span:has(+ ul) {
            display: none !important;
        }

        /* Ocultar info de usuario inferior (nombre, plan, botones) */
        [data-testid="sidebar-user-section"],
        [data-testid="user-menu"] {
            display: none !important;
        }

    `);

    // Función adicional para ocultar dinámicamente elementos que cargan tarde
    function ocultarElementos() {
        // Ocultar chats recientes por texto
        document.querySelectorAll('nav a').forEach(el => {
            const href = el.getAttribute('href') || '';
            // Mantener solo el enlace a Proyectos
            if (href.includes('/projects') && !href.includes('/projects/')) return;
            if (
                href === '/new' ||
                href.includes('/chats') ||
                href.includes('/artifacts') ||
                href.includes('/code') ||
                href.startsWith('/chat/') ||
                el.closest('[data-testid="recents-section"]')
            ) {
                el.style.display = 'none';
            }
        });

        // Ocultar sección "Recientes" por texto
        document.querySelectorAll('nav span, nav p').forEach(el => {
            if (el.textContent.trim() === 'Recientes') {
                const parent = el.closest('div') || el.parentElement;
                if (parent) parent.style.display = 'none';
            }
        });

        // Ocultar ítem "Chats" por texto
        document.querySelectorAll('nav a, nav button').forEach(el => {
            const texto = el.textContent.trim();
            if (['Chats', 'Artefactos', 'Código', 'Buscar', 'Personalizar', 'Nuevo chat'].includes(texto)) {
                el.style.display = 'none';
            }
        });
    }

    // Ejecutar al cargar y observar cambios dinámicos
    window.addEventListener('load', ocultarElementos);
    setTimeout(ocultarElementos, 1000);
    setTimeout(ocultarElementos, 3000);

    // Observar el DOM para cambios dinámicos (SPA)
    const observer = new MutationObserver(() => {
        ocultarElementos();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
