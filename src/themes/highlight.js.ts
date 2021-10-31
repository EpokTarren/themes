import { ColourName, Mappings } from '../colour';
import { cssTheme } from '../css';

const baseCSS = (colours: Record<ColourName, string>) => `.hljs {
	display: block;
	overflow-x: auto;
	padding: 0.5em;
	background-color: ${colours.background0};
	color: ${colours.plain};
}

.hljs-comment {
	font-style: italic;
	opacity: 0.5;
}

.hljs-strong {
	font-style: bold;
}

.hljs-emphasis {
	font-style: italic;
}\n\n`;

const mappings: Mappings = {
	plain: ['variable', 'params', 'code', 'comment'],

	primary0: [
		'class',
		'title',
		'function',
		'emphasis',
		'strong',
		'selector-tag',
		'selector-id',
		'selector-class',
		'selector-attr',
		'selector-pseudo',
		'section',
		'deletion',
	],
	primary1: ['formula', 'link'],
	primary3: ['operator', 'doctag', 'meta', 'name', 'builtin-name', 'attr', 'attribute', 'quote'],

	complementary0: ['template-tag', 'template-variable', 'addition'],
	complementary1: ['string', 'punctuation', 'subst', 'tag', 'bullet'],

	extra0: ['built_in', 'literal', 'type', 'number', 'symbol', 'meta-keyword'],
	extra2: ['keyword', 'regexp', 'meta-string'],

	background0: [],
};

for (const key in mappings) mappings[key as ColourName] = mappings[key as ColourName]!.map((c) => `.hljs-${c}`);

export = cssTheme('hljs', baseCSS, mappings);
