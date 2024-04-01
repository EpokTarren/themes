import { Builder } from '../build';
import { normalize } from '../filenames';
import { hex, termColours } from '../colour';

type Member = string | number | boolean | TOML | Member[] | null;
interface TOML {
	[key: string]: Member;
}

const stringify_toml = (obj?: Member, me?: string): string => {
	if (obj === undefined || obj === null) return 'None';

	switch (typeof obj) {
		case 'string':
			return `"${obj.replace('"', '\\"')}"`;
		case 'number':
			return String(obj);
		case 'boolean':
			return obj ? 'true' : 'false';
		case 'object': {
			if (Array.isArray(obj)) throw new Error('Arrays are currently unsupported');

			let res = me ? `\n[${me}]\n` : '\n';
			const defer = [];

			for (const key in obj) {
				if (typeof obj[key] == 'object') defer.push(key);
				else res += `${key} = ${stringify_toml(obj[key])}\n`;
			}

			for (const key of defer) {
				res += stringify_toml(obj[key], me ? `${me}.${key}` : key);
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
# Colour Scheme: ${name}`;

	return palettes.map(([name, palette]) => ({
		path: normalize(name) + '.toml',
		content:
			head(name) +
			stringify_toml({
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
						start: {
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
