var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { series, parallel } from "gulp";
import { withTaskName, run } from "./utils";
import { genTypes } from "./gen-types";
import { outDir, xlzRoot } from "./utils/paths";
const copySourceCode = () => () => __awaiter(void 0, void 0, void 0, function* () {
    yield run(`cp ${xlzRoot}/package.json ${outDir}/package.json`);
});
export default series(withTaskName("clean", () => run('rm -rf ./dist')), parallel(withTaskName("buildPackages", () => run("pnpm run -C packages/utils build")), withTaskName("buildFullComponent", () => run("pnpm run build buildFullComponent")), withTaskName("buildComponent", () => run("pnpm run -C packages/theme-chalk build")), withTaskName("buildComponent", () => run("pnpm run build buildComponent"))), parallel(genTypes, copySourceCode()));
export * from "./full-component";
export * from "./component";
