import type { ExtractPropTypes } from 'vue';
import type Icon from './icon.vue'
// 定义props类型声明
export const iconProps = {
  name: {
    type: String,
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  }
} 
//as const，会让对象的每个属性变成只读（readonly）
//  这里为了给 volar 用的
// 详情 https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DVue.volar
// declare module 'vue' {
//   export interface GlobalComponents {
//     XIcon: typeof Icon;
//   }
// }
export type IconProps = ExtractPropTypes<typeof iconProps>;
export type IconInstance = InstanceType<typeof Icon>


