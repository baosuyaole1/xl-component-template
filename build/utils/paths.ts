import { resolve } from 'path'
// 根目录
export const projRoot = resolve(__dirname, '..','..')
export const outDir=resolve(projRoot,'dist')
// xlz-ui 入口 index.ts
export const xlzRoot = resolve(projRoot,'packages/xlz-ui')
// 组件目录
export const compRoot = resolve(projRoot,'packages/components')
/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')