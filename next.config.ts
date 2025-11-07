import { NextConfig } from "next"
import withMDX from "@next/mdx"

// Configure MDX with options
const withMDXConfig = withMDX({
   extension: /\.(md|mdx)$/,
})

const nextConfig: NextConfig = {
   output: "export",
   pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"], // Configure pageExtensions to include MDX files
   reactStrictMode: true,
   images: { unoptimized: true },
   trailingSlash: true,
   //
   // Add webpack configuration for SVG handling
   webpack(config) {
      // Grab the existing rule that handles SVG imports
      const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.(".svg"))

      config.module.rules.push(
         // Reapply the existing rule, but only for svg imports ending in ?url
         {
            ...fileLoaderRule,
            test: /\.svg$/i,
            resourceQuery: /url/, // *.svg?url
         },
         // Convert all other *.svg imports to React components
         {
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
            use: ["@svgr/webpack", "url-loader"],
         },
      )

      // Modify the file loader rule to ignore *.svg, since we have it handled now
      fileLoaderRule.exclude = /\.svg$/i

      return config
   },
}

export default withMDXConfig(nextConfig)
