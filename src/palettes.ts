import { Colour, ColourName, ColourHSL, HSLtoRGB, hex, Palette } from './colour';

interface srcPalette {
	bg?: number;
	primary: number;
	comp: number;
	extra: number;
	error: number;
	warn: number;
	hint: number;
}

const lightness = [0.6, 0.7, 0.8, 0.9, 0.95];
const bgLightness = [0.13, 0.16, 0.2];
const saturation = 0.6;

function HSLtoColour(hsl: ColourHSL): Colour {
	return { hsl, rgb: HSLtoRGB(hsl), hex: hex(hsl) };
}

const palette = (
	name: string,
	{ bg, primary, comp, extra, error = 0, warn = 45, hint = 210 }: srcPalette,
	bgSaturation = 0.18
): [string, Palette] => {
	if (!bg || isNaN(bg)) bg = primary;
	const hslValues: Record<ColourName, ColourHSL> = {
		background0: [bg, bgSaturation, bgLightness[0]],
		background1: [bg, bgSaturation, bgLightness[1]],
		background2: [bg, bgSaturation, bgLightness[2]],

		plain: [primary, saturation, lightness[4]],

		primary0: [primary, saturation, lightness[0]],
		primary1: [primary, saturation, lightness[1]],
		primary2: [primary, saturation, lightness[2]],
		primary3: [primary, saturation, lightness[3]],

		complementary0: [comp, saturation, lightness[1]],
		complementary1: [comp, saturation, lightness[2]],

		extra0: [extra, saturation, lightness[0]],
		extra1: [extra, saturation, lightness[1]],
		extra2: [extra, saturation, lightness[2]],

		error: [error, saturation, lightness[0]],
		warn: [warn, saturation, lightness[0]],
		hint: [hint, saturation, lightness[0]],
	};

	const acc: Palette = {} as Palette;

	for (const key in hslValues) {
		acc[key as ColourName] = HSLtoColour(hslValues[key as ColourName]);
	}

	return [name, acc];
};

export const palettes = [
	palette('Rider', { bg: 350, primary: 330, comp: 270, extra: 215, error: 350, warn: 55, hint: 215 }),
	palette('Good Job', { bg: 200, primary: 32, comp: 200, extra: 350, error: 350, warn: 32, hint: 200 }, 0.11),
	palette('Slime', { primary: 195, comp: 50, extra: 280, error: 0, warn: 50, hint: 195 }, 0.36),
	palette('"Girl"', { bg: 340, primary: 0, comp: 150, extra: 35, error: 0, warn: 35, hint: 200 }, 0.11),
	palette('Bloody', { primary: 290, comp: 355, extra: 220, error: 355, warn: 55, hint: 220 }),
];
