import { palettes } from './palettes';
import { Builder, PKG } from './build';
import { dirname, resolve } from 'path';
import { existsSync, mkdirSync, readdirSync, writeFileSync } from 'fs';

const pkg: PKG = require('../package.json');
const srcFolder = resolve(__dirname, 'themes');
const buildFolder = resolve(__dirname, '../themes');
const licenseHeader = `${pkg.displayName} v${pkg.version}
Copyright (c) 2021-2023 ${pkg.author}
Repository: ${pkg.repository}
License: ${pkg.license}`;

const themes = process.argv.slice(2);
for (const theme of themes.length > 0 ? themes : readdirSync(srcFolder)) {
	const themeName = theme.replace(/.js$/, '');

	console.log('Building', themeName);

	const builder: Builder = require(resolve(srcFolder, theme));
	const themeFolder = resolve(buildFolder, themeName);

	for (const { path, content } of builder(palettes, pkg, licenseHeader)) {
		const filepath = resolve(themeFolder, path);
		const dir = dirname(filepath);

		if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

		writeFileSync(filepath, content, { encoding: 'utf-8' });

		console.log(themeName, 'wrote to:', filepath);
	}

	console.log('-'.repeat(10));
}
