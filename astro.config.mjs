import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify/functions";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [markdoc()]
});