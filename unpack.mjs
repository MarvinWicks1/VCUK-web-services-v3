import { readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const files = readdirSync('.');
const partNames = files.filter((name) => /^site\.part\.\d+$/.test(name)).sort();

const base64 = partNames.map((part) => {
  const subParts = files
    .filter((name) => name.startsWith(`${part}.`))
    .sort();

  if (subParts.length > 0) {
    return subParts.map((subPart) => readFileSync(subPart, 'utf8')).join('');
  }

  return readFileSync(part, 'utf8');
}).join('');

writeFileSync('/tmp/vcuk-site.tar.gz', Buffer.from(base64, 'base64'));
execFileSync('tar', ['-xzf', '/tmp/vcuk-site.tar.gz'], { stdio: 'inherit' });
rmSync('/tmp/vcuk-site.tar.gz', { force: true });
