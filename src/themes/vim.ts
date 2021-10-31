// @ts-ignore
import x256 from 'x256';
import { Builder } from '../build';
import { shortName } from '../filenames';
import { ColourName, ColourHSL, ColourRGB, hex, Palette } from '../colour';

type Style =
	| 'bold'
	| 'underline'
	| 'undercurl'
	| 'strikethrough'
	| 'reverse'
	| 'inverse'
	| 'italic'
	| 'standout'
	| 'nocombine'
	| 'none';

interface Mapping {
	name: string;
	style?: Style;
	fg?: ColourName | 'line' | 'comment' | 'none';
	bg?: ColourName | 'line' | 'comment' | 'none';
}

const mappings: Mapping[] = [
	// Editor settings
	{ name: 'Normal', fg: 'plain', bg: 'background0', style: undefined },
	{ name: 'Cursor', fg: 'plain', bg: undefined, style: undefined },
	{ name: 'CursorLine', fg: 'plain', bg: 'background2', style: undefined },
	{ name: 'LineNr', fg: 'line', bg: 'background0', style: undefined },
	{ name: 'CursorLineNR', fg: 'plain', bg: 'background2', style: undefined },

	// Number column
	{ name: 'CursorColumn', fg: 'plain', bg: 'background2', style: undefined },
	{ name: 'FoldColumn', fg: 'plain', bg: 'background1', style: undefined },
	{ name: 'SignColumn', fg: 'hint', bg: 'background1', style: undefined },
	{ name: 'Folded', fg: 'plain', bg: 'background1', style: undefined },

	// Window/Tab delimiters
	{ name: 'VertSplit', fg: 'comment', bg: 'background2', style: undefined },
	{ name: 'ColorColumn', fg: 'background1', bg: 'hint', style: undefined },
	{ name: 'TabLine', fg: 'plain', bg: undefined, style: undefined },
	{ name: 'TabLineFill', fg: 'plain', bg: undefined, style: undefined },
	{ name: 'TabLineSel', fg: 'hint', bg: undefined, style: undefined },

	// File Navigation / Searching
	{ name: 'Directory', fg: 'primary0', bg: undefined, style: undefined },
	{ name: 'Search', fg: 'plain', bg: 'background2', style: undefined },
	{ name: 'IncSearch', fg: 'background1', bg: 'plain', style: 'strikethrough' },

	// Prompt/Status
	{ name: 'StatusLine', fg: 'background1', bg: 'primary1', style: undefined },
	{ name: 'StatusLineNC', fg: 'background1', bg: 'primary0', style: undefined },
	{ name: 'WildMenu', fg: 'none', bg: 'hint', style: undefined },
	{ name: 'Question', fg: 'none', bg: 'hint', style: undefined },
	{ name: 'Title', fg: 'plain', bg: undefined, style: undefined },
	{ name: 'ModeMsg', fg: 'plain', bg: undefined, style: undefined },
	{ name: 'MoreMsg', fg: 'hint', bg: undefined, style: undefined },

	// Visual aid
	{ name: 'MatchParen', fg: 'plain', bg: 'background1', style: undefined },
	{ name: 'Visual', fg: 'plain', bg: undefined, style: undefined },
	{ name: 'VisualNOS', fg: 'plain', bg: undefined, style: undefined },
	{ name: 'NonText', fg: 'line', bg: undefined, style: undefined },

	{ name: 'Todo', fg: 'error', bg: 'none', style: 'bold' },
	{ name: 'Underlined', fg: 'plain', bg: undefined, style: 'underline' },
	{ name: 'Error', fg: 'error', bg: undefined, style: 'undercurl' },
	{ name: 'ErrorMsg', fg: 'error', bg: undefined, style: 'undercurl' },
	{ name: 'WarningMsg', fg: 'warn', bg: undefined, style: 'undercurl' },
	{ name: 'Ignore', fg: 'plain', bg: undefined, style: undefined },
	{ name: 'SpecialKey', fg: 'hint', bg: undefined, style: undefined },

	// Variable types
	{ name: 'Constant', fg: 'plain', bg: undefined, style: undefined },
	{ name: 'String', fg: 'complementary1', bg: undefined, style: undefined },
	{ name: 'StringDelimiter', fg: 'complementary1', bg: undefined, style: undefined },
	{ name: 'Character', fg: 'complementary1', bg: undefined, style: undefined },
	{ name: 'Number', fg: 'extra0', bg: undefined, style: undefined },
	{ name: 'Boolean', fg: 'extra0', bg: undefined, style: undefined },
	{ name: 'Float', fg: 'extra0', bg: undefined, style: undefined },

	{ name: 'Identifier', fg: 'primary0', bg: undefined, style: undefined },
	{ name: 'Function', fg: 'primary0', bg: undefined, style: undefined },

	// Language constructs
	{ name: 'Statement', fg: 'extra2', bg: undefined, style: undefined },
	{ name: 'Conditional', fg: 'extra2', bg: undefined, style: undefined },
	{ name: 'Repeat', fg: 'extra2', bg: undefined, style: undefined },
	{ name: 'Label', fg: 'extra2', bg: undefined, style: undefined },
	{ name: 'Operator', fg: 'primary0', bg: undefined, style: undefined },
	{ name: 'Keyword', fg: 'extra2', bg: undefined, style: undefined },
	{ name: 'Exception', fg: 'error', bg: undefined, style: undefined },
	{ name: 'Comment', fg: 'comment', bg: undefined, style: 'italic' },

	{ name: 'Special', fg: 'complementary1', bg: undefined, style: undefined },
	{ name: 'SpecialChar', fg: 'complementary1', bg: undefined, style: undefined },
	{ name: 'Tag', fg: 'extra2', bg: undefined, style: undefined },
	{ name: 'Delimiter', fg: 'hint', bg: undefined, style: undefined },
	{ name: 'SpecialComment', fg: 'primary1', bg: undefined, style: undefined },
	{ name: 'Debug', fg: 'comment', bg: undefined, style: undefined },

	// C like
	{ name: 'PreProc', fg: 'comment', bg: undefined, style: undefined },
	{ name: 'Include', fg: 'extra2', bg: undefined, style: undefined },
	{ name: 'Define', fg: 'extra2', bg: undefined, style: undefined },
	{ name: 'Macro', fg: 'extra2', bg: undefined, style: undefined },
	{ name: 'PreCondit', fg: 'extra2', bg: undefined, style: undefined },

	{ name: 'Type', fg: 'primary1', bg: undefined, style: undefined },
	{ name: 'StorageClass', fg: 'primary1', bg: undefined, style: undefined },
	{ name: 'Structure', fg: 'primary1', bg: undefined, style: undefined },
	{ name: 'Typedef', fg: 'primary1', bg: undefined, style: undefined },

	// Diff
	{ name: 'DiffAdd', fg: 'hint', bg: undefined, style: undefined },
	{ name: 'DiffChange', fg: 'warn', bg: undefined, style: undefined },
	{ name: 'DiffDelete', fg: 'error', bg: undefined, style: undefined },
	{ name: 'DiffText', fg: 'plain', bg: undefined, style: undefined },

	// Completion
	{ name: 'Pmenu', fg: 'plain', bg: 'background1', style: undefined },
	{ name: 'PmenuSel', fg: 'plain', bg: 'background2', style: undefined },
	{ name: 'PmenuSbar', fg: 'plain', bg: 'background1', style: undefined },
	{ name: 'PmenuThumb', fg: 'plain', bg: 'background2', style: undefined },

	// Spelling
	{ name: 'SpellBad', fg: 'error', bg: undefined, style: 'undercurl' },
	{ name: 'SpellCap', fg: 'hint', bg: undefined, style: 'undercurl' },
	{ name: 'SpellLocal', fg: 'plain', bg: undefined, style: undefined },
	{ name: 'SpellRare', fg: 'plain', bg: undefined, style: undefined },
];

