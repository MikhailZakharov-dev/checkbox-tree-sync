import path, { resolve } from "path";
import fs from "fs";
import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

// Read package.json to get the package name
const packageJsonPath = path.resolve(__dirname, "package.json"); // Update the path if needed
const packageJsonData = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const libraryName = packageJsonData.name;
export default defineConfig({
  publicDir: false,
  build: {
    target: "esnext",
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: libraryName,
      fileName: libraryName,
    },
    rollupOptions: {
      input: "./src/index.ts",
      external: ["react", "react-dom"],
    },
  },
  plugins: [dtsPlugin()],
});
