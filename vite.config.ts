import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import vike from "vike/plugin"
import mdx from "@mdx-js/rollup"
import tailwindcss from "@tailwindcss/vite"
import { fileURLToPath } from "url"
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
   plugins: [
      {
         enforce: "pre",
         ...mdx({
            providerImportSource: "@mdx-js/react",
         }),
      },
      react(),
      vike(),
      tailwindcss(),
   ],
   build: {
      sourcemap: false,
      rollupOptions: {
         onwarn(warning, warn) {
            if (warning.message.includes("sourcemap")) return
            warn(warning)
         },
      },
   },
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
      },
   },
})
