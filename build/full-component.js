var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import vue from "rollup-plugin-vue";
import RollupPluginPostcss from 'rollup-plugin-postcss';
import typescript from "rollup-plugin-typescript2";
import { parallel } from "gulp";
import Autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import path from "path";
import { outDir, xlzRoot } from "./utils/paths";
import { rollup } from "rollup";
import fs from "fs/promises";
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import { buildConfig } from "./utils/config";
import { pathRewriter } from "./utils";
const buildFull = () => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        input: path.resolve(xlzRoot, "index.ts"),
        plugins: [
            nodeResolve(),
            vue({
                preprocessStyles: false
            }),
            typescript(),
            RollupPluginPostcss({ extract: 'theme-chalk/components-style.css', plugins: [Autoprefixer(), cssnano()] }),
            commonjs(),
        ],
        external: (id) => /^vue/.test(id),
    };
    const buildConfig = [
        {
            format: "umd",
            file: path.resolve(outDir, "index.js"),
            name: "xlz-plus",
            exports: "named",
            globals: {
                vue: "Vue",
            },
        },
        {
            format: "esm",
            file: path.resolve(outDir, "index.esm.js"),
        },
    ];
    let bundle = yield rollup(config);
    return Promise.all(buildConfig.map((option) => {
        bundle.write(option);
    }));
});
function buildEntry() {
    return __awaiter(this, void 0, void 0, function* () {
        const entryFiles = yield fs.readdir(xlzRoot, { withFileTypes: true });
        const entryPoints = entryFiles
            .filter((f) => f.isFile())
            .filter((f) => !["package.json"].includes(f.name))
            .map((f) => path.resolve(xlzRoot, f.name));
        const config = {
            input: entryPoints,
            plugins: [
                nodeResolve(),
                vue(),
                typescript(),
                cleanup(),
                terser({ compress: { drop_console: true } })
            ],
            external: (id) => /^vue/.test(id) || /^@xlz-ui/.test(id),
        };
        const bundle = yield rollup(config);
        return Promise.all(Object.values(buildConfig)
            .map((config) => ({
            format: config.format,
            dir: config.output.path,
            paths: pathRewriter(config.output.name),
        }))
            .map((option) => bundle.write(option)));
    });
}
export const buildFullComponent = parallel(buildFull, buildEntry);
