import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

export default () => {
  return defineConfig({
    base: "/",
    build: {
      sourcemap: true,
    },
    plugins: [
      svgr(),
      tailwindcss(),
      react(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "Your App",
          short_name: "App",
          start_url: "/",
          display: "standalone",
        },
      }),
    ],
    resolve: {
      alias: {
        src: "/src",
      },
    },
    optimizeDeps: {
      include: ['dayjs/locale/uk'],
    },
  });
};

