import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify/functions";
import markdoc from "@astrojs/markdoc";
import partytown from "@astrojs/partytown";
import solidJs from "@astrojs/solid-js";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  adapter: netlify({
    edgeMiddleware: true,
  }),
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
    sitemap({
      customPages: [
        "https://nurl.website/blog/nurl-now-on-twitch/",
        "https://nurl.website/blog/january-bugs-rehomed/",
        "https://nurl.website/blog/january-features/",
        "https://nurl.website/blog/feature-focus-nuro/",
        "https://nurl.website/blog/og-ttrpg-turns-50/",
        "https://nurl.website/blog/netty-awards-2024-winner/",
        "https://nurl.website/blog/multi-group-campaigns/",
        "https://nurl.website/blog/glorified-notes-app/",
        "https://nurl.website/blog/supercharged-group-chat/",
        "https://nurl.website/blog/nurl-app-not-just-for-dnd/",
        "https://nurl.website/blog/plan-session-ten-minutes/",
        "https://nurl.website/legal/community-guidelines/",
        "https://nurl.website/legal/terms/",
        "https://nurl.website/legal/privacy/",
        "https://nurl.website/legal/copyright-policy/",
        "https://nurl.website/legal/other/",
        "https://nurl.website/legal/licenses/",
        "https://nurl.website/legal/paid-services/",
        "https://nurl.website/legal/acknowledgements/",
        "https://nurl.website/legal/group-subscription-policy/",
        "https://nurl.website/legal/off-platform-behavior/",
        "https://nurl.website/legal/monitization-terms/",
        "https://nurl.website/legal/data-reporting-metrics/",
      ],
      filter: (page) =>
        page !== "https://nurl.website/thanks/" &&
        page !== "https://nurl.website/success/" &&
        page !== "https://nurl.website/contact-thanks/",
    }),
  ],
});
