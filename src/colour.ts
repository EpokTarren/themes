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
