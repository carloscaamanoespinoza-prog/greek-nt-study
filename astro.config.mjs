import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:3000',
  output: 'static',
  integrations: [
    preact({ compat: false }),
    tailwind({ applyBaseStyles: false }),
  ],
  adapter: netlify(),
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    optimizeDeps: {
      exclude: ['sql.js'],
    },
  },
});
