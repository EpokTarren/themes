'use-strict';

import { Builder } from './build';
import { ColourName, Mappings, Palette } from './colour';
import { normalize, shortName } from './filenames';

function minify(css: string): string {
	const licenses = css.match(/\n?\/\*!(\n|.)*?\*\/\n?/g) || [''];

	return css
		.replace(/\/\*(?!!)(\n|.)*?\*\//g, '')
		.replace(/\w\s+{|\t|\n|:\s+.|,\s+./g, (m) => m.replace(/\s+/, ''))
		.replace(/;}/g, '}')
		.replace(/\/\*!.*?\*\//g, () => licenses.shift() || '')
		.trim();
}

export function cssTheme(
	name: string,
	baseCSS: (palette: Record<ColourName, string>) => string,
	mappings: Mappings
): Builder {
	return function (palettes, { version, author, license, repository }, licenseH) {
		const licenseHeader =
			'/*!\n' +
			licenseH
				.split('\n')
				.map((v) => ' * ' + v)
				.join('\n') +
			'\n */\n';
		let all = licenseHeader;

		const files: { path: string; content: string }[] = [];

		for (const [themeName, palette] of palettes) {
			const filename = normalize(themeName);

			all += `.${filename} {\n`;
			all += `\t--bgSat: ${palette.background0.hsl[1]};\n`;

			let css = '';

			const hslStrings: { [key: string]: string } = {};

			for (const colour in mappings) {
				const [h, s, l] = palette[colour as ColourName].hsl;
				const saturation = Math.floor(s * 100).toString() + '%';
				const lightness = Math.floor(l * 100).toString() + '%';
				const hsl = `hsl(${h}, ${saturation}, ${lightness})`;

				all += `\t--${shortName(colour.replace(/\d/g, ''))}: ${h};\n`;

				hslStrings[colour] = hsl;

				if (mappings[colour as ColourName]?.length)
					css += mappings[colour as ColourName]!.reduce((acc, v) => `${acc}, \n${v}`) + ` {\n\tcolor: ${hsl};\n}\n\n`;
			}

			css = licenseHeader + baseCSS(hslStrings as Record<ColourName, string>) + css;

			all += '}\n\n';

			files.push({ path: `dist/${filename}.css`, content: css.trim() });
			files.push({ path: `dist/${filename}-min.css`, content: minify(css) });
		}

		const hueStrings: { [k: string]: string } = {};

		const someColors = palettes[0][1];

		for (const colour in mappings) {
			const index = (
				colour === 'plain'
					? 'plain'
					: (colour.startsWith('background') ? 'background' : 'primary') + (parseInt(colour.replace(/\D/g, '')) || 0)
			) as 'primary0';

			let s = colour.startsWith('background')
				? 'var(--bgSat)'
				: Math.floor(someColors[index].hsl[1] * 100).toString() + '%';
			let l = someColors[index].hsl[2].toString();

			hueStrings[colour] = `hsl(var(--${shortName(colour).replace(/\d/, '')}), ${s}, ${l})`;
		}

		all += baseCSS(hueStrings as Record<ColourName, string>);

		for (const colour in mappings)
			if (mappings[colour as ColourName]?.length)
				all +=
					mappings[colour as ColourName]!.reduce((acc, v) => `${acc}, \n${v}`) +
					` {\n\tcolor: ${hueStrings[colour]};\n}\n\n`;

		files.push({ path: `dist/all.css`, content: all.trim() });
		files.push({ path: `dist/all-min.css`, content: minify(all) });

		const pkg = {
			name,
			version,
			author,
			license,
			repository,
			style: 'dist/all.css',
		};

		files.push({ path: 'package.json', content: JSON.stringify(pkg, undefined, '\t') });

		return files;
	};
}
