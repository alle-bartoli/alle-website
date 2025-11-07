import { MetadataRoute } from "next"

export const dynamic = "force-static"

/**
 * Generate sitemap.xml
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts
 *
 * @returns {MetadataRoute.Sitemap}
 */
export default function sitemap(): MetadataRoute.Sitemap {
   return [
      {
         url: process.env.WEBSITE_URL!,
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 1,
      },
   ]
}
