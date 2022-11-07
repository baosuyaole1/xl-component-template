declare module '*.vue'{
  import type { DefineComponent } from "vue";  // 导入vue官方组件type
  const component:DefineComponent<{},{},any>
  export default component
}
