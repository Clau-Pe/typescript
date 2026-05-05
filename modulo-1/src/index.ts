import { calcularMedia, calcularMediana, filtrarAtipicos } from "./math-utils.js";

// Datos de prueba: temperaturas diarias en grados
const temperaturas: number[] = [22, 24, 19, 100, 21, 23, 18, 97, 25, 20];

console.log("=== Análisis estadístico ===");
console.log("Datos originales:", temperaturas);

const media = calcularMedia(temperaturas);
console.log("Media:", media);

const mediana = calcularMediana(temperaturas);
console.log("Mediana:", mediana);

// Filtramos valores que se alejan más de 15 grados de la media
const sinAtipicos = filtrarAtipicos(temperaturas, 15);
console.log("Sin atípicos (límite 15):", sinAtipicos);

// Caso límite: array vacío
const arrayVacio: number[] = [];
console.log("\n=== Caso límite: array vacío ===");
console.log("Media:", calcularMedia(arrayVacio));       // null
console.log("Mediana:", calcularMediana(arrayVacio));   // null
console.log("Sin atípicos:", filtrarAtipicos(arrayVacio, 10)); // []

// @ts-expect-error — esto es intencionalmente incorrecto para ver el error
calcularMedia("esto no es un array");