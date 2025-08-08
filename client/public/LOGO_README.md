# Logo de AnimeZone

## Descripción
El logo de AnimeZone combina elementos visuales del anime (ojo realista detallado) con símbolos de streaming (ondas) para crear una identidad visual única y memorable. El nuevo diseño incluye un ojo de anime mucho más realista con múltiples capas de profundidad, reflejos realistas y pestañas detalladas.

## Archivos del Logo

### 1. `logo.svg` - Logo completo
- **Tamaño**: 200x60px
- **Uso**: Header principal, documentos oficiales
- **Características**: Logo completo con texto "AnimeZone" y ojo realista
- **Mejoras**: Ojo con iris, pupila, múltiples reflejos, pestañas y efectos de sombra

### 2. `logo-simple.svg` - Logo simplificado
- **Tamaño**: 40x40px
- **Uso**: Favicon, iconos pequeños, aplicaciones móviles
- **Características**: Solo el icono sin texto, con detalles realistas
- **Mejoras**: Mismo nivel de detalle que el logo completo

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

### Gradiente Principal Mejorado
- **Inicio**: #ff6b6b (red-400)
- **25%**: #ee5a52 (red-500)
- **50%**: #dc2626 (red-600)
- **75%**: #b91c1c (red-700)
- **Final**: #991b1b (red-800)

### Colores de Texto
- **Gradiente**: from-white via-gray-100 to-gray-300
- **Fondo**: transparente (usa bg-clip-text)
- **Efecto**: drop-shadow para mejor legibilidad

## Elementos Visuales Mejorados

### Ojo de Anime Realista
- **Sombra interna**: Gradiente sutil para profundidad
- **Ojo principal**: Gradiente blanco a gris claro
- **Iris**: Gradiente gris oscuro con profundidad
- **Pupila**: Gradiente negro profundo
- **Reflejos múltiples**: 4 reflejos de diferentes tamaños y opacidades
- **Pestañas**: Superiores e inferiores con diferentes opacidades

### Ondas de Streaming Mejoradas
- **Tres capas**: Diferentes grosores y opacidades
- **Animación**: Efecto pulse con delays escalonados
- **Profundidad**: Múltiples ondas para efecto 3D

### Efectos Visuales
- **Sombras**: Drop-shadow en elementos principales
- **Brillos**: Gradientes de luz en bordes
- **Partículas**: Efectos de partículas animadas
- **Hover**: Efectos de escala y sombra al pasar el mouse

## Uso en la Aplicación

### Navbar
El logo se muestra en el navbar principal con tamaño medio y texto, con efectos hover mejorados.

### Página de Inicio
El HeroLogo se usa para crear impacto visual en la landing page con animaciones y efectos de partículas.

### Favicon
El logo simplificado se usa como favicon del sitio con el mismo nivel de detalle.

## Personalización

Para cambiar los colores del logo, modifica las clases de Tailwind CSS en los componentes:

```tsx
// Cambiar gradiente principal
className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"

// Cambiar color de texto
className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 bg-clip-text text-transparent"

// Cambiar colores del ojo
className="bg-gradient-to-br from-green-600 via-green-700 to-green-800" // Para iris verde
```

## Formatos Soportados

- **SVG**: Vectorial, escalable sin pérdida de calidad
- **React Components**: Integración nativa con React
- **Tailwind CSS**: Estilos consistentes con el diseño
- **Animaciones**: CSS animations y transitions

## Responsive Design

El logo se adapta automáticamente a diferentes tamaños de pantalla:
- **Mobile**: Logo pequeño sin texto, manteniendo detalles
- **Tablet**: Logo mediano con texto
- **Desktop**: Logo completo con texto y efectos hover avanzados

## Mejoras Implementadas

### Detalles Realistas
- ✅ Múltiples capas de profundidad en el ojo
- ✅ Reflejos realistas con diferentes opacidades
- ✅ Pestañas superiores e inferiores
- ✅ Gradientes mejorados para iris y pupila
- ✅ Efectos de sombra y brillo

### Efectos Visuales
- ✅ Sombras drop-shadow en elementos principales
- ✅ Efectos de partículas animadas
- ✅ Gradientes de luz en bordes
- ✅ Animaciones escalonadas en ondas
- ✅ Efectos hover mejorados

### Calidad Visual
- ✅ Mayor contraste y legibilidad
- ✅ Profundidad visual mejorada
- ✅ Consistencia en todos los tamaños
- ✅ Efectos de luz realistas
