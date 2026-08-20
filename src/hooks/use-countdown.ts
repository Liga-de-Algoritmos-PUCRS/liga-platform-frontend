import { useEffect, useState } from "react"

export function useCountdown(targetTimestamp: number | null) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!targetTimestamp) return
    const tick = () => setNow(Date.now())
    // `now` foi capturado no mount do componente, entao ja esta velho quando um
    // alvo novo chega (o modal de recuperacao, por exemplo, fica montado desde
    // que a tela de login carregou). Sem este primeiro tick o contador exibe a
    // janela somada ao tempo parado — "15:01" em vez de "15:00" — ate o
    // setInterval corrigir 1s depois. O setTimeout(0) e o que mantem o setState
    // fora do corpo do efeito, que a regra set-state-in-effect proibe.
    const firstTick = setTimeout(tick, 0)
    const interval = setInterval(tick, 1000)
    return () => {
      clearTimeout(firstTick)
      clearInterval(interval)
    }
  }, [targetTimestamp])

  if (!targetTimestamp) return 0
  return Math.max(0, Math.ceil((targetTimestamp - now) / 1000))
}

export function formatCountdown(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}
