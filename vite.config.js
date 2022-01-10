import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
import { VitePWA } from "vite-plugin-pwa";

// console.tap = (v, ...rest) => (console.log(v, ...rest), v);

const pwaConfig = {
    injectRegister: "inline",
    manifest:       {
        description: "Description of your app",
        icons:       [
            {
                sizes: "192x192",
                src:   "pwa-192x192.png",
                type:  "image/png"
            },
            {
                sizes: "512x512",
                src:   "pwa-512x512.png",
                type:  "image/png"
            },
            {
                purpose: "any maskable",
                sizes:   "512x512",
                src:     "pwa-512x512.png",
                type:    "image/png"
            }
        ],
        name:       "Points",
        short_name: "Points"
    },
    minify: false,
    mode:   "development"
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        istanbul({
            exclude:   [ "node_modules", "test/" ],
            extension: [ ".js", ".jsx" ],
            include:   "src/*"
        }),
        VitePWA( pwaConfig )
    ],
    resolve: {
        alias: {
            "@": path.resolve( __dirname, "./src" )
        }
    },
    server: {
        https: true
    }
});
