import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: ["giavanna-cherrylike-augustly.ngrok-free.dev"],
  },
  preview: {
    allowedHosts: ["giavanna-cherrylike-augustly.ngrok-free.dev"],
    host: true, // 또는 "0.0.0.0"
  },
  /* 귀찮으면 이렇게
    preview: {
    allowedHosts: true,
    host: true,
  },
  */
  plugins: [react()],
});
