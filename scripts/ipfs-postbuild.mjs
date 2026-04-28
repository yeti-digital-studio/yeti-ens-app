import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = new URL('../dist', import.meta.url).pathname;

const fileExtensions = new Set(['.html', '.css', '.js']);

async function walk(dir) {
    const entries = await readdir(dir);

    for (const entry of entries) {
        const fullPath = join(dir, entry);
        const info = await stat(fullPath);

        if (info.isDirectory()) {
            await walk(fullPath);
            continue;
        }

        if (![...fileExtensions].some((ext) => fullPath.endsWith(ext))) {
            continue;
        }

        let content = await readFile(fullPath, 'utf8');

        content = content
            .replaceAll('href="/_astro/', 'href="./_astro/')
            .replaceAll('src="/_astro/', 'src="./_astro/')
            .replaceAll('url(/_astro/', 'url(./_astro/')
            .replaceAll('href="/favicon', 'href="./favicon')
            .replaceAll('src="/favicon', 'src="./favicon');

        await writeFile(fullPath, content);
    }
}

await walk(distDir);

console.log('Rewrote Astro asset paths for IPFS path gateway compatibility.');