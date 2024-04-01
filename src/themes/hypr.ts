import { Builder } from '../build';
import { normalize } from '../filenames';
import { hex, termColours, Palette } from '../colour';

interface Obj {
	[key: string]: string | Obj;
}

const stringify = (obj?: string | Obj, me = ''): string => {
	switch (typeof obj) {
		case 'string':
			return obj.replace(/^#/, '');
		case 'object': {
			if (Array.isArray(obj)) throw new Error('Arrays are unsupported');

			let res = '';

			for (const key in obj) {
				const name = `${me}${key.replace(/^./, (c) => c.toUpperCase())}`;

				if (typeof obj[key] == 'object') res += stringify(obj[key], name);
				else res += `$${name} = ${stringify(obj[key])}\n`;
			}

			return res + '\n';
		}
		default: {
			throw new Error('Unsupported type');
		}
	}
};

function as_hex(palette: Palette) {
	return {
		bg0: palette.background0.hex,
		bg1: palette.background1.hex,
		bg2: palette.background2.hex,

		plain: palette.plain.hex,

		primary0: palette.primary0.hex,
		primary1: palette.primary1.hex,
		primary2: palette.primary2.hex,
		primary3: palette.primary3.hex,

		comp0: palette.complementary0.hex,
		comp1: palette.complementary1.hex,

		extra0: palette.extra0.hex,
		extra1: palette.extra1.hex,
		extra2: palette.extra2.hex,

		error: palette.error.hex,
		warn: palette.warn.hex,
		hint: palette.hint.hex,
	};
}

const generate: Builder = (palettes, { author, displayName, version, repository, license }) => {
	const head = (name: string) => `# Author: ${author}
# Project: ${displayName}
# Version: ${version}
# Repository: ${repository.url}
# License: ${license}
# Colour Scheme: ${name}\n\n`;

	return palettes
		.map(([name, palette]) => ({
			path: normalize(name) + '.conf',
			content: head(name) + stringify(as_hex(palette)).trimEnd(),
		}))
		.concat({
			path: 'terminal.conf',
			content: head('Terminal') + stringify(termColours(hex)).trimEnd(),
		});
};

export = generate;
