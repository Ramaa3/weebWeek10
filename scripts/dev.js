import { spawn } from 'node:child_process';

const npmCli = process.env.npm_execpath;
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const commands = [
  { name: 'backend', args: ['run', 'dev', '--prefix', 'be'] },
  { name: 'frontend', args: ['run', 'dev', '--prefix', 'fe'] }
];
let shuttingDown = false;
function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) if (!child.killed) child.kill();
  process.exitCode = code;
}
const children = commands.map(({ name, args }) => {
  const child = spawn(npmCli ? process.execPath : npm, npmCli ? [npmCli, ...args] : args, {
    stdio: 'inherit',
    shell: !npmCli && process.platform === 'win32'
  });
  child.on('exit', (code) => {
    if (code && !shuttingDown) {
      console.error(`${name} berhenti dengan kode ${code}.`);
      shutdown(code);
    }
  });
  return child;
});
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
