import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import markdoc from "@astrojs/markdoc";
import partytown from "@astrojs/partytown";
import solidJs from "@astrojs/solid-js";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  output: "server",
  site: "https://nurl.website",

  integrations: [
    markdoc(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    solidJs(),
    sitemap(),
  ],
});
