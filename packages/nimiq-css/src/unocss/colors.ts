export enum NimiqColor {
  Darkblue = 'darkblue',
  Darkerblue = 'darkerblue',
  Neutral = 'neutral',
  Blue = 'blue',
  Green = 'green',
  Orange = 'orange',
  Red = 'red',
  Gold = 'gold',
  Purple = 'purple',
}

export function getNimiqColors() {
  return {
    colors: {
      [NimiqColor.Darkblue]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Darkblue}))`,
      },
      [NimiqColor.Darkerblue]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Darkerblue}))`,
      },
      [NimiqColor.Neutral]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Neutral}))`,
        0: `rgb(var(--nq-${NimiqColor.Neutral}-0))`,
        50: `rgb(var(--nq-${NimiqColor.Neutral}-50))`,
        100: `rgb(var(--nq-${NimiqColor.Neutral}-100))`,
        200: `rgb(var(--nq-${NimiqColor.Neutral}-200))`,
        300: `rgb(var(--nq-${NimiqColor.Neutral}-300))`,
        400: `rgb(var(--nq-${NimiqColor.Neutral}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Neutral}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Neutral}-600))`,
        700: `rgb(var(--nq-${NimiqColor.Neutral}-700))`,
        800: `rgb(var(--nq-${NimiqColor.Neutral}-800))`,
        900: `rgb(var(--nq-${NimiqColor.Neutral}-900))`,
      },
      [NimiqColor.Blue]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Blue}))`,
        400: `rgb(var(--nq-${NimiqColor.Blue}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Blue}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Blue}-600))`,
        1100: `rgb(var(--nq-${NimiqColor.Blue}-1100))`,

        sss: `rgb(var(--nq-${NimiqColor.Blue}-sss))`,
      },
      [NimiqColor.Green]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Green}))`,
        400: `rgb(var(--nq-${NimiqColor.Green}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Green}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Green}-600))`,
        1100: `rgb(var(--nq-${NimiqColor.Green}-1100))`,
      },
      [NimiqColor.Orange]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Orange}))`,
        400: `rgb(var(--nq-${NimiqColor.Orange}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Orange}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Orange}-600))`,
        1100: `rgb(var(--nq-${NimiqColor.Orange}-1100))`,
      },
      [NimiqColor.Red]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Red}))`,
        400: `rgb(var(--nq-${NimiqColor.Red}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Red}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Red}-600))`,
        1100: `rgb(var(--nq-${NimiqColor.Red}-1100))`,
      },
      [NimiqColor.Gold]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Gold}))`,
        400: `rgb(var(--nq-${NimiqColor.Gold}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Gold}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Gold}-600))`,
        1100: `rgb(var(--nq-${NimiqColor.Gold}-1100))`,
      },
      [NimiqColor.Purple]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Purple}))`,
        400: `rgb(var(--nq-${NimiqColor.Purple}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Purple}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Purple}-600))`,
        1100: `rgb(var(--nq-${NimiqColor.Purple}-1100))`,
      },
    },
    gradients: [
      [`bg-gradient-${NimiqColor.Neutral}`, `var(--nq-${NimiqColor.Neutral}-gradient)`, NimiqColor.Neutral],
      [`bg-gradient-subtle-${NimiqColor.Neutral}`, `var(--nq-${NimiqColor.Neutral}-subtle-gradient)`, `rgb(var(--nq-${NimiqColor.Darkblue}-200))`],
      [`bg-gradient-${NimiqColor.Blue}`, `var(--nq-${NimiqColor.Blue}-gradient)`, NimiqColor.Blue],
      [`bg-gradient-${NimiqColor.Blue}-darkened`, `var(--nq-${NimiqColor.Blue}-gradient-darkened)`, NimiqColor.Blue],
      [`bg-gradient-${NimiqColor.Green}`, `var(--nq-${NimiqColor.Green}-gradient)`, NimiqColor.Green],
      [`bg-gradient-${NimiqColor.Green}-darkened`, `var(--nq-${NimiqColor.Green}-gradient-darkened)`, NimiqColor.Green],
      [`bg-gradient-${NimiqColor.Orange}`, `var(--nq-${NimiqColor.Orange}-gradient)`, NimiqColor.Orange],
      [`bg-gradient-${NimiqColor.Orange}-darkened`, `var(--nq-${NimiqColor.Orange}-gradient-darkened)`, NimiqColor.Orange],
      [`bg-gradient-${NimiqColor.Red}`, `var(--nq-${NimiqColor.Red}-gradient)`, NimiqColor.Red],
      [`bg-gradient-${NimiqColor.Red}-darkened`, `var(--nq-${NimiqColor.Red}-gradient-darkened)`, NimiqColor.Red],
      [`bg-gradient-${NimiqColor.Gold}`, `var(--nq-${NimiqColor.Gold}-gradient)`, NimiqColor.Gold],
      [`bg-gradient-${NimiqColor.Gold}-darkened`, `var(--nq-${NimiqColor.Gold}-gradient-darkened)`, NimiqColor.Gold],
    ],
  } as const
};
