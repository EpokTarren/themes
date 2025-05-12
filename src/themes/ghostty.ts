import { Builder } from '../build';
import { normalize } from '../filenames';
import { Colour, hex, termColours } from '../colour';

type Member = string | number | boolean | TOML | Member[] | null;
interface TOML {
	[key: string]: Member;
}

function stringify(values: { [key: string]: Colour | string }): string {
	return Object.keys(values)
		.map((v) => {
			let value = values[v];
			value = typeof value == 'string' ? value : value.hex;
			return `${v} = ${value}`;
		})
		.join('\n');
}

const term = termColours(hex);
const palette = `
palette =  0=${term.normal.black}
palette =  1=${term.normal.red}
palette =  2=${term.normal.green}
palette =  3=${term.normal.yellow}
palette =  4=${term.normal.blue}
palette =  5=${term.normal.magenta}
palette =  6=${term.normal.cyan}
palette =  7=${term.normal.white}
palette =  8=${term.bright.black}
palette =  9=${term.bright.red}
palette = 10=${term.bright.green}
palette = 11=${term.bright.yellow}
palette = 12=${term.bright.blue}
palette = 13=${term.bright.magenta}
palette = 14=${term.bright.cyan}
palette = 15=${term.bright.white}`;

const generate: Builder = (palettes, { author, displayName, version, repository, license }) => {
	const head = (name: string) => `# Author: ${author}
# Project: ${displayName}
# Version: ${version}
# Repository: ${repository.url}
# License: ${license}
# Colour Scheme: ${name}
${palette}

`;

	return palettes.map(([name, palette]) => ({
		path: normalize(name),
		content:
			head(name) +
			stringify({
				background: palette.background0,
				foreground: palette.plain,
				'cursor-color': palette.primary2,
				'cursor-text': palette.background0,
				'cursor-style': 'bar',
			}),
	}));
};

export = generate;
