import path from "path";
import { outDir } from "./paths";
export const buildConfig = {
    esm: {
        module: "ESNext",
        format: "esm",
        output: {
            name: "es",
            path: path.resolve(outDir, "es"),
        },
        bundle: {
            path: "xlz-plus/es",
        },
    },
    cjs: {
        module: "CommonJS",
        format: "cjs",
        output: {
            name: "lib",
            path: path.resolve(outDir, "lib"),
        },
        bundle: {
            path: "xlz-plus/lib",
        },
    },
};
