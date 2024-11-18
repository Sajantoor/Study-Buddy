import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: "public/manifest.json",
                    dest: ".",
                },
                // TODO: This is a hacky fix for now, instead copy it properly
                {
                    src: "src/overlay/overlay.css",
                    dest: "overlay",
                },
            ],
        }),
    ],
    build: {
        outDir: "build",
        rollupOptions: {
            input: {
                main: "./index.html",
                background: "./src/background.ts",
                overlay: "./src/overlay/main.tsx",
            },
            output: {
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name === "background") {
                        return "background.js";
                    }

                    if (chunkInfo.name === "overlay") {
                        return "overlay/[name].js";
                    }

                    return "[name].js";
                },
            },
        },
    },
});
