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
import typescript from "rollup-plugin-typescript2";
import RollupPluginPostcss from 'rollup-plugin-postcss';
import Autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { series } from "gulp";
import { sync } from "fast-glob";
import { compRoot, outDir, projRoot } from "./utils/paths";
import path from "path";
import { rollup } from "rollup";
import { buildConfig } from "./utils/config";
import { pathRewriter } from "./utils";
import { Project } from "ts-morph";
import { terser } from 'rollup-plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import glob from "fast-glob";
import * as VueCompiler from "@vue/compiler-sfc";
import fs from "fs/promises";
const buildEachComponent = () => __awaiter(void 0, void 0, void 0, function* () {
    const files = sync("*", {
        cwd: compRoot,
        onlyDirectories: true,
    });
    const builds = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        const input = path.resolve(compRoot, file, "index.ts");
        const config = {
            input,
            plugins: [
                nodeResolve(),
                vue({
                    preprocessStyles: false
                }),
                typescript(),
                RollupPluginPostcss({ extract: true, plugins: [Autoprefixer, cssnano()] }),
                commonjs(),
            ],
            external: (id) => /^vue/.test(id) || /^@xlz-ui/.test(id),
        };
        const bundle = yield rollup(config);
        const options = Object.values(buildConfig).map((config) => ({
            format: config.format,
            file: path.resolve(config.output.path, `components/${file}/index.js`),
            paths: pathRewriter(config.output.name),
            exports: "named",
        }));
        yield Promise.all(options.map((option) => bundle.write(option)));
    }));
    return Promise.all(builds);
});
function genTypes() {
    return __awaiter(this, void 0, void 0, function* () {
        const project = new Project({
            compilerOptions: {
                allowJs: true,
                declaration: true,
                emitDeclarationOnly: true,
                noEmitOnError: true,
                outDir: path.resolve(outDir, "./"),
                baseUrl: projRoot,
                paths: {
                    "@xlz-ui/*": ["packages/*"],
                },
                skipLibCheck: true,
                strict: false,
            },
            tsConfigFilePath: path.resolve(projRoot, "tsconfig.json"),
            skipAddingFilesFromTsConfig: true,
        });
        const filePaths = yield glob("**/*", {
            cwd: compRoot,
            onlyFiles: true,
            absolute: true,
        });
        const sourceFiles = [];
        yield Promise.all(filePaths.map(function (file) {
            return __awaiter(this, void 0, void 0, function* () {
                if (file.endsWith(".vue")) {
                    const content = yield fs.readFile(file, "utf8");
                    const sfc = VueCompiler.parse(content);
                    const { script } = sfc.descriptor;
                    if (script) {
                        let content = script.content;
                        const sourceFile = project.createSourceFile(file + ".ts", content);
                        sourceFiles.push(sourceFile);
                    }
                }
                else {
                    const sourceFile = project.addSourceFileAtPath(file);
                    sourceFiles.push(sourceFile);
                }
            });
        }));
        yield project.emit({
            emitOnlyDtsFiles: true,
        });
        const tasks = sourceFiles.map((sourceFile) => __awaiter(this, void 0, void 0, function* () {
            const emitOutput = sourceFile.getEmitOutput();
            const tasks = emitOutput.getOutputFiles().map((outputFile) => __awaiter(this, void 0, void 0, function* () {
                const filepath = outputFile.getFilePath();
                yield fs.mkdir(path.dirname(filepath), {
                    recursive: true,
                });
                yield fs.writeFile(filepath, pathRewriter("es")(outputFile.getText()));
            }));
            yield Promise.all(tasks);
        }));
        yield Promise.all(tasks);
    });
}
function buildComponentEntry() {
    return __awaiter(this, void 0, void 0, function* () {
        const config = {
            input: path.resolve(compRoot, "index.ts"),
            plugins: [typescript(), cleanup(),
                terser({ compress: { drop_console: true } })
            ],
            external: () => true,
        };
        const bundle = yield rollup(config);
        return Promise.all(Object.values(buildConfig)
            .map((config) => ({
            format: config.format,
            file: path.resolve(config.output.path, "components/index.js"),
        }))
            .map((config) => bundle.write(config)));
    });
}
export const buildComponent = series(buildEachComponent, genTypes, buildComponentEntry);
