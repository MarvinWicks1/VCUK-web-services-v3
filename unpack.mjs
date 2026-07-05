import { readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const parts = readdirSync('.').filter((name) => /^site\.part\.\d+$/.test(name)).sort();
const base64 = parts.map((part) => readFileSync(part, 'utf8')).join('');
writeFileSync('/tmp/vcuk-site.tar.gz', Buffer.from(base64, 'base64'));
execFileSync('tar', ['-xzf', '/tmp/vcuk-site.tar.gz'], { stdio: 'inherit' });
rmSync('/tmp/vcuk-site.tar.gz', { force: true });
