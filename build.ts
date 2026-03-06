import fs from "node:fs"
import path from "node:path"
import { execSync } from "node:child_process"
import { marked } from "marked"
import esbuild from "esbuild"

const ROOT = path.dirname(new URL(import.meta.url).pathname)
const DIST = path.join(ROOT, "dist")
const SRC = path.join(ROOT, "src")

/**
 * @dev Sequential SSG build pipeline.
 */
async function build(): Promise<void> {
   const start = performance.now()

   // 1. Clean dist/
   if (fs.existsSync(DIST)) {
      fs.rmSync(DIST, { recursive: true })
   }
   fs.mkdirSync(DIST, { recursive: true })

   // 2. Parse markdown content
   const mdPath = path.join(SRC, "content", "home.md")
   const mdSource = fs.readFileSync(mdPath, "utf-8")
   let contentHtml = await marked.parse(mdSource)

   // 3. Post-process: add data-typing attributes to elements
   contentHtml = addTypingAttributes(contentHtml)

   // 4. Inject into base template
   const templatePath = path.join(SRC, "templates", "base.html")
   const template = fs.readFileSync(templatePath, "utf-8")
   const indexHtml = template.replace("{{content}}", contentHtml).replace("{{year}}", String(new Date().getFullYear()))

   // 5. Write index.html and 404.html
   fs.writeFileSync(path.join(DIST, "index.html"), indexHtml)

   const notFoundPath = path.join(SRC, "templates", "404.html")
   const notFoundHtml = fs.readFileSync(notFoundPath, "utf-8")
   fs.writeFileSync(path.join(DIST, "404.html"), notFoundHtml)

   // 6. Copy public/ assets
   const publicDir = path.join(ROOT, "public")
   copyDir(publicDir, DIST)

   // 7. Copy fonts
   const fontsDir = path.join(SRC, "fonts")
   const distFonts = path.join(DIST, "fonts")
   fs.mkdirSync(distFonts, { recursive: true })
   copyDir(fontsDir, distFonts)

   // 8. Compile CSS with Tailwind CLI
   const cssInput = path.join(SRC, "styles", "globals.css")
   const cssOutput = path.join(DIST, "styles.css")
   execSync(`npx @tailwindcss/cli -i ${cssInput} -o ${cssOutput} --minify`, { cwd: ROOT, stdio: "pipe" })

   // 9. Bundle typing.ts with esbuild
   await esbuild.build({
      entryPoints: [path.join(SRC, "scripts", "typing.ts")],
      outfile: path.join(DIST, "typing.js"),
      bundle: true,
      minify: true,
      target: "es2022",
      format: "iife",
   })

   const elapsed = (performance.now() - start).toFixed(0)
   const jsSize = (fs.statSync(path.join(DIST, "typing.js")).size / 1024).toFixed(1)
   const cssSize = (fs.statSync(cssOutput).size / 1024).toFixed(1)
   console.log(`\u2713 Built in ${elapsed}ms (JS: ${jsSize}KB, CSS: ${cssSize}KB)`)
}

/**
 * @dev Add `data-typing` attribute to content elements that should be animated.
 * Targets: h1, h3, p, ul, hr
 */
function addTypingAttributes(html: string): string {
   return html
      .replace(/<h1>/g, '<h1 data-typing class="text-4xl font-bold">')
      .replace(/<h3>/g, '<h3 data-typing class="text-2xl mt-4">')
      .replace(/<p>/g, "<p data-typing>")
      .replace(/<ul>/g, "<ul data-typing>")
      .replace(/<hr>/g, "<hr data-typing>")
      .replace(/<a /g, '<a class="text-green-400 hover:text-green-200" ')
}

/**
 * @dev Recursively copy a directory's contents.
 */
function copyDir(src: string, dest: string): void {
   if (!fs.existsSync(src)) return

   for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
      const srcPath = path.join(src, entry.name)
      const destPath = path.join(dest, entry.name)

      if (entry.isDirectory()) {
         fs.mkdirSync(destPath, { recursive: true })
         copyDir(srcPath, destPath)
      } else {
         fs.copyFileSync(srcPath, destPath)
      }
   }
}

build().catch((err) => {
   console.error("Build failed:", err)
   process.exit(1)
})
