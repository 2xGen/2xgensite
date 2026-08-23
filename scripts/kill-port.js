#!/usr/bin/env node
/**
 * Kill whatever is listening on a TCP port (default 3000).
 * Usage: node scripts/kill-port.js [port]
 *        npm run free:3000
 */
import { execSync } from 'node:child_process';

const port = String(process.argv[2] || '3000').replace(/\D/g, '') || '3000';

function killWindows() {
  let out = '';
  try {
    out = execSync(`netstat -ano | findstr :${port}`, { encoding: 'utf8' });
  } catch {
    console.log(`Nothing listening on port ${port}`);
    return;
  }

  const pids = new Set();
  for (const line of out.split(/\r?\n/)) {
    if (!/LISTENING/i.test(line)) continue;
    const parts = line.trim().split(/\s+/);
    const pid = parts[parts.length - 1];
    if (pid && /^\d+$/.test(pid) && pid !== '0') pids.add(pid);
  }

  if (pids.size === 0) {
    console.log(`Nothing listening on port ${port}`);
    return;
  }

  for (const pid of pids) {
    try {
      execSync(`taskkill /F /PID ${pid}`, { stdio: 'inherit' });
      console.log(`Killed PID ${pid} (was on :${port})`);
    } catch (err) {
      console.error(`Could not kill PID ${pid}:`, err.message);
    }
  }
}

function killUnix() {
  let out = '';
  try {
    out = execSync(`lsof -ti tcp:${port}`, { encoding: 'utf8' });
  } catch {
    console.log(`Nothing listening on port ${port}`);
    return;
  }

  const pids = [...new Set(out.split(/\s+/).filter(Boolean))];
  for (const pid of pids) {
    try {
      execSync(`kill -9 ${pid}`, { stdio: 'inherit' });
      console.log(`Killed PID ${pid} (was on :${port})`);
    } catch (err) {
      console.error(`Could not kill PID ${pid}:`, err.message);
    }
  }
}

if (process.platform === 'win32') killWindows();
else killUnix();
