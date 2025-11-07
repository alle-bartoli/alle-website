import type { MetadataRoute } from "next"

const host = process.env.WEBSITE_URL!

/**
 * Generate robots.txt
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file
 *
 * @returns {MetadataRoute.Robots}
 */
export default function robots(): MetadataRoute.Robots {
   return {
      rules: {
         userAgent: "*",
         allow: "/",
         disallow: [],
      },
      sitemap: `${host}/sitemap.xml`,
   }
}
