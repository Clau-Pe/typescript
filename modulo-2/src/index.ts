import { generarReporte } from "./domain/reporte.js";
import {
  obtenerEstudiantes,
  obtenerEstudiantePorId,
  obtenerAsignaturas,
} from "./services/api-client.js";
import type { EstadoMatricula, Asignatura } from "./domain/types/index.js";

async function main() {
  console.log("=== Servicio de API ===\n");

  const respuestaEstudiantes = await obtenerEstudiantes();
  console.log("Estudiantes:", respuestaEstudiantes.datos.map((e) => e.nombre));

  const respuestaUno = await obtenerEstudiantePorId("EST-001");
  console.log("Estudiante EST-001:", respuestaUno.datos?.nombre);

  const respuestaInexistente = await obtenerEstudiantePorId("EST-999");
  console.log("Errores:", respuestaInexistente.errores);

  console.log("\n=== Reportes de matrícula ===\n");

  const asignaturas = (await obtenerAsignaturas()).datos;

  const casos: EstadoMatricula[] = [
    {
      tipo: "ACTIVA",
      asignaturas: asignaturas,
    },
    {
      tipo: "SUSPENDIDA",
      motivo: "Impago de tasas académicas",
      fechaSuspension: new Date("2024-11-15"),
    },
    {
      tipo: "FINALIZADA",
      notaMedia: 7.85,
      fechaFinalizacion: new Date("2025-06-30"),
    },
  ];

  for (const caso of casos) {
    console.log(generarReporte(caso));
  }
}

main();