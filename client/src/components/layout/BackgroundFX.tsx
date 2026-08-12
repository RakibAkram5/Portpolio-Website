export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="absolute -top-40 left-1/4 h-[560px] w-[560px] rounded-full bg-accent/10 blur-[140px]" />
      <div className="absolute top-[40%] right-0 h-[420px] w-[420px] rounded-full bg-violet/10 blur-[130px]" />
      <div className="absolute inset-0 noise opacity-40" />
    </div>
  )
}
