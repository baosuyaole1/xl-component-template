/**
 * 子进程
 * child_process.spawn(command[, args][, options])
 * command <string> 要运行的命令。
 * args <string[]> 字符串参数列表。
 * options <Object>
 *  - cwd <string> | <URL> 子进程的当前工作目录
 *  - stdio <Array> | <string> 子进程的标准输入输出配置。'inherit'：通过相应的标准输入输出流传入/传出父进程
 * - shell <boolean> | <string> 如果是 true，则在 shell 内运行 command。 在 Unix 上使用 '/bin/sh'，在 Windows 上使用    process.env.ComSpec。 可以将不同的 shell 指定为字符串。 请参阅 shell 的要求和默认的 Windows shell。 默认值: false （没有 shell）x
 */

import type { TaskFunction } from 'gulp'
import {projRoot} from './paths'
import { spawn } from "child_process";
// 自定义每个task的name
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) =>
  Object.assign(fn, { displayName: name })
  // 在node中开启一个子进程来运行脚本
export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ')
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: true,
    })
    const onProcessExit = () => app.kill('SIGHUP')
    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit)
      if (code === 0) resolve()
      else
        reject(
          new Error(`Command failed. \n Command: ${command} \n Code: ${code}`)
        )
    })
    process.on('exit', onProcessExit)
  })

   // 重写打包后的@xlz-ui 路径
 export const pathRewriter = (format) => {
  return (id: any) => {
    id = id.replaceAll("@xlz-ui", `xlz-ui/${format}`);
    return id;
  };
};
