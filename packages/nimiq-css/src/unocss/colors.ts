enum NimiqColor {
  Neutral = 'neutral',
  Blue = 'blue',
  Green = 'green',
  Orange = 'orange',
  Red = 'red',
  Gold = 'gold',
  Purple = 'purple'
}

export function getNimiqColors() {
  return {
    colors: {
      [NimiqColor.Neutral]: {
        DEFAULT: `var(--neutral)`,
        0: `var(--neutral-0)`,
        50: `var(--neutral-50)`,
        100: `var(--neutral-100)`,
        200: `var(--neutral-200)`,
        300: `var(--neutral-300)`,
        400: `var(--neutral-400)`,
        500: `var(--neutral-500)`,
        600: `var(--neutral-600)`,
        700: `var(--neutral-700)`,
        800: `var(--neutral-800)`,
        900: `var(--neutral-900)`
      },
      [NimiqColor.Blue]: {
        DEFAULT: `var(--blue)`,
        400: `var(--blue-400)`,
        500: `var(--blue-500)`,
        600: `var(--blue-600)`,
      },
      [NimiqColor.Green]: {
        DEFAULT: `var(--green)`,
        400: `var(--green-400)`,
        500: `var(--green-500)`,
        600: `var(--green-600)`,
      },
      [NimiqColor.Orange]: {
        DEFAULT: `var(--orange)`,
        400: `var(--orange-400)`,
        500: `var(--orange-500)`,
        600: `var(--orange-600)`,
      },
      [NimiqColor.Red]: {
        DEFAULT: `var(--red)`,
        400: `var(--red-400)`,
        500: `var(--red-500)`,
        600: `var(--red-600)`,
      },
      [NimiqColor.Gold]: {
        DEFAULT: `var(--gold)`,
        400: `var(--gold-400)`,
        500: `var(--gold-500)`,
        600: `var(--gold-600)`,
      },
      [NimiqColor.Purple]: {
        DEFAULT: `var(--purple)`,
        400: `var(--purple-400)`,
        500: `var(--purple-500)`,
        600: `var(--purple-600)`,
      }
    },
    backgroundImage: {
      [NimiqColor.Neutral]: `var(--neutral-gradient)`,
      [NimiqColor.Blue]: `var(--blue-gradient)`,
      [NimiqColor.Green]: `var(--green-gradient)`,
      [NimiqColor.Orange]: `var(--orange-gradient)`,
      [NimiqColor.Red]: `var(--red-gradient)`,
      [NimiqColor.Gold]: `var(--gold-gradient)`,
      [NimiqColor.Purple]: `var(--purple-gradient)`
    }
  } as const
};
