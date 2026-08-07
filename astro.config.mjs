// @ts-check
import { defineConfig } from "astro/config";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { join } from "node:path";

/**
 * Base path para el build. Por defecto queda VACÍO → dist/ sirve en la raíz
 * del dominio (ideal para el hosting final: Hostinger/DonWeb).
 *
 * Para GitHub Pages (subdirectorio /massivetrout/) buildear con:
 *   PUBLIC_SITE_BASE=/massivetrout npm run build
 *
 * El hook reescribe en el HTML generado las URLs absolutas desde raíz
 * ("/css/main.css", href="/about/", src="/js/main.js", ...) anteponiendo la
 * base, SIN tocar los archivos físicos (que se quedan en dist/ raíz):
 *   dist/css/main.css                <-- archivo físico
 *   HTML: /massivetrout/css/main.css <-- se sirve correctamente en /massivetrout/
 *
 * En `astro dev` (localhost:4321) NO se aplica el hook, y con base vacía el
 * build queda tal cual (raíz limpia) para el hosting.
 */
const SITE_BASE = (process.env.PUBLIC_SITE_BASE ?? "").replace(/\/+$/, "");

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
 * de los HTML generados en dist/ anteponiendo SITE_BASE cuando se configura
 * (PUBLIC_SITE_BASE). Si queda vacío (hosting en raíz) no toca nada.
 */
const prefixSubdirIntegration = {
  name: "prefix-subdir",
  hooks: {
    "astro:build:done": async ({ logger }) => {
      if (!SITE_BASE) {
        logger.info(
          "prefix-subdir: PUBLIC_SITE_BASE vacío → dist/ para hosting en raíz, sin reescritura."
        );
        return;
      }
      const outDir = join(process.cwd(), "dist");
      const files = await walkHtml(outDir);
      let count = 0;
      for (const file of files) {
        const html = await readFile(file, "utf-8");
        const prefixed = html
          .replace(/href="\/(?!:\/\/)/g, `href="${SITE_BASE}/`)
          .replace(/src="\/(?!:\/\/)/g, `src="${SITE_BASE}/`);
        if (prefixed !== html) {
          await writeFile(file, prefixed, "utf-8");
          count++;
        }
      }
      logger.info(
        `prefix-subdir: reescritura aplicada a ${count} HTML file(s) con base "${SITE_BASE}".`
      );
    },
  },
};

export default defineConfig({
  site: "https://TatoNoir.github.io/massivetrout/",
  trailingSlash: "ignore",
  devToolbar: { enabled: false },
  build: {
    inlineStylesheets: "auto",
  },
  integrations: [prefixSubdirIntegration],
});