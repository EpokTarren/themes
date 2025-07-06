import { Builder } from '../build';
import { Colour, ColourName, halveLightness, hex, lineNr, termColours } from '../colour';
import { normalize } from '../filenames';

type Modifier =
	| 'bold'
	| 'dim'
	| 'italic'
	| 'underlined'
	| 'slow_blink'
	| 'rapid_blink'
	| 'reversed'
	| 'hidden'
	| 'crossed_out';

type BaseTermColour = 'black' | 'blue' | 'cyan' | 'green' | 'magenta' | 'red' | 'white' | 'yellow';
type TermColour = BaseTermColour | `light-${BaseTermColour}`;
type PaletteColour = ColourName | TermColour | 'comment' | 'line';

interface Mapping {
	name: string;

	value?: PaletteColour;
	fg?: PaletteColour;
	bg?: PaletteColour;

	underline?: {
		color?: PaletteColour;
		style?: 'line' | 'curl' | 'dashed' | 'dotted' | 'double_line';
	};

	modifiers?: Modifier[];
	children?: Mapping[];
}

const mappings: Mapping[] = [
	{ name: 'attribute', fg: 'extra1' },
	{ name: 'type', fg: 'extra1', children: [{ name: 'builtin', fg: 'complementary1' }] },
	{ name: 'constructor', fg: 'extra1' },

	{
		name: 'constant',
		fg: 'extra0',
		children: [
			{ name: 'builtin.boolean', fg: 'complementary1' },
			{ name: 'character', fg: 'complementary1' },
			{ name: 'numeric', fg: 'extra0' },
		],
	},

	{
		name: 'string',
		fg: 'complementary1',
		children: [
			{ name: 'regexp', fg: 'extra2' },
			{ name: 'special', fg: 'primary2' },
		],
	},

	{ name: 'comment', fg: 'comment', modifiers: ['italic'] },
	{ name: 'variable', fg: 'plain', children: [{ name: 'builtin', fg: 'complementary1' }] },
	{ name: 'label', fg: 'extra2' },
	{ name: 'punctuation', fg: 'complementary0' },
	{ name: 'keyword', fg: 'extra0', children: [{ name: 'operator', fg: 'primary0' }] },
	{ name: 'operator', fg: 'primary0' },

	{
		name: 'function',
		fg: 'primary0',
		children: [
			{ name: 'macro', fg: 'extra2' },
			{ name: 'special', fg: 'extra2' },
		],
	},
	{ name: 'tag', fg: 'extra2' },
	{ name: 'namespace', fg: 'extra1' },
	{ name: 'special', fg: 'complementary1' },

	{
		name: 'markup',
		fg: 'plain',
		children: [
			{ name: 'heading', fg: 'extra2', modifiers: ['bold'] },
			{ name: 'bold', fg: 'primary3', modifiers: ['bold'] },
			{ name: 'italic', fg: 'primary3', modifiers: ['italic'] },
			{ name: 'strikethrough', fg: 'primary3', modifiers: ['crossed_out'] },
			{
				name: 'url',
				fg: 'complementary1',
				underline: { color: 'complementary1', style: 'line' },
				children: [{ name: 'text', fg: 'plain', modifiers: [] }],
			},
			{ name: 'normal', fg: 'plain' },
		],
	},

	{
		name: 'diff',
		fg: 'plain',
		children: [
			{ name: 'plus', fg: 'green' },
			{ name: 'minus', fg: 'red' },
			{ name: 'delta', fg: 'yellow' },
		],
	},

	{
		name: '',
		children: [
			{ name: 'warning', fg: 'warn' },
			{ name: 'error', fg: 'error' },
			{ name: 'info', fg: 'primary2' },
			{ name: 'hint', fg: 'hint' },
		],
	},

	{
		name: 'diagnostic',
		fg: 'plain',
		children: [
			{ name: 'hint', underline: { color: 'hint', style: 'line' } },
			{ name: 'info', underline: { color: 'primary2', style: 'line' } },
			{ name: 'warning', underline: { color: 'warn', style: 'line' } },
			{ name: 'error', underline: { color: 'error', style: 'curl' } },
			{ name: 'unnecessary', fg: 'comment', underline: { style: 'line' } },
			{ name: 'deprecated', fg: 'plain', modifiers: ['dim', 'crossed_out'] },
		],
	},

	{ name: 'ui.background', fg: 'plain', bg: 'background0' },

	{
		name: 'ui.cursor',
		fg: 'comment',
		modifiers: ['reversed'],

		children: [
			{ name: 'match', fg: 'primary1', modifiers: ['underlined'] },
			{ name: 'primary', fg: 'plain', modifiers: ['reversed'] },
		],
	},

	{
		name: 'ui.debug',
		fg: 'error',
		children: [{ name: 'active', fg: 'hint' }],
	},

	{ name: 'ui.gutter', fg: 'plain', bg: 'background0' },

	{
		name: 'ui.linenr',
		fg: 'line',
		bg: 'background0',
		children: [{ name: 'selected', fg: 'extra0', bg: 'background0' }],
	},

	{
		name: 'ui.statusline',
		fg: 'plain',
		bg: 'background0',
		children: [
			{ name: 'inactive', fg: 'comment', bg: 'background1' },
			{ name: 'normal', fg: 'background0', bg: 'primary0', modifiers: ['bold'] },
			{ name: 'insert', fg: 'background0', bg: 'complementary0', modifiers: ['bold'] },
			{ name: 'select', fg: 'background0', bg: 'extra0', modifiers: ['bold'] },
		],
	},

	{
		name: 'ui.bufferline',
		fg: 'plain',
		bg: 'background0',
		children: [
			{ name: 'active', fg: 'background0', bg: 'primary0' },
			{ name: 'background', fg: 'plain', bg: 'background0' },
		],
	},

	{ name: 'ui.popup', fg: 'plain', bg: 'background0' },

	{
		name: 'ui.picker.header',
		fg: 'plain',
		bg: 'background0',
		children: [
			{ name: 'column', fg: 'primary3' },
			{ name: 'column.active', fg: 'primary0' },
		],
	},

	{ name: 'ui.help', fg: 'plain', bg: 'background0' },
	{
		name: 'ui.text',
		fg: 'plain',
		children: [
			{ name: 'focus', fg: 'primary3', modifiers: ['bold'] },
			{ name: 'inactive', fg: 'comment' },
			{ name: 'info', fg: 'plain', modifiers: ['bold'] },
		],
	},

	{
		name: 'ui.menu',
		fg: 'plain',
		bg: 'background0',
		children: [
			{ name: 'selected', fg: 'primary3', modifiers: ['bold'] },
			{ name: 'scroll', fg: 'plain', bg: 'background0' },
		],
	},

	{ name: 'ui.selection', bg: 'background2' },
];

