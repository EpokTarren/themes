import { Builder } from '../build';
import { normalize } from '../filenames';
import { hex, termColours, Palette } from '../colour';

interface Obj {
	[key: string]: string | Obj;
}

const stringify = (obj?: Obj | Obj, me = ''): string => {
	switch (typeof obj) {
		case 'object': {
			if (Array.isArray(obj)) throw new Error('Arrays are unsupported');

			let res = '';

			for (const key in obj) {
				const name = me ? `${me}-${key}` : key;

				if (typeof obj[key] == 'object') res += stringify(obj[key] as Obj, name);
				else res += `@define-color ${name} ${obj[key]};\n`;
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

const generate: Builder = (palettes, _, license_header) => {
	license_header = license_header
		.split('\n')
		.map((v) => ' * ' + v)
		.join('\n');
	const header = (name: string) => `/*!\n${license_header}\n * Colour Scheme: ${name}\n */\n\n`;

	return palettes
		.map(([name, palette]) => ({
			path: normalize(name) + '.css',
			content: header(name) + stringify(as_hex(palette)).trimEnd(),
		}))
		.concat({
			path: 'terminal.css',
			content: header('Terminal') + stringify(termColours(hex)).trimEnd(),
		});
};

export = generate;
