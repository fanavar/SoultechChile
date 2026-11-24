<div align="center">

# ⚡ Soultech Chile

**Sitio web comercial de un servicio técnico de notebooks, conectado a un bot de WhatsApp con IA.**

[![Sitio en vivo](https://img.shields.io/badge/Sitio_en_vivo-soultech.cl-F2EB5B?style=for-the-badge&labelColor=0B0D1A)](https://soultech.cl)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?logo=githubpages&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare_DNS-F38020?logo=cloudflare&logoColor=white)

<img src="docs/capturas/01-hero.png" alt="Portada de soultech.cl" width="100%">

</div>

## El proyecto

Soultech Chile es un servicio técnico de San Pedro de la Paz (Biobío, Chile). El sitio convierte una visita en una conversación de WhatsApp con contexto: cada botón envía un mensaje prellenado con el servicio, el plan o los datos del equipo, y un bot con IA continúa la atención.

```mermaid
flowchart LR
  A[Visita en soultech.cl] --> B[Elige problema, plan o formulario]
  B --> C[WhatsApp con mensaje prellenado]
  C --> D[Bot con IA cotiza y califica]
  D --> E[Aviso con resumen del cliente]
  E --> F[Cierre con una persona]
```

## Funcionalidades

| | |
|---|---|
| **Selector de problema** | Seis casos frecuentes, cada uno con su propio mensaje |
| **Configurador de planes** | Suma SSD y RAM, muestra el total y el pago 60/40 al instante |
| **Lista de precios** | Servicios con valores publicados y acceso directo a cotizar |
| **Cotizador** | Valida equipo, necesidad y comuna antes de abrir WhatsApp |
| **Diseño responsive** | Barra de acción fija en móvil y botón flotante en escritorio |
| **SEO local** | Datos estructurados schema.org, Open Graph y URL canónica |

## Capturas

### Diagnóstico guiado
<img src="docs/capturas/02-diagnostico.png" alt="Selector de problema del equipo" width="100%">

### Configurador con total en tiempo real
<img src="docs/capturas/03-configurador.png" alt="Configurador de SSD y RAM con total" width="100%">

### Lista de precios
<img src="docs/capturas/04-precios.png" alt="Lista de precios de servicios" width="100%">

### Cotizador
<img src="docs/capturas/05-cotizador.png" alt="Formulario de cotización" width="100%">

### Versión móvil
<img src="docs/capturas/06-movil.png" alt="Portada, configurador y precios en móvil" width="100%">

## Decisiones técnicas

- **Sin frameworks ni proceso de compilación:** HTML, CSS y JavaScript puros.
- **Content Security Policy estricta:** sin scripts ni estilos incrustados en la página principal.
- **Datos mínimos:** el formulario no guarda información; solo arma el mensaje que el usuario decide enviar.
- **Dominio protegido:** SPF, DMARC, MX nulo y CAA para evitar suplantación y certificados no autorizados.
- **Accesibilidad:** respeta `prefers-reduced-motion` y usa etiquetas en los campos del formulario.

## Estructura

```text
├── index.html      Página principal
├── styles.css      Estilos
├── app.js          Configurador, cotizador y enlaces a WhatsApp
├── privacidad/     Política de privacidad
└── docs/capturas/  Imágenes de este README
```

## Ejecutar en local

```bash
git clone https://github.com/fanavar/SoultechChile.git
cd SoultechChile
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Autor

**Fabián Navarro** · [GitHub](https://github.com/fanavar) · [LinkedIn](https://www.linkedin.com/in/fabi%C3%A1n-navarro-5745b8227/)

<sub>© 2026 Soultech Chile. La marca, el logo y los contenidos pertenecen a Soultech Chile.</sub>
