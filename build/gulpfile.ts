// 打包方式：串行(series)  并行(parallel)
import { series, parallel } from "gulp";
import { withTaskName,run } from "./utils"
import { genTypes } from "./gen-types";
import { outDir, xlzRoot } from "./utils/paths";
const copySourceCode = () => async () => {
  await run(`cp ${xlzRoot}/package.json ${outDir}/package.json`);
};
/**
 * 1. 打包样式
 * 2. 打包工具方法
 * 3. 打包所有组件
 * 4. 打包每个组件 
 * 5. 生成一个组件库
 * 6. 发布组件
 */
export default series(
  withTaskName("clean",  () => run('rm -rf ./dist')),  // 删除dist目录
  parallel(
    withTaskName("buildPackages", () =>
    run("pnpm run -C packages/utils build")
    // run("pnpm run --filter ./packages --parallel build")
  ),
  withTaskName("buildFullComponent", () =>
      run("pnpm run build buildFullComponent")
    ),
   withTaskName("buildComponent", () => run("pnpm run -C packages/theme-chalk build")),
  withTaskName("buildComponent", () => run("pnpm run build buildComponent")),
  ),
  parallel(genTypes, copySourceCode()),
  
);
// 任务执行器 gulp 任务名 就会执行对应的任务
export * from "./full-component";
export * from "./component";