# Arquitectura del Módulo 2

## Decisiones de diseño

### Por qué `interface` para las entidades
Las entidades `Estudiante` y `Asignatura` usan `interface` porque representan
contratos estructurales de objetos del dominio. Si en el futuro necesitamos
extender `Estudiante` con nuevas propiedades, la interface permite hacerlo
sin romper el código existente.

### Por qué `type` para `EstadoMatricula`
`EstadoMatricula` es una unión de tres interfaces, no un objeto en sí mismo.
Los `type aliases` son la herramienta adecuada para expresar uniones.

### Unión discriminada
En lugar de una sola interfaz con propiedades opcionales ambiguas, cada estado
tiene su propio contrato. Esto elimina comprobaciones defensivas en runtime
(ej. `if (estado.asignaturas !== undefined)`) porque TypeScript garantiza en
compilación que `asignaturas` solo existe cuando `tipo === "ACTIVA"`.

### Análisis exhaustivo con `never`
El bloque `default` del switch en `generarReporte` usa el tipo `never` para
forzar un error de compilación si se añade un nuevo estado a la unión sin
actualizar la función. Esto es especialmente valioso en equipos grandes o
cuando el código evoluciona con el tiempo.

### Genéricos en `RespuestaAPI<T>` y `obtenerRecurso<T>`
En lugar de repetir la misma estructura de respuesta para cada tipo de datos,
un único genérico parametriza el payload. TypeScript infiere automáticamente
el tipo de `datos` según el contexto — no se pierde información de tipos en
ningún momento.