import { ThemeColor, blue, neutral, green, orange, red, gold } from './colors';

export interface GradientColor {
  light: { from: string; to: string };
  dark: { from: string; to: string };
}

export interface GradientDefinition {
    angle?: string; // e.g., '180deg', 'to right'
    stops: ThemeColor[]; // Array of color stops
}

// Using the new color objects. The build script will translate these to CSS.
export const neutralGradient: GradientColor = {
  light: { from: 'oklch(27.37% 0.068 276.29)', to: 'oklch(20.18% 0.0962 315.41)' },
  dark: { from: 'oklch(15.53% 0.075 316.25)', to: 'oklch(22.21% 0.0524 276.47)' },
};

export const blueGradient: GradientColor = {
  light: { from: blue.DEFAULT.light, to: 'oklch(58.49% 0.1438 244.29)' }, // Example: blue to a lighter blue
  dark: { from: blue.DEFAULT.dark, to: 'oklch(69.82% 0.1694 243.83)' }, // Example: dark blue to a lighter dark blue
};

export const blueGradientDarkened: GradientColor = {
  light: { from: 'oklch(48.57% 0.182 263.07)', to: 'oklch(54.04% 0.153 250.02)' },
  dark: { from: 'oklch(57.55% 0.1828 254.79)', to: 'oklch(65.46% 0.1583 243.94)' },
};

export const greenGradient: GradientColor = {
  light: { from: green.DEFAULT.light, to: 'oklch(60% 0.12 176.55)' },
  dark: { from: green.DEFAULT.dark, to: 'oklch(65% 0.17 167.35)' },
};

export const greenGradientDarkened: GradientColor = {
  light: { from: 'oklch(62.31% 0.0909 178.94)', to: 'oklch(68.73% 0.1184 180.55)' },
  dark: { from: 'oklch(71.42% 0.1457 167.35)', to: 'oklch(69.71% 0.1299 170.59)' },
};

export const orangeGradient: GradientColor = {
    light: { from: orange.DEFAULT.light, to: 'oklch(65% 0.22 41.13)' },
    dark: { from: orange.DEFAULT.dark, to: 'oklch(70% 0.20 56.46)' },
};

export const orangeGradientDarkened: GradientColor = {
    light: { from: 'oklch(63.87% 0.2 40.09)', to: 'oklch(71.15% 0.1903 49.18)' },
    dark: { from: 'oklch(74.42% 0.1811 56.46)', to: 'oklch(74.38% 0.1665 65.03)' },
};

export const redGradient: GradientColor = {
    light: { from: red.DEFAULT.light, to: 'oklch(50% 0.22 18.32)' },
    dark: { from: red.DEFAULT.dark, to: 'oklch(60% 0.25 31.02)' },
};

export const redGradientDarkened: GradientColor = {
    light: { from: 'oklch(53.44% 0.1811 16.77)', to: 'oklch(56.53% 0.1974 26.27)' },
    dark: { from: 'oklch(65.15% 0.2353 31.02)', to: 'oklch(66.33% 0.1852 30.4)' },
};

export const goldGradient: GradientColor = {
    light: { from: gold.DEFAULT.light, to: 'oklch(70% 0.17 69.51)' },
    dark: { from: gold.DEFAULT.dark, to: 'oklch(78% 0.17 72.79)' },
};

export const goldGradientDarkened: GradientColor = {
    light: { from: 'oklch(71.43% 0.1554 63.42)', to: 'oklch(75.75% 0.1547 78.24)' },
    dark: { from: 'oklch(81.63% 0.1548 72.79)', to: 'oklch(82.21% 0.1507 83.64)' },
};


export const allGradients = {
  neutralGradient,
  blueGradient,
  blueGradientDarkened,
  greenGradient,
  greenGradientDarkened,
  orangeGradient,
  orangeGradientDarkened,
  redGradient,
  redGradientDarkened,
  goldGradient,
  goldGradientDarkened,
};
