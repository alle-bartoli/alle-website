import { usePageContext } from "vike-react/usePageContext"

const baseUrl = "https://alleb.dev"

/**
 * @dev Head component with meta tags and SEO.
 */
export function Head() {
   const { urlPathname } = usePageContext()

   return (
      <>
         <meta charSet="utf-8" />
         <meta name="viewport" content="width=device-width, initial-scale=1" />

         <title>Alessandro Bartoli | Dev</title>
         <meta name="description" content="Alessandro Bartoli personal website." />
         <meta
            name="keywords"
            content="Alessandro Bartoli, Sviluppatore Carpi, Sviluppatore Modena, Full Stack Developer, AI Developer, Cloud Architect, TypeScript, React, Go, Rust, Python, AWS, Serverless, Artificial Intelligence, AI Agents"
         />
         <meta name="author" content="Alessandro Bartoli" />

         <link rel="canonical" href={`${baseUrl}${urlPathname}`} />

         {/* OpenGraph */}
         <meta property="og:type" content="website" />
         <meta property="og:locale" content="it_IT" />
         <meta property="og:url" content={`${baseUrl}${urlPathname}`} />
         <meta property="og:title" content="Alessandro Bartoli | Dev" />
         <meta property="og:description" content="Alessandro Bartoli personal website." />
         <meta property="og:site_name" content="Alessandro Bartoli | Dev" />

         {/* Twitter */}
         <meta name="twitter:card" content="summary_large_image" />
         <meta name="twitter:title" content="Alessandro Bartoli | Dev" />
         <meta name="twitter:description" content="Alessandro Bartoli personal website." />

         {/* Favicons */}
         <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
         <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
         <link rel="shortcut icon" href="/favicon.ico" />
         <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
         <meta name="apple-mobile-web-app-title" content="Alle" />
         <link rel="manifest" href="/site.webmanifest" />
      </>
   )
}
