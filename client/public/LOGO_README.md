# Logo de AnimeZone

## Descripción
El logo de AnimeZone presenta un diseño completamente moderno y elegante con un icono central geométrico que combina elementos visuales contemporáneos con una paleta de colores vibrante y atractiva. El nuevo diseño es minimalista pero sofisticado, perfecto para una plataforma de streaming moderna.

## Archivos del Logo

### 1. `logo.svg` - Logo completo
- **Tamaño**: 200x60px
- **Uso**: Header principal, documentos oficiales
- **Características**: Logo completo con texto "AnimeZone" y icono moderno
- **Diseño**: Forma geométrica moderna con gradientes vibrantes

### 2. `logo-simple.svg` - Logo simplificado
- **Tamaño**: 40x40px
- **Uso**: Favicon, iconos pequeños, aplicaciones móviles
- **Características**: Solo el icono sin texto, diseño moderno
- **Diseño**: Mismo nivel de detalle que el logo completo

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

### Gradiente Principal Moderno
- **Inicio**: #667eea (indigo-500)
- **25%**: #764ba2 (purple-600)
- **50%**: #f093fb (pink-400)
- **75%**: #f5576c (red-400)
- **Final**: #4facfe (blue-400)

### Colores de Texto
- **Gradiente**: from-white via-gray-100 to-gray-300
- **Fondo**: transparente (usa bg-clip-text)
- **Efecto**: drop-shadow para mejor legibilidad

## Elementos Visuales Modernos

### Icono Central Geométrico
- **Forma principal**: Diseño geométrico moderno con bordes redondeados
- **Círculo central**: Gradiente blanco con sombras sutiles
- **Elementos decorativos**: 4 puntos en las esquinas con diferentes colores
- **Líneas decorativas**: Gradientes que se extienden desde el centro
- **Punto central**: Foco visual con gradiente rosa a púrpura

### Efectos Visuales Avanzados
- **Sombras modernas**: Drop-shadow suave para profundidad
- **Gradientes múltiples**: Capas de color para riqueza visual
- **Brillos**: Efectos de luz en bordes y elementos
- **Animaciones**: Efectos hover y partículas flotantes

### Paleta de Colores
- **Azul**: #667eea, #4facfe
- **Púrpura**: #764ba2
- **Rosa**: #f093fb, #f5576c
- **Blanco**: Gradientes para efectos de luz

## Uso en la Aplicación

### Navbar
El logo se muestra en el navbar principal con tamaño medio y texto, con efectos hover modernos.

### Página de Inicio
El HeroLogo se usa para crear impacto visual en la landing page con animaciones y efectos de partículas.

### Favicon
El logo simplificado se usa como favicon del sitio con el mismo nivel de detalle.

## Personalización

Para cambiar los colores del logo, modifica las clases de Tailwind CSS en los componentes:

```tsx
// Cambiar gradiente principal
className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"

// Cambiar color de texto
className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 bg-clip-text text-transparent"

// Cambiar colores de elementos decorativos
className="bg-gradient-to-br from-green-400 to-blue-500" // Para punto central verde
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

## Nuevo Diseño Implementado

### Características Modernas
- ✅ Diseño geométrico contemporáneo
- ✅ Paleta de colores vibrante y moderna
- ✅ Efectos de profundidad con sombras
- ✅ Elementos decorativos distribuidos
- ✅ Gradientes múltiples para riqueza visual

### Efectos Visuales
- ✅ Sombras drop-shadow en elementos principales
- ✅ Efectos de partículas animadas
- ✅ Gradientes de luz en bordes
- ✅ Animaciones escalonadas
- ✅ Efectos hover mejorados

### Calidad Visual
- ✅ Mayor contraste y legibilidad
- ✅ Profundidad visual mejorada
- ✅ Consistencia en todos los tamaños
- ✅ Efectos de luz modernos
- ✅ Diseño minimalista pero sofisticado