const p = (a?: string) =>
	a ? `${a !== 'none' ? `s:${shortName(a)}, s:${shortName(a)}G` : "'NONE', 'NONE'"}` : "'', ''";

const mappingToString = (m: Mapping): string =>
	[`call s:Hi('${m.name}'`, p(m.fg), p(m.bg), `'${m.style || ''}'`].reduce((acc, v) => `${acc}, ${v}`) + ')';

function colour8bit([r, g, b]: ColourRGB) {
	return x256(r, g, b);
}

function halveLightness([h, s, l]: ColourHSL): ColourHSL {
	return [h, s / 2, l / 2];
}

const colourVariables = ([name, palette]: [string, Palette]) => `if g:theme_style == '${name}'${Object.keys(
	palette
).reduce(
	(acc, key) =>
		acc +
		`\n  let s:${shortName(key)} = ${colour8bit(palette[key as ColourName].hsl)}` +
		`\n  let s:${shortName(key)}G = '${hex(palette[key as ColourName].hsl)}'`,
	''
)}
  let s:c = ${colour8bit(halveLightness(palette.plain.hsl))}
  let s:cG = '${hex(halveLightness(palette.plain.hsl))}'
  let s:ln = ${colour8bit(halveLightness(palette.extra0.hsl))}
  let s:lnG = '${hex(halveLightness(palette.extra0.hsl))}'
`;

