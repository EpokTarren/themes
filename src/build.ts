import { Palette } from './colour';

export interface PKG {
	name: string;
	displayName: string;
	description: string;
	version: string;
	author: string;
	publisher: string;
	license: string;
	repository: {
		type: string;
		url: string;
	};
}

export type Builder = (
	palettes: [name: string, palette: Palette][],
	pkg: PKG,
	licenseHeader: string
) => { path: string; content: string }[];
