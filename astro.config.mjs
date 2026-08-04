// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://TatoNoir.github.io/massivetrout/",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
});
