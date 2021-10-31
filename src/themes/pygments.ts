import { ColourName, Mappings } from '../colour';
import { cssTheme } from '../css';

const baseCSS = (colours: Record<ColourName, string>) => `pre, code {
	line-height: 125%;
	display: block;
	overflow-x: auto;
	padding: 0.5em;
	background-color: ${colours.background0};
	color: ${colours.plain};
}

td.linenos .normal, span.linenos {
	color: inherit;
	background-color: transparent;
	padding-left: 5px;
	padding-right: 5px;
}

td.linenos .special, span.linenos.special {
	background-color: ${colours.background0};
	padding-left: 5px;
	padding-right: 5px;
}

${tokens.comment} {
	opacity: 0.5;
	font-style: italic;
}

${tokens.directive} {
	opacity: 0.75;
}

${tokens.strong} {
	font-weight: bold;
}

${tokens.emphasis} {
	font-style: italic;
}\n\n`;

const tokens = {
	text: 'td.linenos, span.linenos.special',
	error: '.err, .gr, .gt',

	other: '.x',
	punctuation: '.p',
	whitespace: '.w',

	comment: '.c, .ch, .cm, .c1, .cs',
	directive: '.cp, .cpf',

	generic: '.g',
	deleted: '.gd',
	emphasis: '.ge',
	strong: '.gs',
	heading: '.gh, .gu',
	inserted: '.gi',
	output: '.go, .gp',

	keyword: '.k, .kd',
	const: '.kc',
	pseudo: '.kp',
	type: '.kt, .kr',

	literal: '.l',
	date: '.ld',

	name: '.n, .py, .nx',
	attribute: '.na',
	builtin: '.nb',
	class: '.nc, .vc',
	constant: '.no',
	decorator: '.nd',
	entity: '.ni',
	exception: '.ne',
	function: '.nf, .fm',
	label: '.nl',
	namespace: '.nn, .kn',
	tag: '.nt',
	variable: '.nv, .vm, .vg',
	this: '.bp',
	classInstance: '.vi',

	operator: '.o, .ow',

	number: '.m, .mb, .mf, .mh, .mi, .mo, .il',

	string: '.s, .sb, .sc, .sd, .s2, .sh, .s1',
	affix: '.sa',
	delimiter: '.dl',
	substring: '.se, .si, .ss',
	link: '.sx',
	regex: '.sr',
};

const mappings: Mappings = {
	plain: [
		tokens.text,
		tokens.delimiter,
		tokens.constant,
		tokens.variable,
		tokens.classInstance,
		tokens.delimiter,
		tokens.comment,
		tokens.generic,
		tokens.output,
	],

	primary0: [
		tokens.name,
		tokens.class,
		tokens.decorator,
		tokens.exception,
		tokens.function,
		tokens.class,
		tokens.emphasis,
		tokens.strong,
		tokens.error,
		tokens.heading,
		tokens.link,
		tokens.tag,
	],
	primary3: [tokens.attribute, tokens.operator, tokens.operator, tokens.substring, tokens.punctuation],

	complementary1: [tokens.string, tokens.directive],

	extra0: [
		tokens.constant,
		tokens.builtin,
		tokens.entity,
		tokens.label,
		tokens.namespace,
		tokens.literal,
		tokens.number,
	],
	extra1: [tokens.namespace, tokens.type, tokens.pseudo],
	extra2: [tokens.keyword, tokens.this, tokens.this, tokens.affix, tokens.regex],

	error: [tokens.deleted],
	hint: [tokens.inserted],

	background0: [],
};

export = cssTheme('hljs', baseCSS, mappings);
