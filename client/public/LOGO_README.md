# Logo de AnimeZone

## Descripción
El logo de AnimeZone combina elementos visuales del anime (ojo estilizado) con símbolos de streaming (ondas) para crear una identidad visual única y memorable.

## Archivos del Logo

### 1. `logo.svg` - Logo completo
- **Tamaño**: 200x60px
- **Uso**: Header principal, documentos oficiales
- **Características**: Logo completo con texto "AnimeZone"

### 2. `logo-simple.svg` - Logo simplificado
- **Tamaño**: 40x40px
- **Uso**: Favicon, iconos pequeños, aplicaciones móviles
- **Características**: Solo el icono sin texto

## Componentes React

### Logo.tsx
Componente reutilizable para mostrar el logo en diferentes tamaños:

```tsx
import Logo from './components/Logo';

// Uso básico
<Logo />

// Con opciones
<Logo size="large" showText={false} className="custom-class" />
```

**Props:**
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `showText`: boolean (default: true)
- `className`: string (para estilos adicionales)

### HeroLogo.tsx
Componente para mostrar el logo de manera destacada en la página de inicio:

```tsx
import HeroLogo from './components/HeroLogo';

<HeroLogo />
```

## Colores del Logo

### Gradiente Principal
- **Inicio**: #ef4444 (red-500)
- **Medio**: #dc2626 (red-600)
- **Final**: #b91c1c (red-700)

### Colores de Texto
- **Gradiente**: from-white to-gray-300
- **Fondo**: transparente (usa bg-clip-text)

## Elementos Visuales

### Ojo de Anime
- Representa la temática del anime
- Diseño estilizado y moderno
- Colores: blanco, gris oscuro, con reflejo

### Ondas de Streaming
- Símbolo de transmisión en vivo
- Animación suave
- Múltiples capas para profundidad

## Uso en la Aplicación

### Navbar
El logo se muestra en el navbar principal con tamaño medio y texto.

### Página de Inicio
El HeroLogo se usa para crear impacto visual en la landing page.

### Favicon
El logo simplificado se usa como favicon del sitio.

## Personalización

Para cambiar los colores del logo, modifica las clases de Tailwind CSS en los componentes:

```tsx
// Cambiar gradiente
className="bg-gradient-to-br from-blue-500 to-blue-600"

// Cambiar color de texto
className="bg-gradient-to-r from-blue-100 to-blue-200 bg-clip-text text-transparent"
```

## Formatos Soportados

- **SVG**: Vectorial, escalable sin pérdida de calidad
- **React Components**: Integración nativa con React
- **Tailwind CSS**: Estilos consistentes con el diseño

## Responsive Design

El logo se adapta automáticamente a diferentes tamaños de pantalla:
- **Mobile**: Logo pequeño sin texto
- **Tablet**: Logo mediano con texto
- **Desktop**: Logo completo con texto y efectos hover
