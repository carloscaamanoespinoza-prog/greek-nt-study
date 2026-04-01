import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
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
