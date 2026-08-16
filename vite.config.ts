import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative base: the deck is served from a project path
  // (naturalclar.dev/slides-ginza-js-2026-08/), not the domain root.
  // "./" keeps the emitted asset URLs correct there without hardcoding
  // the repo name. See CLAUDE.md for how that URL is derived.
  base: "./",
  plugins: [react()],
});
