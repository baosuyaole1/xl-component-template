import _Icon from './src/icon.vue';
import { withInstall } from '@xlz-ui/utils';
const XIcon = withInstall(_Icon); // 生成带有 install 方法的组件
export {
  XIcon
}
export default XIcon; // 导出组件
// export * from './src/icon';
