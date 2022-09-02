import { Builder } from '../build';
import { normalize } from '../filenames';
import { Palette, termColours, hex } from '../colour';

type Member = string | Obj;
interface Obj {
	[key: string]: Member;
}

const stringify = (obj: Member, level = 1): string => {
	switch (typeof obj) {
		case 'string':
			return `'${obj.replace("'", "\\'")}'`;
		case 'object': {
			let res = '{\n';

			for (const key in obj) {
				res += `${'\t'.repeat(level)}${normalize(key).replace('-', '_')} = ${stringify(obj[key], level + 1)},\n`;
			}

			return `${res}${'\t'.repeat(Math.max(0, level - 1))}}`;
		}
	}
};

function as_hex(palette: Palette) {
	return {
		background0: palette.background0.hex,
		background1: palette.background1.hex,
		background2: palette.background2.hex,

		plain: palette.plain.hex,

		primary0: palette.primary0.hex,
		primary1: palette.primary1.hex,
		primary2: palette.primary2.hex,
		primary3: palette.primary3.hex,

		complementary0: palette.complementary0.hex,
		complementary1: palette.complementary1.hex,

		extra0: palette.extra0.hex,
		extra1: palette.extra1.hex,
		extra2: palette.extra2.hex,

		error: palette.error.hex,
		warn: palette.warn.hex,
		hint: palette.hint.hex,
	};
}

const generate: Builder = (palettes, { author, displayName, version, repository, license }) => {
	const head = `-- Author: ${author}
-- Project: ${displayName}
-- Version: ${version}
-- Repository: ${repository.url}
-- License: ${license}\n\n`;

	const themes = palettes.reduce((acc: Obj, [name, palette]) => {
		acc[name] = as_hex(palette);
		return acc;
	}, {});
	const colours = termColours(hex);

	return [
		{
			path: 'colours.lua',
			content: head + `return ${stringify({ themes, colours })}`,
		},
	];
};

export = generate;
