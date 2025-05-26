// Using Oklch color space
// light-dark() is a new CSS feature, we'll assume a helper or direct CSS generation for it.

export interface ColorShades {
  DEFAULT: string; // oklch string
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  1000?: string;
  1100?: string; // If specific shades like this are needed
}

export interface ThemeColor {
  light: string; // oklch string for light mode
  dark: string;  // oklch string for dark mode
}

export interface ThemedColorShades {
  DEFAULT: ThemeColor;
  50?: ThemeColor;
  100?: ThemeColor;
  200?: ThemeColor;
  300?: ThemeColor;
  400?: ThemeColor;
  500?: ThemeColor;
  600?: ThemeColor;
  700?: ThemeColor;
  800?: ThemeColor;
  900?: ThemeColor;
  1000?: ThemeColor;
  1100?: ThemeColor;
}

// Helper function to generate light-dark() CSS syntax if needed,
// or this can be handled directly in the build script.
// For now, we'll store them as ThemeColor objects.
// Example: `light-dark(oklch(0.9 0.1 200), oklch(0.2 0.1 200))`

export const neutral: ThemedColorShades = {
  DEFAULT: { light: 'oklch(27.37% 0.068 276.29)', dark: 'oklch(90% 0.01 276.29)' }, // Placeholder: Dark Blue-ish / Light Gray
  50: { light: 'oklch(98% 0.01 276.29)', dark: 'oklch(15% 0.01 276.29)' },
  100: { light: 'oklch(95% 0.01 276.29)', dark: 'oklch(20% 0.01 276.29)' },
  // ... more shades
  900: { light: 'oklch(30% 0.05 276.29)', dark: 'oklch(80% 0.01 276.29)' },
};

export const blue: ThemedColorShades = {
  DEFAULT: { light: 'oklch(51.82% 0.1965 263.04)', dark: 'oklch(60.45% 0.1951 255.01)' }, // Placeholder: Nimiq Blue
  // ... shades
};

export const green: ThemedColorShades = {
  DEFAULT: { light: 'oklch(65.17% 0.0971 176.55)', dark: 'oklch(71.42% 0.1457 167.35)' }, // Placeholder: Green
  // ... shades
};

export const orange: ThemedColorShades = {
  DEFAULT: { light: 'oklch(68.83% 0.2036 41.13)', dark: 'oklch(74.42% 0.1811 56.46)' }, // Placeholder: Orange
  // ... shades
};

export const red: ThemedColorShades = {
  DEFAULT: { light: 'oklch(55.99% 0.1909 18.32)', dark: 'oklch(65.15% 0.2353 31.02)' }, // Placeholder: Red
  // ... shades
};

export const gold: ThemedColorShades = {
  DEFAULT: { light: 'oklch(74.94% 0.1565 69.51)', dark: 'oklch(81.63% 0.1548 72.79)' }, // Placeholder: Gold
  // ... shades
};

export const purple: ThemedColorShades = {
  DEFAULT: { light: 'oklch(45% 0.15 300)', dark: 'oklch(60% 0.15 300)' }, // Placeholder: Purple
  // ... shades
};

// Special colors (not themed, or themed differently)
export const white: ColorShades = {
    DEFAULT: 'oklch(100% 0 0)', // White is white in both themes
};

export const black: ColorShades = {
    DEFAULT: 'oklch(0% 0 0)', // Black is black in both themes
};

export const darkblue: ColorShades = { // This was a specific color in the old system
    DEFAULT: 'oklch(27.37% 0.068 276.29)', // Example: Nimiq Dark Blue
};

export const darkerblue: ColorShades = { // This was a specific color in the old system
    DEFAULT: 'oklch(20.18% 0.0962 315.41)', // Example: Nimiq Darker Blue
};


export const allColors = {
  neutral,
  blue,
  green,
  orange,
  red,
  gold,
  purple,
  white,
  black,
  darkblue,
  darkerblue,
};
