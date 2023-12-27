import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import markdoc from "@astrojs/markdoc";
import partytown from "@astrojs/partytown";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify(),
  integrations: [markdoc(), partytown({
    config: {
      forward: ["dataLayer.push"]
    }
  }), solidJs()]
});