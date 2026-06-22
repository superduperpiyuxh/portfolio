import { readdirSync, mkdirSync, existsSync } from "fs"
import { join, extname } from "path"
import sharp from "sharp"

const srcDir = join(import.meta.dirname, "..", "public", "assets")
const outDir = join(import.meta.dirname, "..", "public", "assets")

if (!existsSync(srcDir)) {
  console.error("Assets directory not found:", srcDir)
  process.exit(1)
}

const files = readdirSync(srcDir).filter(
  (f) => extname(f).toLowerCase() === ".png" || extname(f).toLowerCase() === ".jpg" || extname(f).toLowerCase() === ".jpeg"
)

console.log(`Optimizing ${files.length} images...`)

for (const file of files) {
  const inputPath = join(srcDir, file)
  const name = file.replace(extname(file), "")
  const webpPath = join(outDir, `${name}.webp`)

  if (existsSync(webpPath)) {
    console.log(`  Skipping ${file} (already exists)`)
    continue
  }

  await sharp(inputPath).webp({ quality: 80 }).toFile(webpPath)
  const original = (await sharp(inputPath).metadata()).size ?? 0
  const optimized = (await sharp(webpPath).metadata()).size ?? 0
  const saved = original > 0 ? ((1 - optimized / original) * 100).toFixed(1) : "0"
  console.log(`  ${file} → ${name}.webp  (${saved}% smaller)`)
}

console.log("Done!")
