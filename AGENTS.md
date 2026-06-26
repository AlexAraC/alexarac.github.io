# AGENT.md

## Proyecto
Esta es una muy pequeña pagina web que se basa en 3 documentos basicos, la intencion es mostrar un perfil de un desarrollador de software

Se utiliza html, css y javascript

---

## Objetivos

- Desarrollar la pagina en base a las instrucciones dadas
- Mantener código limpio.
- Priorizar simplicidad.
- Evitar dependencias innecesarias.
- Etiquetar bien sin ser exesivo.


---

## Tecnologías
- HTML
- JavaScript
- CSS
---

## Convenciones de Código

### Nombres
- Variables y funciones: camelCase
- Componentes React: PascalCase
- Constantes: UPPER_SNAKE_CASE

### Archivos
- Un componente por archivo.
- Carpetas organizadas por funcionalidad.

---

## Reglas

### Siempre
- Comentar código complejo.
- Reutilizar componentes existentes.
- Mantener consistencia con el estilo actual.

### Nunca
- Instalar paquetes sin preguntar.
- Modificar variables de entorno.
- Eliminar código sin explicación.

---

## Estructura del Proyecto

alexarac.github.io/
├── Pics/
│   ├── Img_Together.jpeg
│   ├── me.jpg
│   ├── paisaje.png
│   ├── silence.png
│   └── together_at_the_city.png
├── AGENTS.md
├── index.html
├── script.js
└── style.css
---

## Flujo de Trabajo

1. Analizar el problema.
2. Proponer solución.
3. Implementar cambios mínimos.
4. Explicar los cambios realizados.

---

## Ejemplos

### Correcto


```js
const obtenerUsuario = async () => {
  const response = await fetch(url);
  return response.json();
};
```

### Incorrecto

```js
function a() {
  // código ambiguo
}
```

---

## Instrucciones Especiales

- Codigo va a ir en ingles.
- Responder siempre en español.
- Explicar errores antes de corregirlos.
- Mostrar archivos modificados al finalizar.
- Nunca hagas mas de lo estrictamente solicitado