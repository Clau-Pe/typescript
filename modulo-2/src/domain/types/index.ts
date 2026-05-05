// --- Entidades del dominio ---

export interface Estudiante {
  readonly id: string;
  nombre: string;
  apellidos: string;
  email: string;
  fechaIngreso: Date;
  curso: number;
}

export interface Asignatura {
  readonly codigo: string;
  nombre: string;
  creditos: number;
  profesor: string;
  cuatrimestre: 1 | 2; // Solo puede ser 1 o 2, no cualquier número
}

// --- Unión discriminada de estados de matrícula ---

export interface MatriculaActiva {
  tipo: "ACTIVA";
  asignaturas: Asignatura[];
}

export interface MatriculaSuspendida {
  tipo: "SUSPENDIDA";
  motivo: string;
  fechaSuspension: Date;
}

export interface MatriculaFinalizada {
  tipo: "FINALIZADA";
  notaMedia: number;
  fechaFinalizacion: Date;
}

export type EstadoMatricula =
  | MatriculaActiva
  | MatriculaSuspendida
  | MatriculaFinalizada;

// --- Interfaz genérica para respuestas de API ---

export interface RespuestaAPI<T> {
  codigoEstado: number;
  exito: boolean;
  datos: T;
  errores?: string[];
}