const generateColourVariables = (palettes: [string, Palette][]) => `" Default colours, Rider theme

${palettes
	.filter(([name]) => name !== 'Rider')
	.map(colourVariables)
	.reduce((acc) => acc)
	.replace(/if.*| {2}/g, '')
	.trim()}

" Colours depending on what theme style is set

${palettes
	.filter(([name]) => name !== 'Rider')
	.map(colourVariables)
	.reduce((acc, v) => `${acc}else${v}`)
	.trim()}
endif`;

const highlighting = (head: string, colours: string, body: string) => `${head}

" Clear previously set colours

highlight clear

set background=dark

if exists("syntax_on")
    syntax reset
endif

let g:colors_name="tarren"

" Helper highlight function
function! s:Hi(name, termFg, guiFg, termBg, guiBg, style)
    let l:script = 'hi ' . a:name

    if (a:termFg != '')
        let l:script = l:script . ' ctermfg=' . a:termFg
		let l:script = l:script . ' guifg=' . a:guiFg
    endif

    if (a:termBg != '')
        let l:script = l:script . ' ctermbg=' . a:termBg
		let l:script = l:script . ' guibg=' . a:guiBg
    endif

    if (a:style != '')
        let l:script = l:script . ' cterm=' . a:style
    endif

    exec l:script
endfunction

${colours}

${body}`;

