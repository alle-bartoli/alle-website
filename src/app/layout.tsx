import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import { cn } from "@/utils"
import "./globals.css"

// Configure font
const jbMono = JetBrains_Mono({ subsets: ["latin"] })

const url = process.env.WEBSITE_URL!

// Home page metadata
export const metadata: Metadata = {
   applicationName: "Alessandro Bartoli personal website",
   title: {
      default: "Alessandro Bartoli | Dev",
      template: "%s | Alessandro Bartoli",
   },
   description: "Alessandro Bartoli personal website.",
   keywords: [
      // Identity
      "Alessandro Bartoli",
      "Sviluppatore Carpi",
      "Sviluppatore Modena",
      "Sviluppatore Emilia-Romagna",
      "Consulente informatico Carpi",
      "Consulente informatico Modena",
      "Consulente informatico Emilia-Romagna",
      "Consulente software Carpi",
      "Consulente software Modena",
      "Full Stack Developer Carpi",
      "Full Stack Developer Modena",
      "Full Stack Developer Emilia-Romagna",
      "Sviluppo software Carpi",
      "Sviluppo software Modena",
      "Sviluppo software Emilia-Romagna",

      // Prof
      "Full Stack Developer",
      "AI Developer",
      "Cloud Architect",
      "Software Architect",
      "DevOps Engineer",
      "Cloud-native development",
      "Serverless applications",
      "Event-driven architecture",
      "API design",
      "Database",
      "Sviluppo web moderno",

      // Tech
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Go",
      "Rust",
      "Python",
      "Delphi",
      "AWS",
      "Automation",
      "Serverless",
      "Cloud computing",
      "Cloud-native development",
      "DevOps automation",
      "Event-driven systems",
      "API orchestration",
      "SQL",
      "NoSQL",

      // Emerging tech
      "Artificial Intelligence",
      "AI Agents",
      "Agent AI",
      "OpenAI",
      "Anthropic",
      "Perplexity",
      "Machine Learning",
      "LLM integration",
      "AI automation",
      "Intelligenza Artificiale",
      "Sviluppo AI",
      "Sviluppo sistemi intelligenti",

      // Blockchain & web3
      "Blockchain",
      "Web3",
      "Smart contracts",

      // Intent search
      "Sviluppatore software",
      "Consulente software",
      "Software engineer",
      "Software consultant",
      "Architettura cloud",
      "Sviluppo applicazioni web",
      "Ingegneria del software",
      "Esperto AWS",
      "Sviluppatore full stack Italia",
   ],
   authors: [{ name: "Alessandro Bartoli", url }],
   creator: "Alessandro Bartoli",
   openGraph: {
      type: "website",
      locale: "it_IT",
      siteName: "Alessandro Bartoli personal website",
      url,
      //images: [
      // {
      //  url: "/path/to/default-og-image.jpg", // TODO: Replace with your image path.
      // width: 800,
      // height: 600,
      // alt: "Alessandro Bartoli",
      // },
      //],
   },
   icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png",
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
