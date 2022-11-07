var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { projRoot } from './paths';
import { spawn } from "child_process";
export const withTaskName = (name, fn) => Object.assign(fn, { displayName: name });
export const run = (command, cwd = projRoot) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const [cmd, ...args] = command.split(' ');
        const app = spawn(cmd, args, {
            cwd,
            stdio: 'inherit',
            shell: true,
        });
        const onProcessExit = () => app.kill('SIGHUP');
        app.on('close', (code) => {
            process.removeListener('exit', onProcessExit);
            if (code === 0)
                resolve();
            else
                reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`));
        });
        process.on('exit', onProcessExit);
    });
});
export const pathRewriter = (format) => {
    return (id) => {
        id = id.replaceAll("@xlz-ui", `xlz-ui/${format}`);
        return id;
    };
};
