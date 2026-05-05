import type { EstadoMatricula } from "./types/index.js";

export function generarReporte(estado: EstadoMatricula): string {
  switch (estado.tipo) {
    case "ACTIVA":
      return (
        `Matrícula ACTIVA — ` +
        `${estado.asignaturas.length} asignaturas: ` +
        estado.asignaturas.map((a) => a.nombre).join(", ")
      );

    case "SUSPENDIDA":
        console.log(estado.asignaturas);
      return (
        `Matrícula SUSPENDIDA — ` +
        `Motivo: ${estado.motivo}. ` +
        `Desde: ${estado.fechaSuspension.toLocaleDateString("es-ES")}`
      );

    case "FINALIZADA":
      return (
        `Matrícula FINALIZADA — ` +
        `Nota media: ${estado.notaMedia.toFixed(2)}. ` +
        `Fecha: ${estado.fechaFinalizacion.toLocaleDateString("es-ES")}`
      );

    default:
      // Análisis exhaustivo: si añades un nuevo estado y olvidas el case,
      // el compilador dará error aquí antes de que llegues a producción.
      const _exhaustivo: never = estado;
      throw new Error(`Estado no manejado: ${JSON.stringify(_exhaustivo)}`);
  }
}