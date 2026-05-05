// Calculamos la media aritmética de un array de números.
// Devuelve null si el array está vacío porque no hay valor válido que retornar.
export function calcularMedia(datos: number[]): number | null {
  if (datos.length === 0) return null;

  const suma = datos.reduce((acumulado, valor) => acumulado + valor, 0);
  return suma / datos.length;
}

// Calculamos la mediana: el valor central tras ordenar el array.
// Si tiene un número par de elementos, promediamos los dos centrales.
export function calcularMediana(datos: number[]): number | null {
  if (datos.length === 0) return null;

  const ordenados = [...datos].sort((a, b) => a - b);
  const mitad = Math.floor(ordenados.length / 2);

  if (ordenados.length % 2 === 0) {
    // Par: promedio de los dos elementos centrales
    return (ordenados[mitad - 1] + ordenados[mitad]) / 2;
  } else {
    // Impar: el elemento central exacto
    return ordenados[mitad];
  }
}

// Filtramos valores que se alejan más de 'limite' unidades respecto a la media.
// Si no hay media (array vacío), devolvemos el array tal cual.
export function filtrarAtipicos(datos: number[], limite: number): number[] {
  const media = calcularMedia(datos);

  if (media === null) return datos;

  return datos.filter((valor) => Math.abs(valor - media) <= limite);
}