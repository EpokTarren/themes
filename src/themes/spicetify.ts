import { Builder } from '../build';
import { normalize } from '../filenames';
import { ColourName, Mappings, Palette } from '../colour';

const mappings: Mappings = {
	plain: ['text'],

	primary0: ['button', 'notification-error'],
	primary3: ['subtext', 'selected-row', 'button-active'],

	background0: ['main', 'player', 'sidebar', 'shadow', 'notification', 'misc'],
	background2: ['card', 'tab-active', 'button-disabled'],
};

for (const key in mappings) mappings[key as ColourName] = mappings[key as ColourName]!.map((v) => v.padEnd(18, ' '));

function theme([name, palette]: [string, Palette]) {
	let colors = `\n[${normalize(name, false)}]\n`;

	for (const key in mappings)
		colors += mappings[key as ColourName]!.reduce(
			(acc, v) => `${acc}${v} = ${palette[key as ColourName].hex.replace('#', '')}\n`,
			''
		);

	return colors;
}

const generate: Builder = (palettes, pkg, licenseHeader) => {
	return [
		{
			path: 'color.ini',
			content: palettes.reduce(
				(acc, v) => acc + theme(v),
				licenseHeader
					.split('\n')
					.map((v) => '; ' + v)
					.join('\n') + '\n'
			),
		},
	];
};

export = generate;
