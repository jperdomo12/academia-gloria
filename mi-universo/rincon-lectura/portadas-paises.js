/*
 * Portadas de país robustas para el catálogo del Rincón de Lectura.
 *
 * En algunos entornos Windows/Chrome los emoji de banderas se muestran
 * como códigos de región (VE, ES) en lugar de como banderas. Estas reglas
 * dibujan las banderas directamente en CSS para mantener la experiencia
 * visual consistente sin depender del soporte de emoji del sistema.
 */

const STYLE_ID = "rincon-lectura-portadas-paises";

if (!document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .story-card[data-story-id="venezuela-entre-caribe-llanos-y-tepuyes"] .story-card-icon,
    .story-card[data-story-id="espana-muchos-paisajes-muchas-voces"] .story-card-icon {
      position: relative;
      font-size: 0;
    }

    .story-card[data-story-id="venezuela-entre-caribe-llanos-y-tepuyes"] .story-card-icon::before,
    .story-card[data-story-id="espana-muchos-paisajes-muchas-voces"] .story-card-icon::before {
      content: "";
      display: block;
      width: 122px;
      max-width: 72%;
      aspect-ratio: 3 / 2;
      margin: 0 auto;
      border-radius: 9px;
      box-shadow: 0 5px 14px rgba(15, 23, 42, .16);
    }

    .story-card[data-story-id="venezuela-entre-caribe-llanos-y-tepuyes"] .story-card-icon::before {
      background: linear-gradient(
        to bottom,
        #f4d900 0 33.333%,
        #0033a0 33.333% 66.666%,
        #ef3340 66.666% 100%
      );
    }

    .story-card[data-story-id="venezuela-entre-caribe-llanos-y-tepuyes"] .story-card-icon::after {
      content: "★ ★ ★ ★ ★ ★ ★ ★";
      position: absolute;
      left: 50%;
      top: 50%;
      width: 112px;
      max-width: 66%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 8px;
      line-height: 1;
      letter-spacing: 0;
      text-align: center;
      white-space: nowrap;
      text-shadow: 0 1px 1px rgba(0, 0, 0, .18);
    }

    .story-card[data-story-id="espana-muchos-paisajes-muchas-voces"] .story-card-icon::before {
      background: linear-gradient(
        to bottom,
        #aa151b 0 25%,
        #f1bf00 25% 75%,
        #aa151b 75% 100%
      );
    }

    .story-card[data-story-id="espana-muchos-paisajes-muchas-voces"] .story-card-icon::after {
      content: "";
      position: absolute;
      left: calc(50% - 34px);
      top: 50%;
      width: 13px;
      height: 24px;
      transform: translate(-50%, -50%);
      border: 2px solid rgba(170, 21, 27, .86);
      border-radius: 3px 3px 5px 5px;
      background:
        linear-gradient(90deg, transparent 0 38%, #aa151b 38% 62%, transparent 62%),
        linear-gradient(#f6d65a, #f1bf00);
      box-shadow: 0 -5px 0 -3px #aa151b;
    }

    @media (max-width: 520px) {
      .story-card[data-story-id="venezuela-entre-caribe-llanos-y-tepuyes"] .story-card-icon::before,
      .story-card[data-story-id="espana-muchos-paisajes-muchas-voces"] .story-card-icon::before {
        width: 104px;
      }

      .story-card[data-story-id="venezuela-entre-caribe-llanos-y-tepuyes"] .story-card-icon::after {
        font-size: 7px;
      }
    }
  `;

  document.head.appendChild(style);
}
