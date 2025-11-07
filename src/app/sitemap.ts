import { MetadataRoute } from "next"

const host = process.env.WEBSITE_URL!

/**
 * Generate sitemap.xml
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts
 *
 * @returns {MetadataRoute.Sitemap}
 */
export default function sitemap(): MetadataRoute.Sitemap {
   return [
      {
         url: host,
         lastModified: new Date(),
         changeFrequency: "yearly",
         priority: 1,
      },
   ]
}
