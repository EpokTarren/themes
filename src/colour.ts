export type ColourHSL = [hue: number, saturation: number, lightness: number];

export type ColourRGB = [red: number, green: number, blue: number];

export interface Colour {
	hsl: ColourHSL;
	rgb: ColourRGB;
	hex: string;
}

export interface Palette {
	background0: Colour;
	background1: Colour;
	background2: Colour;
	plain: Colour;
	primary0: Colour;
	primary1: Colour;
	primary2: Colour;
	primary3: Colour;
	complementary0: Colour;
	complementary1: Colour;
	extra0: Colour;
	extra1: Colour;
	extra2: Colour;
	error: Colour;
	warn: Colour;
	hint: Colour;
}

export type ColourName = keyof Palette;

export type Mappings = Partial<Record<ColourName, string[]>>;

function clamp(n: number, min: number, max: number): number {
	return Math.min(Math.max(min, n), max);
}

export function HSLtoRGB([h, s, l]: ColourHSL, [rMax, gMax, bMax] = [255, 255, 255]): ColourRGB {
	h = (Math.abs(h) % 360) / 60;
	const C = (1 - Math.abs(2 * l - 1)) * s;
	const X = C * (1 - Math.abs((h % 2) - 1));
	const m = l - C / 2;
	let red, green, blue;

	if (h < 1) [red, green, blue] = [C, X, 0];
	else if (h < 2) [red, green, blue] = [X, C, 0];
	else if (h < 3) [red, green, blue] = [0, C, X];
	else if (h < 4) [red, green, blue] = [0, X, C];
	else if (h < 5) [red, green, blue] = [X, 0, C];
	else [red, green, blue] = [C, 0, X];

	return [
		clamp(Math.round((red + m) * rMax), 0, rMax),
		clamp(Math.round((green + m) * gMax), 0, gMax),
		clamp(Math.round((blue + m) * bMax), 0, bMax),
	];
}

function hexDigit(n: number): string {
	return n.toString(16).padStart(2, '0');
}

export function hex(colour: ColourHSL) {
	const [r, g, b] = HSLtoRGB(colour);
	return `#${hexDigit(r)}${hexDigit(g)}${hexDigit(b)}`;
}

function colours<T>(f: (colour: [number, number, number]) => T, l: number) {
	return {
		red: f([0, 1, l]),
		yellow: f([45, 1, l]),
		green: f([120, 1, l]),
		cyan: f([170, 1, l]),
		blue: f([220, 1, l]),
		magenta: f([290, 1, l]),
	};
}

export const termColours = <T>(f: (colour: [number, number, number]) => T) => ({
	normal: {
		black: f([0, 0, 0.1]),
		white: f([0, 0, 0.85]),
		...colours(f, 0.7),
	},

	bright: {
		black: f([0, 0, 0.2]),
		white: f([0, 0, 0.95]),
		...colours(f, 0.8),
	},

	dim: {
		black: f([0, 0, 0.1]),
		white: f([0, 0, 0.85]),
		...colours(f, 0.6),
	},
});

export function as_hex(palette: Palette) {
	return {
		bg0: palette.background0.hex,
		bg1: palette.background1.hex,
		bg2: palette.background2.hex,

		plain: palette.plain.hex,

		primary0: palette.primary0.hex,
		primary1: palette.primary1.hex,
		primary2: palette.primary2.hex,
		primary3: palette.primary3.hex,

		comp0: palette.complementary0.hex,
		comp1: palette.complementary1.hex,

		extra0: palette.extra0.hex,
		extra1: palette.extra1.hex,
		extra2: palette.extra2.hex,

		error: palette.error.hex,
		warn: palette.warn.hex,
		hint: palette.hint.hex,
	};
}

export function halveLightness([h, s, l]: ColourHSL): ColourHSL {
	return [h, s / 2, l / 2];
}

export function lineNr([h, s, l]: ColourHSL): ColourHSL {
	return [h, s * (2 / 3), l * (2 / 3)];
}
