/**
 * Regras da corrida de pontuação do problema, num lugar só.
 *
 * O `points` do problema é o valor **corrente**: quanto o próximo aluno a
 * resolver leva. Ele cai `decrement` a cada aluno distinto que resolve, com
 * piso em `floorPoints` e teto em `initialPoints`.
 *
 * Os formulários de criação e de edição do admin precisam exatamente da mesma
 * validação, e o repo já teve o problema de cópias divergentes da mesma regra
 * espalhadas pelas telas — por isso ela nasce com um dono só.
 *
 * As regras espelham o back: `@IsInt() @Min(0)` em cada campo do DTO e
 * `floorPoints <= initialPoints` conferido no service (400 na criação e na
 * edição). O `decrement` não é comparado com nada, e `0` é válido tanto no
 * piso quanto no decremento.
 */

export const DEFAULT_INITIAL_POINTS = 100;
export const DEFAULT_FLOOR_POINTS = 70;
export const DEFAULT_DECREMENT = 5;

export interface ScoringValues {
  initialPoints: number;
  floorPoints: number;
  decrement: number;
}

export type ScoringErrors = Partial<Record<keyof ScoringValues, string>>;

const FIELD_LABELS: Record<keyof ScoringValues, string> = {
  initialPoints: "O valor inicial",
  floorPoints: "O piso",
  decrement: "O decremento",
};

/**
 * Devolve as mensagens de erro por campo. Objeto vazio = configuração válida.
 */
export function validateScoring(values: ScoringValues): ScoringErrors {
  const errors: ScoringErrors = {};

  (Object.keys(FIELD_LABELS) as (keyof ScoringValues)[]).forEach((field) => {
    const value = values[field];
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      errors[field] = `${FIELD_LABELS[field]} tem de ser um número inteiro.`;
      return;
    }
    if (value < 0) {
      errors[field] = `${FIELD_LABELS[field]} não pode ser negativo.`;
    }
  });

  if (!errors.floorPoints && !errors.initialPoints && values.floorPoints > values.initialPoints) {
    errors.floorPoints = "O piso não pode ser maior que o valor inicial.";
  }

  return errors;
}

export function hasScoringErrors(errors: ScoringErrors): boolean {
  return Object.keys(errors).length > 0;
}

/** Texto do `?` na tela do problema e do hover do valor corrente no card. */
export const CURRENT_VALUE_HINT =
  "Este é o valor de agora: o próximo aluno a resolver leva esses pontos, e o problema vale menos a cada aluno que resolve.";
