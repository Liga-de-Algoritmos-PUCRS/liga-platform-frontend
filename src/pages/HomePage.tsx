import { useIsDark } from "@/hooks/is-dark"

const baseClasses =
  "min-w-screen min-h-screen flex items-center justify-center transition-colors"

export function HomePage() {
  const isDark = useIsDark()

  const themeClass = isDark
    ? "bg-zinc-900 text-white"
    : "bg-white text-black"

  return (
    <div className={`${baseClasses} ${themeClass}`}>
      Teste
    </div>
  )
}