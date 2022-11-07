import { series, parallel, src, dest } from "gulp";
import { buildConfig } from "./utils/config";
import path from "path";
import { outDir, projRoot } from "./utils/paths";
import ts from "gulp-typescript";
import { withTaskName } from "./utils";
export const buildPackages = (dirname, name) => {
    const tasks = Object.entries(buildConfig).map(([module, config]) => {
        const output = path.resolve(dirname, config.output.name);
        return series(withTaskName(`build${dirname}`, () => {
            const tsConfig = path.resolve(projRoot, "tsconfig.json");
            const inputs = ["**/*.ts", "!gulpfile.ts", "!node_modules"];
            return src(inputs)
                .pipe(ts.createProject(tsConfig, {
                declaration: true,
                strict: false,
                module: config.module,
            })())
                .pipe(dest(output));
        }), withTaskName(`copy:${dirname}`, () => {
            return src(`${output}/**`).pipe(dest(path.resolve(outDir, config.output.name, name)));
        }));
    });
    return parallel(...tasks);
};
