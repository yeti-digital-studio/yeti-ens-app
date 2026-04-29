// @ts-check
import { defineConfig } from 'astro/config';
import resilient from '@yetistudio/astro-resilient';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [
    resilient({
      outDir: "dist-light",
      selector: "main",
      formats: ["txt", "json"],
      ipfs: true,
    }),
  ],
});
