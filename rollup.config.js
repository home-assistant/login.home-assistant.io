const path = require("path");
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import manifest from "./build-scripts/rollup-plugins/manifest";

const production = process.env.NODE_ENV === "production";

const terserOptions = (latestBuild) => ({
  safari10: !latestBuild,
  ecma: latestBuild ? undefined : 5,
  output: { comments: false },
});

const plugins = (latestBuild) =>
  [
    nodeResolve({}),
    commonjs(),
    typescript(),
    production && terser(terserOptions(latestBuild)),
    manifest(),
  ].filter(Boolean);

// Each entrypoint a different build to avoid code reuse across builds
export default [
  "./src/entrypoints/login-index.ts",
].map((entrypoint) => ({
  input: {
    [path.parse(entrypoint).name]: entrypoint,
  },
  output: {
    dir: "dist/js",
    format: "iife",
    entryFileNames: production ? "[name]-[hash].js" : "[name].js",
  },
  plugins: plugins(true),
}));
