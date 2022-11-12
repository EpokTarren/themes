import { Builder } from '../build';
import { ColourName } from '../colour';
import { normalize } from '../filenames';

const generate_common = (
	author: string,
	displayName: string,
	version: string,
	license: string,
	repository: string
) => `/*
* Author: ${author}
* Project: ${displayName}
* Version: ${version}
* Repository: ${repository}
* License: ${license}
**/

* {
	lightfg:                     @primary0;
	lightbg:                     @background1;

	background:                  @background0;
	foreground:                  @plain;
	background-color:            transparent;

	normal-background:           transparent;
	normal-foreground:           @foreground;

	placeholder:                 @primary3;
	border-color:                @primary0;
	separatorcolor:              @border-color;

	active-foreground:           @primary2;
	active-background:           transparent;

	selected-normal-foreground:  @primary0;
	selected-normal-background:  @background2;

	selected-active-foreground:  @background0;
	selected-active-background:  @background1;

	selected-urgent-background:  @error;
	selected-urgent-foreground:  @background;

	alternate-active-background: @lightfg;
	alternate-active-foreground: @primary0;

	alternate-urgent-background: @lightbg;
	alternate-urgent-foreground: @error;

	urgent-foreground:           @error;
	urgent-background:           @background;

	alternate-normal-foreground: @foreground;
	alternate-normal-background: transparent;
}

element {
	border:  0;
	padding: 1px;
	spacing: 5px;
	cursor:  pointer;
}

element normal.normal {
	background-color: @normal-background;
	text-color:       @normal-foreground;
}

element normal.urgent {
	background-color: @urgent-background;
	text-color:       @urgent-foreground;
}

element normal.active {
	background-color: @active-background;
	text-color:       @active-foreground;
}

element selected.normal {
	background-color: @selected-normal-background;
	text-color:       @selected-normal-foreground;
}

element selected.urgent {
	background-color: @selected-urgent-background;
	text-color:       @selected-urgent-foreground;
}

element selected.active {
	background-color: @selected-active-background;
	text-color:       @selected-active-foreground;
}
element alternate.normal {
	background-color: @alternate-normal-background;
	text-color:       @alternate-normal-foreground;
}

element alternate.urgent {
	background-color: @alternate-urgent-background;
	text-color:       @alternate-urgent-foreground;
}

element alternate.active {
	background-color: @alternate-active-background;
	text-color:       @alternate-active-foreground;
}

element-text {
	background-color: transparent;
	cursor:           inherit;
	highlight:        inherit;
	text-color:       inherit;
}

window {
	padding:          4;
	background-color: @background;
	border:           0;
	border-radius:    0.25em;
}

mainbox {
	padding: 0;
	border:  0;
}

message {
	padding:      1px;
	border-color: @separatorcolor;
	border:       1px dash 0px 0px;
}

textbox {
	text-color: @foreground;
}

listview {
	padding:      2px 0px 0px;
	scrollbar:    false;
	border-color: @separatorcolor;
	spacing:      2px;
	fixed-height: 0;
	border:       1px dash 0px 0px;
}

sidebar {
	border-color: @separatorcolor;
	border:       1px dash 0px 0px;
}

button {
	cursor:     pointer;
	spacing:    0;
	text-color: @normal-foreground;
}

button selected {
	background-color: @selected-normal-background;
	text-color:       @selected-normal-foreground;
}

inputbar {
	padding:    1px;
	spacing:    0px;
	text-color: @normal-foreground;
	children:   [ "entry" ];
}

entry {
	text-color:        @normal-foreground;
	cursor:            text;
	spacing:           0;
	placeholder-color: @placeholder;
	placeholder:       "search";
}`;

const generate: Builder = (palettes, { author, displayName, version, repository, license }) => {
	const head = (name: string) => `/*
 * Author: ${author}
 * Project: ${displayName}
 * Version: ${version}
 * Repository: ${repository.url}
 * License: ${license}
 * Colour Scheme: ${name}
 **/
`;

	const common = {
		path: 'common.rasi',
		content: generate_common(author, displayName, version, license, repository.url),
	};

	return palettes
		.map(([name, palette]) => {
			const body = Object.keys(palette)
				.map((colour) =>
					colour.startsWith('background')
						? `${colour}: ${palette[colour as ColourName].hex}cc;`
						: `${colour}: ${palette[colour as ColourName].hex};`
				)
				.join('\n\t');

			return {
				path: `${normalize(name)}.rasi`,
				content: `${head(name)}\n* {\n\t${body}\n}\n\n@import "common"`,
			};
		})
		.concat([common]);
};

export = generate;
