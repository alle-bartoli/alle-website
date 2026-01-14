import "@fontsource-variable/jetbrains-mono"
import "../styles/globals.css"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * @dev Root layout component wrapping all pages.
 */
export function Layout({ children }: { children: ReactNode }) {
   return (
      <div
         className={cn(
            "bg-zinc-900 text-zinc-100 selection:bg-slate-500 selection:text-white",
            "flex flex-col min-h-dvh",
         )}
         style={{ fontFamily: '"JetBrains Mono Variable", monospace' }}
      >
         <div
            className={cn(
               "mx-auto flex-1 flex flex-col justify-center",
               "max-w-[1000px]",
               "p-8 sm:p-10 md:p-16 lg:p-20",
               "text-sm sm:text-base md:text-lg lg:text-xl",
               "prose prose-invert",
            )}
         >
            <div
               className="absolute inset-0 pointer-events-none"
               style={{
                  background: "radial-gradient(circle at top, rgba(255,255,255,0.15) 0%, transparent 70%)",
               }}
            />
            <main>{children}</main>
            <footer className="text-center text-xs sm:text-sm md:text-base pt-10 mt-auto opacity-60">
               &copy; {new Date().getFullYear()}, Alessandro Bartoli
            </footer>
         </div>
      </div>
   )
}
