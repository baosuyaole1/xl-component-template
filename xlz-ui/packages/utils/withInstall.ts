import { Plugin } from "vue";

export type withInstallSFC<T> = T & Plugin;

// 给传入的组件添加一个 install 方法
export function withInstall<T>(comp: T) {
  (comp as withInstallSFC<T>).install = function (app) {
    const { name } = comp as unknown as { name: string };
    app.component(name, comp);  // 这一块的类型还有点问题，还在研究中。
  };
  return comp as withInstallSFC<T>;
}