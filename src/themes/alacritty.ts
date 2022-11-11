import { Builder } from '../build';
import { normalize } from '../filenames';
import { hex, termColours } from '../colour';

type Member = string | number | boolean | YML | Member[] | null;
interface YML {
	[key: string]: Member;
}

const stringify = (obj?: Member, level = 0): string => {
	if (obj === undefined || obj === null) return 'None';

	switch (typeof obj) {
		case 'string':
			return `'${obj.replace("'", "\\'")}'`;
		case 'number':
			return String(obj);
		case 'boolean':
			return obj ? 'true' : 'false';
		case 'object': {
			if (Array.isArray(obj))
				return obj.map(stringify).reduce((acc, v) => `${acc}\n${' '.repeat(level * 2)}- ${v}`, '');

			let res = '\n';

			for (const key in obj) {
				res += `${' '.repeat(level * 2)}${key}: ${stringify(obj[key], level + 1)}\n`;
			}

			return res;
		}
	}
};

const base = termColours(hex);

const generate: Builder = (palettes, { author, displayName, version, repository, license }) => {
	const head = (name: string) => `# Author: ${author}
# Project: ${displayName}
# Version: ${version}
# Repository: ${repository.url}
# License: ${license}
# Colour Scheme: ${name}
`;

	return palettes.map(([name, palette]) => ({
		path: normalize(name) + '.yml',
		content:
			head(name) +
			stringify({
				colors: {
					primary: {
						background: palette.background0.hex,
						foreground: palette.plain.hex,
						dim_foreground: palette.primary0.hex,
						bright_foreground: palette.primary3.hex,
					},

					cursor: {
						text: palette.background0.hex,
						cursor: palette.primary2.hex,
					},

					line_indicator: {
						text: palette.background0.hex,
						cursor: palette.extra2.hex,
					},

					vi_mode_cursor: {
						text: palette.background0.hex,
						cursor: palette.extra2.hex,
					},

					search: {
						matches: {
							background: palette.background1.hex,
							foreground: palette.plain.hex,
						},

						focused_match: {
							background: palette.background2.hex,
							foreground: palette.primary0.hex,
						},
					},

					footer_bar: {
						background: palette.background0.hex,
						foreground: palette.hint.hex,
					},

					hints: {
						first: {
							background: palette.hint.hex,
							foreground: palette.background0.hex,
						},

						end: {
							background: palette.hint.hex,
							foreground: palette.background0.hex,
						},
					},

					...base,
				},
			})
				.split('\n')
				.map((line) => line.trimEnd())
				.join('\n')
				.trimEnd(),
	}));
};

export = generate;
