import {
  PublicUserResponseDTOCourseEnum,
  PublicUserResponseDTOSemesterEnum,
} from "@/api/sdk";

/**
 * Rótulos dos enums de curso e semestre do back. Perfil, admin, ranking e
 * integrantes mostram os mesmos valores e cada tela mantinha a própria cópia
 * do mapa — os textos já divergiam entre elas ("Formado" x "Graduado",
 * "Engenharia de Computação" x "Engenharia da Computação").
 *
 * As versões `SHORT` são para onde não cabe o nome por extenso (badge do modal
 * e célula de tabela); o resto usa o rótulo completo.
 */

type Course = PublicUserResponseDTOCourseEnum;
type Semester = PublicUserResponseDTOSemesterEnum;

export const COURSE_LABELS: Record<Course, string> = {
  SOFTWARE_ENGINEERING: "Engenharia de Software",
  DATA_SCIENCE: "Ciência de Dados",
  COMPUTING_SCIENCE: "Ciência da Computação",
  INFORMATION_SYSTEMS: "Sistemas de Informação",
  COMPUTING_ENGINEERING: "Engenharia de Computação",
};

export const COURSE_SHORT_LABELS: Record<Course, string> = {
  SOFTWARE_ENGINEERING: "Eng. de Software",
  DATA_SCIENCE: "Ciência de Dados",
  COMPUTING_SCIENCE: "Ciência da Comp.",
  INFORMATION_SYSTEMS: "Sist. Informação",
  COMPUTING_ENGINEERING: "Eng. de Computação",
};

export const SEMESTER_LABELS: Record<Semester, string> = {
  FIRST: "1º Semestre",
  SECOND: "2º Semestre",
  THIRD: "3º Semestre",
  FOURTH: "4º Semestre",
  FIFTH: "5º Semestre",
  SIXTH: "6º Semestre",
  SEVENTH: "7º Semestre",
  EIGHTH: "8º Semestre",
  NINTH: "9º Semestre",
  TENTH: "10º Semestre",
  GRADUATED: "Formado",
};

export const SEMESTER_SHORT_LABELS: Record<Semester, string> = {
  FIRST: "1º Sem",
  SECOND: "2º Sem",
  THIRD: "3º Sem",
  FOURTH: "4º Sem",
  FIFTH: "5º Sem",
  SIXTH: "6º Sem",
  SEVENTH: "7º Sem",
  EIGHTH: "8º Sem",
  NINTH: "9º Sem",
  TENTH: "10º Sem",
  GRADUATED: "Formado",
};

/** Opções dos selects de edição, na ordem em que os rótulos são declarados. */
export const COURSE_OPTIONS = Object.entries(COURSE_LABELS).map(([value, label]) => ({
  value,
  label,
}));

export const SEMESTER_OPTIONS = Object.entries(SEMESTER_LABELS).map(([value, label]) => ({
  value,
  label,
}));
