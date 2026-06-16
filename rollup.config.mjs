import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDeps from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";

export default {
  input: "src/index.ts",
  output: [
    { file: "dist/index.cjs.js", format: "cjs", sourcemap: true },
    { file: "dist/index.esm.js", format: "esm", sourcemap: true },
  ],
  plugins: [
    peerDeps(), // handles external dependencies
    url({ include: ["**/*.jpg", "**/*.png", "**/*.svg", "**/*.gif"] }), // handles image files
    postcss({ modules: true, inject: true }), // enables CSS Modules
    resolve(), // resolves file paths
    commonjs(), // converts CommonJS to ES6
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "dist/types",
    }),
  ],
};
