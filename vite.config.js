import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
// console.tap = (v, ...rest) => (console.log(v, ...rest), v);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        istanbul({
            exclude:    [ "node_modules", "test/" ],
            extension:  [ ".js", ".ts", ".vue" ],
            include:    "src/*",
            requireEnv: true
        })
    ]
});
