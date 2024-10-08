import { Builder } from '../build';
import { normalize } from '../filenames';
import { hex, termColours, as_hex } from '../colour';

interface Obj {
	[key: string]: string | Obj;
}

const stringify = (obj?: Obj | string, me = ''): string => {
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
