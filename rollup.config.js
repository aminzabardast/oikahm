import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

const config = [
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
    },
    plugins: [typescript(), nodeResolve(), commonjs()],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.min.cjs",
      format: "cjs",
    },
    plugins: [typescript(), nodeResolve(), commonjs(), terser()],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.mjs",
      format: "es",
    },
    plugins: [typescript(), nodeResolve(), commonjs()],
  },
  {
    input: "./dist/.dts/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

export default config;
