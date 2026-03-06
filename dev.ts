import { execSync } from "node:child_process"
import path from "node:path"
import { watch } from "chokidar"
import browserSync from "browser-sync"

const ROOT = path.dirname(new URL(import.meta.url).pathname)
const DIST = path.join(ROOT, "dist")
const SRC = path.join(ROOT, "src")

/**
 * @dev Dev server with file watching and live-reload.
 */
function dev(): void {
   // Initial build
   runBuild()

   // Start browser-sync
   const bs = browserSync.create()
   bs.init({
      server: DIST,
      open: false,
      notify: false,
      logLevel: "silent",
      ui: false,
   })

   console.log("Dev server running on http://localhost:3000")

   // Watch src/ and public/ for changes
   const watcher = watch([SRC, path.join(ROOT, "public")], {
      ignoreInitial: true,
      awaitWriteFinish: { stabilityThreshold: 100 },
   })

   let building = false

   watcher.on("all", async (_event, filePath) => {
      if (building) return
      building = true

      console.log(`\u2192 Changed: ${path.relative(ROOT, filePath)}`)
      runBuild()
      bs.reload()

      building = false
   })
}

function runBuild(): void {
   try {
      execSync("npx tsx build.ts", { cwd: ROOT, stdio: "inherit" })
   } catch {
      console.error("Build failed, waiting for changes...")
   }
}

dev()
