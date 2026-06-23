# Beyond — Estudio de diseño

Web institucional del estudio Beyond (Málaga, España).
HTML + CSS + JS vanilla, sin build step. Animaciones con GSAP + Lenis.

## Estructura

```
web-beyond/
├── index.html
├── css/style.css
├── js/main.js          # theme toggle, marquee, modal, Lenis
├── js/animations.js    # GSAP: mask reveals, parallax, stagger
├── images/
│   ├── logo.png          # favicon (símbolo)
│   └── logonombre.png    # lockup horizontal (nav)
├── Sk-Modernist-Regular.otf
└── Sk-Modernist-Bold.otf
```

## Características

- **Modo claro / oscuro** con toggle, persistencia en `localStorage` y anti-flash.
- **Logo lockup** en la nav (se invierte automáticamente en dark mode).
- **Marquee** de tiles abstractos con parallax suave.
- **Animaciones** tipo "premium agency": mask reveals, stagger, easing cuidado.
- Respeta `prefers-reduced-motion`.
- 100% responsive.

## Desarrollo en local

No requiere dependencias. Abrir directamente:

```bash
open index.html
```

O servirlo (recomendado, para que las rutas y fuentes carguen igual que en prod):

```bash
npx serve .
```

## Despliegue en Vercel

1. Subir este repo a GitHub.
2. En [vercel.com → New Project](https://vercel.com/new), importar el repo.
3. Framework Preset: **Other** (es HTML estático, sin build).
   - Build Command: *(vacío)*
   - Output Directory: `.` (raíz)
4. Deploy. Vercel detecta el HTML estático automáticamente.

Cada `git push` a `main` desplegará en producción.
