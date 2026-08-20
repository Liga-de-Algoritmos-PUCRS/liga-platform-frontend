import { isAxiosError } from "axios"

const OTP_FAILURES_BEFORE_HINT = 3

/**
 * Descricao do toast de codigo invalido. O back responde a mesma mensagem para
 * codigo errado, expirado, revogado ou tentativas esgotadas (de proposito, para
 * nao vazar o motivo), entao o front conta as falhas localmente e, a partir da
 * terceira, sugere pedir um codigo novo — que e o unico caminho depois das 5
 * tentativas que o back permite por token.
 */
export function otpErrorDescription(failures: number) {
  return failures >= OTP_FAILURES_BEFORE_HINT
    ? "Confira o código recebido ou peça um novo — após algumas tentativas o código deixa de valer."
    : "Tente novamente."
}

/**
 * O back chegou a julgar o codigo, ou o pedido nem chegou la? Rede caida, 5xx e
 * o 429 do ThrottlerGuard nao dizem nada sobre o que foi digitado — contar isso
 * como codigo errado faz o front acusar "Codigo invalido", limpar o campo e
 * sugerir pedir um novo por causa de uma queda de ligacao, alem de descolar a
 * contagem local das 5 tentativas que o back registra no token.
 */
export function isCodeRejection(error: unknown): boolean {
  if (!isAxiosError(error)) return false
  const status = error.response?.status
  if (status === undefined || status === 429 || status >= 500) return false
  return true
}
