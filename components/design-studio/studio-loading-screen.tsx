function Block({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-neutral-100 ${className ?? ""}`} />;
}

/**
 * Loading placeholder shown while the Fabric.js editor chunk (code-split via
 * next/dynamic) downloads and initializes. Mirrors the real studio's chrome
 * — toolbar, left rail + panel, canvas, right sidebar — so the layout
 * doesn't jump once the real thing mounts.
 */
export function StudioLoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-[#E5E5E5] px-4">
        <Block className="h-8 w-8" />
        <Block className="h-4 w-32" />
        <div className="mx-auto flex items-center gap-2">
          <Block className="h-8 w-8" />
          <Block className="h-8 w-8" />
          <Block className="h-8 w-24" />
        </div>
        <Block className="h-9 w-32 rounded-full" />
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="hidden w-[76px] shrink-0 flex-col items-center gap-3 border-r border-[#E5E5E5] py-4 lg:flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Block key={i} className="h-12 w-14" />
          ))}
        </div>

        <div className="flex flex-1 items-center justify-center bg-[#F0F0EE] p-10">
          <Block className="aspect-square h-full max-h-[70vh] w-auto rounded-2xl" />
        </div>

        <div className="hidden w-[300px] shrink-0 flex-col gap-4 border-l border-[#E5E5E5] p-4 lg:flex">
          <Block className="h-4 w-20" />
          <Block className="h-24 w-full" />
          <Block className="h-4 w-16" />
          <Block className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
