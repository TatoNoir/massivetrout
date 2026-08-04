// @ts-check
import { defineConfig } from "astro/config";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

/**
 * GitHub Pages sirve este proyecto dentro del subdirectorio /massivetrout/
 * (URL: https://TatoNoir.github.io/massivetrout/). El contenido estático
 * publicado por Astro se sirve desde la RAÍZ de ese subdirectorio, pero el
 * HTML que genera Astro contiene URLs absolutas desde raíz ("/css/main.css",
 * href="/about/", src="/js/main.js", ...) que en /massivetrout/ dan 404.
 *
 * Este hook (build only) reescribe esas URLs anteponiendo /massivetrout/,
 * SIN tocar los archivos físicos (que se quedan en dist/). Así:
 *   dist/css/main.css      <-- archivo físico
 *   HTML: /massivetrout/css/main.css  <-- se sirve correctamente en /massivetrout/
 *
 * En `astro dev` (localhost:4321) NO se aplica el hook, y al servir en raíz
 * las URLs "/css/..." resuelven correctamente → dev sigue funcionando.
 */
const GH_PAGES_BASE = "/massivetrout";

async function walkHtml(dir) {
  const out = [];
  for (const name of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) out.push(...(await walkHtml(p)));
    else if (name.name.endsWith(".html")) out.push(p);
  }
  return out;
}

/**
 * Integration: reescribe URLs absolutas ("/css/...", href="/about/", ...) dentro
 * de los HTML generados en dist/ para que funcionen servidos desde el
 * subdirectorio /massivetrout/ de GitHub Pages. Los archivos físicos NO se
 * mueven (se quedan en dist/ raíz, que GH Pages sirve como /massivetrout/).
 */
const prefixSubdirIntegration = {
  name: "prefix-subdir",
  hooks: {
    "astro:build:done": async ({ logger }) => {
      const outDir = join(process.cwd(), "dist");
      const files = await walkHtml(outDir);
      let count = 0;
      for (const file of files) {
        const html = await readFile(file, "utf-8");
        const prefixed = html
          .replace(/href="\/(?!:\/\/)/g, `href="${GH_PAGES_BASE}/`)
          .replace(/src="\/(?!:\/\/)/g, `src="${GH_PAGES_BASE}/`);
        if (prefixed !== html) {
          await writeFile(file, prefixed, "utf-8");
          count++;
        }
      }
      logger.info(
        `prefix-subdir: reescritura aplicada a ${count} HTML file(s) con base "${GH_PAGES_BASE}".`
      );
    },
  },
};

export default defineConfig({
  site: "https://TatoNoir.github.io/massivetrout/",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [prefixSubdirIntegration],
});