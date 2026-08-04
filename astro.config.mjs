// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://massivetroutflyfishing.com",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
});