const airline = (head: string, colours: string) => `${head}

${colours}

let g:airline#themes#tarren#palette = {}

let s:leftNormal = [ s:bg0G , s:fg0G , s:bg0 , s:fg0 ]
let s:middleNormal = [ s:fg3G , s:bg1G , s:fg3 , s:bg1 ]
let s:rightNormal = [ s:fg3G , s:bg0G , s:fg2 , s:bg0 ]
let s:warnNormal = [ s:bg0G , s:warnG , s:bg0 , s:warn ]
let s:errorNormal = [ s:bg0G , s:errG , s:bg0 , s:err ]

let g:airline#themes#tarren#palette.normal = airline#themes#generate_color_map(s:leftNormal, s:middleNormal, s:rightNormal)
let g:airline#themes#tarren#palette.normal_modified = {
      \\ 'airline_c': [ s:rightNormal[0], s:bg2G, s:rightNormal[2], s:bg2, '' ],
      \\ }
let g:airline#themes#tarren#palette.normal.airline_warning = s:warnNormal
let g:airline#themes#tarren#palette.normal.airline_error = s:errorNormal

let s:airline_a_insert = [ s:leftNormal[0], s:ex1G, s:leftNormal[2], s:ex1 ]
let s:airline_b_insert = s:middleNormal
let s:airline_c_insert = s:rightNormal

let g:airline#themes#tarren#palette.insert = airline#themes#generate_color_map(s:airline_a_insert, s:airline_b_insert, s:airline_c_insert)
let g:airline#themes#tarren#palette.insert_modified = g:airline#themes#tarren#palette.normal_modified
let g:airline#themes#tarren#palette.insert_paste = {
      \\ 'airline_a': [ s:airline_a_insert[0], s:ex0G, s:airline_a_insert[2], s:ex0, '' ],
      \\ }
let g:airline#themes#tarren#palette.insert.airline_warning = s:warnNormal
let g:airline#themes#tarren#palette.insert.airline_error = s:errorNormal

let g:airline#themes#tarren#palette.terminal = airline#themes#generate_color_map(s:airline_a_insert, s:airline_b_insert, s:airline_c_insert)

let g:airline#themes#tarren#palette.replace = copy(g:airline#themes#tarren#palette.insert)
let g:airline#themes#tarren#palette.replace.airline_a = [ s:fg1G, s:bg2G, s:fg1, s:bg2, '' ]
let g:airline#themes#tarren#palette.replace_modified = g:airline#themes#tarren#palette.insert_modified
let g:airline#themes#tarren#palette.replace.airline_warning = s:warnNormal
let g:airline#themes#tarren#palette.replace.airline_error = s:errorNormal


let s:airline_a_visual = [ s:leftNormal[0], s:co0G, s:leftNormal[2], s:co0 ]
let s:airline_b_visual = s:middleNormal
let s:airline_c_visual = s:rightNormal
let g:airline#themes#tarren#palette.visual = airline#themes#generate_color_map(s:airline_a_visual, s:airline_b_visual, s:airline_c_visual)
let g:airline#themes#tarren#palette.visual_modified = g:airline#themes#tarren#palette.normal_modified
let g:airline#themes#tarren#palette.visual.airline_warning = s:warnNormal
let g:airline#themes#tarren#palette.visual.airline_error = s:errorNormal

let s:airline_a_inactive = [ s:leftNormal[0], s:fg3G, s:leftNormal[2], s:fg3 ]
let s:airline_b_inactive = s:middleNormal
let s:airline_c_inactive = s:rightNormal
let g:airline#themes#tarren#palette.inactive = airline#themes#generate_color_map(s:airline_a_inactive, s:airline_b_inactive, s:airline_c_inactive)
let g:airline#themes#tarren#palette.inactive_modified = g:airline#themes#tarren#palette.normal_modified
let g:airline#themes#tarren#palette.inactive.airline_warning = s:warnNormal
let g:airline#themes#tarren#palette.inactive.airline_error = s:errorNormal

let s:airline_a_commandline = [ s:leftNormal[0], s:txtG, s:leftNormal[2], s:txt ]
let s:airline_b_commandline = s:middleNormal
let s:airline_c_commandline = s:rightNormal
let g:airline#themes#tarren#palette.commandline = airline#themes#generate_color_map(s:airline_a_commandline, s:airline_b_commandline, s:airline_c_commandline)
let g:airline#themes#tarren#palette.commandline.airline_warning = s:warnNormal
let g:airline#themes#tarren#palette.commandline.airline_error = s:errorNormal

let g:airline#themes#tarren#palette.accents = { 'red': [ s:errG, '', s:err, '' ] }`;

const generate: Builder = (palettes, { author, displayName, version, repository, license }) => {
	const head = `" Author: ${author}
" Project: ${displayName}
" Version: ${version}
" Repository: ${repository.url}
" License: ${license}`;

	const colours = generateColourVariables(palettes);

	const mapped = mappings.map(mappingToString).reduce((acc, v) => `${acc}\n${v}`);

	return [
		{ path: 'colors/tarren.vim', content: highlighting(head, colours, mapped) },
		{ path: 'autoload/airline/themes/tarren.vim', content: airline(head, colours) },
	];
};

export = generate;
