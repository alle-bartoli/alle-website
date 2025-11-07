import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { cn } from "@/utils"
import "./globals.css"

// Configure font
const jbMono = JetBrains_Mono({ subsets: ["latin"] })

// Home page metadata
export const metadata: Metadata = {
   applicationName: "Alessandro Bartoli personal website",
   title: {
      default: "Alessandro Bartoli | Dev",
      template: "%s | Alessandro Bartoli",
   },
   description: "Alessandro Bartoli personal website.",
   keywords: [
      "Sviluppatori italiani",
      "Software",
      "Software Modena",
      "Development",
      "Sviluppo software",
      "Typescript",
      "Javascript",
      "Rust",
      "Delphi",
      "Cloud architecture",
      "Developer architect",
      "Software engineering",
      "Full Stack developer",
      "Frontend developer",
      "Backend developer",
      "Blockchain",
      "Web3",
   ],
   authors: [{ name: "Alessandro Bartoli", url: "https://alessandrobartoli.dev" }],
   creator: "Alessandro Bartoli",
   openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://www.alessandrobartoli.dev",
      siteName: "Alessandro Bartoli personal website",
      //images: [
      // {
      //  url: "/path/to/default-og-image.jpg", // TODO: Replace with your image path.
      // width: 800,
      // height: 600,
      // alt: "Alessandro Bartoli",
      // },
      //],
   },
}

/**
 * Root Layout.
 *
 * @param {React.ReactNode} [props.children]
 * @returns {React.JSX.Element}
 */
export default function RootLayout({ children }: { children?: React.ReactNode }): React.JSX.Element {
   return (
      <html lang="en">
         <body
            className={cn(
               jbMono.className,
               "bg-zinc-900 text-zinc-100 selection:bg-slate-500 selection:text-white",
               "flex flex-col min-h-screen",
            )}
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
                  © {new Date().getFullYear()}, Alessandro Bartoli
               </footer>
            </div>
         </body>
      </html>
   )
}
