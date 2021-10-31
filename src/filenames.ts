export const normalize = (name: string, lowercase = true): string =>
	(lowercase ? name.toLowerCase() : name).replace(/\s+/g, '-').replace(/[^\w-.@]/g, '');

const shortNames = {
	background: 'bg',
	primary: 'fg',
	complementary: 'co',
	extra: 'ex',
	plain: 'txt',
	error: 'err',
	comment: 'c',
	line: 'ln',
};

export const shortName = (identifer: string): string =>
	identifer.replace(/[a-z]+/g, (m) => shortNames[m as keyof typeof shortNames] ?? m);