function mappingToString(mapping: Mapping, parent?: string): string {
	const name = parent ? `${parent}.${mapping.name}` : mapping.name;
	const children = mapping.children?.map((m) => mappingToString(m, name)).join('') || '';

	const { fg, bg, underline, modifiers } = mapping;
	if (!fg && !bg && !underline && !modifiers) return children;

	const key = name.includes('.') ? `"${name}"` : name;
	const properties = [];
	if (mapping.fg) properties.push(`fg = "${mapping.fg}"`);
	if (mapping.bg) properties.push(`bg = "${mapping.bg}"`);
	if (mapping.modifiers) properties.push(`modifiers = ${JSON.stringify(mapping.modifiers)}`);
	if (mapping.underline) {
		const props = [];
		if (mapping.underline.color) props.push(`color = "${mapping.underline.color}"`);
		if (mapping.underline.style) props.push(`style = "${mapping.underline.style}"`);
		if (props.length > 0) properties.push(`underline = { ${props.join(', ')} }`);
	}

	if (properties.length == 0) return children;

	return `${key} = { ${properties.join(', ')} }\n${children}`;
}

function paletteString(palette: Record<string, string | Colour>): string {
	return Object.keys(palette)
		.map((key) => `${key} = "${(palette[key] as Partial<Colour>).hex || palette[key]}"`)
		.join('\n');
}

const generate: Builder = (palettes, { author, displayName, version, repository, license }) => {
	const term = termColours(hex);
	const header = `# Author: ${author}
# Project: ${displayName}
# Version: ${version}
# Repository: ${repository.url}
# License: ${license}`;

	const [name, palette] = palettes[0];
	const pathName = normalize(name).replace('-', '_');
	const content = `${header}
# Theme: ${name}

${mappings.map((m) => mappingToString(m)).join('\n')}
[palette]
${paletteString(term.normal)}
${paletteString(term.bright).replace(/\n|^/g, '\nlight-')}

${paletteString(palette as unknown as Record<string, Colour>)}
${paletteString({ comment: hex(halveLightness(palette.plain.hsl)), line: hex(lineNr(palette.extra0.hsl)) })}`;

	const derived = (name: string, a: string, b: string) =>
		`${header}\n# Theme: ${name}\ninherits = "${pathName}"\n\n[palette]\n${a}\n${b}`;

	return palettes
		.slice(1)
		.map(([name, palette]) => ({
			path: normalize(name).replace('-', '_') + '.toml',
			content: derived(
				name,
				paletteString(palette as unknown as Record<string, Colour>),
				paletteString({
					comment: hex(halveLightness(palette.plain.hsl)),
					line: hex(lineNr(palette.extra0.hsl)),
				})
			),
		}))
		.concat({ path: pathName + '.toml', content });
};

export = generate;
