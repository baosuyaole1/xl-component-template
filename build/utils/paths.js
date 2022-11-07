import { resolve } from 'path';
export const projRoot = resolve(__dirname, '..', '..');
export const outDir = resolve(projRoot, 'dist');
export const xlzRoot = resolve(projRoot, 'packages/xlz-ui');
export const compRoot = resolve(projRoot, 'packages/components');
export const buildOutput = resolve(projRoot, 'dist');
