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
         <body className={cn(jbMono.className, "text-slate-200 bg-zinc-800", "min-h-screen flex flex-col")}>
            <div
               className={cn(
                  "mx-auto",
                  "max-w-[1000px]",
                  "flex-1 flex flex-col",
                  "p-10 sm:p-10 md:p-16 lg:p-20",
                  "text-xs sm:text-base md:text-xl lg:text-2xl",
                  "prose prose-invert",
               )}
            >
               <main>{children}</main>
               <footer className="mt-auto text-center text-xs sm:text-sm md:text-base pt-10">
                  © {new Date().getFullYear()}, Alessandro Bartoli
               </footer>
            </div>
         </body>
      </html>
   )
}
