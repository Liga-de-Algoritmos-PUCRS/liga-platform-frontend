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
