import type { Estudiante, Asignatura, RespuestaAPI } from "../domain/types/index.js";

// Simulamos una base de datos en memoria
const estudiantesDB: Estudiante[] = [
  {
    id: "EST-001",
    nombre: "Ana",
    apellidos: "García López",
    email: "ana@universidad.es",
    fechaIngreso: new Date("2022-09-01"),
    curso: 3,
  },
  {
    id: "EST-002",
    nombre: "Carlos",
    apellidos: "Martínez Ruiz",
    email: "carlos@universidad.es",
    fechaIngreso: new Date("2023-09-01"),
    curso: 2,
  },
];

const asignaturasDB: Asignatura[] = [
  { codigo: "MAT-101", nombre: "Matemáticas I", creditos: 6, profesor: "Dr. Pérez", cuatrimestre: 1 },
  { codigo: "PRG-201", nombre: "Programación Web", creditos: 9, profesor: "Dra. Sánchez", cuatrimestre: 2 },
];

// Función de retardo para simular latencia de red
function simularLatencia(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Método genérico principal — T es el tipo de datos que devolverá
async function obtenerRecurso<T>(
  endpoint: string,
  datos: T
): Promise<RespuestaAPI<T>> {
  await simularLatencia(300);

  console.log(`[API] GET ${endpoint}`);

  return {
    codigoEstado: 200,
    exito: true,
    datos,
  };
}

// Métodos concretos que usan obtenerRecurso internamente
export async function obtenerEstudiantes(): Promise<RespuestaAPI<Estudiante[]>> {
  return obtenerRecurso("/estudiantes", estudiantesDB);
}

export async function obtenerEstudiantePorId(
  id: string
): Promise<RespuestaAPI<Estudiante | null>> {
  const estudiante = estudiantesDB.find((e) => e.id === id) ?? null;

  if (!estudiante) {
    return {
      codigoEstado: 404,
      exito: false,
      datos: null,
      errores: [`No se encontró estudiante con id: ${id}`],
    };
  }

  return obtenerRecurso(`/estudiantes/${id}`, estudiante);
}

export async function obtenerAsignaturas(): Promise<RespuestaAPI<Asignatura[]>> {
  return obtenerRecurso("/asignaturas", asignaturasDB);
}