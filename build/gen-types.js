var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { outDir, projRoot, xlzRoot } from "./utils/paths";
import glob from "fast-glob";
import { Project, ModuleKind, ScriptTarget } from "ts-morph";
import path from "path";
import fs from "fs/promises";
import { parallel, series } from "gulp";
import { run, withTaskName, pathRewriter } from "./utils";
import { buildConfig } from "./utils/config";
export const genEntryTypes = () => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield glob("*.ts", {
        cwd: xlzRoot,
        absolute: true,
        onlyFiles: true,
    });
    const project = new Project({
        compilerOptions: {
            declaration: true,
            module: ModuleKind.ESNext,
            allowJs: true,
            emitDeclarationOnly: true,
            noEmitOnError: false,
            outDir: path.resolve(outDir, "entry"),
            target: ScriptTarget.ESNext,
            rootDir: xlzRoot,
            strict: false,
        },
        skipFileDependencyResolution: true,
        tsConfigFilePath: path.resolve(projRoot, "tsconfig.json"),
        skipAddingFilesFromTsConfig: true,
    });
    const sourceFiles = [];
    files.map((f) => {
        const sourceFile = project.addSourceFileAtPath(f);
        sourceFiles.push(sourceFile);
    });
    yield project.emit({
        emitOnlyDtsFiles: true,
    });
    const tasks = sourceFiles.map((sourceFile) => __awaiter(void 0, void 0, void 0, function* () {
        const emitOutput = sourceFile.getEmitOutput();
        for (const outputFile of emitOutput.getOutputFiles()) {
            const filepath = outputFile.getFilePath();
            yield fs.mkdir(path.dirname(filepath), { recursive: true });
            yield fs.writeFile(filepath, pathRewriter("es")(outputFile.getText()), "utf8");
        }
    }));
    yield Promise.all(tasks);
});
export const copyEntryTypes = () => {
    const src = path.resolve(outDir, "entry");
    const copy = (module) => parallel(withTaskName(`copyEntryTypes:${module}`, () => run(`cp -r ${src}/* ${path.resolve(outDir, buildConfig[module].output.path)}/`)));
    return parallel(copy("esm"), copy("cjs"));
};
export const genTypes = series(genEntryTypes, copyEntryTypes());
