import { platform } from 'os';
import { exec } from 'child_process';
export function setTitle(title){
    switch (platform()) {
        case 'darwin':
        case 'linux':
        case 'win32':
            exec("title=" + title + ' && echo - ne "\\e]0;$title\\a"');
            break;
        default:
            console.log("无法确定操作系统!")
    }
}