export enum NimiqColor {
  Darkblue = 'darkblue',
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
      [NimiqColor.Darkblue]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Darkblue}))`,
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
        900: `rgb(var(--nq-${NimiqColor.Neutral}-900))`
      },
      [NimiqColor.Blue]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Blue}))`,
        400: `rgb(var(--nq-${NimiqColor.Blue}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Blue}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Blue}-600))`,
      },
      [NimiqColor.Green]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Green}))`,
        400: `rgb(var(--nq-${NimiqColor.Green}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Green}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Green}-600))`,
      },
      [NimiqColor.Orange]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Orange}))`,
        400: `rgb(var(--nq-${NimiqColor.Orange}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Orange}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Orange}-600))`,
      },
      [NimiqColor.Red]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Red}))`,
        400: `rgb(var(--nq-${NimiqColor.Red}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Red}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Red}-600))`,
      },
      [NimiqColor.Gold]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Gold}))`,
        400: `rgb(var(--nq-${NimiqColor.Gold}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Gold}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Gold}-600))`,
      },
      [NimiqColor.Purple]: {
        DEFAULT: `rgb(var(--nq-${NimiqColor.Purple}))`,
        400: `rgb(var(--nq-${NimiqColor.Purple}-400))`,
        500: `rgb(var(--nq-${NimiqColor.Purple}-500))`,
        600: `rgb(var(--nq-${NimiqColor.Purple}-600))`,
      }
    },
    gradients: [
      [`bg-gradient-${NimiqColor.Neutral}`, `var(--nq-${NimiqColor.Neutral}-gradient)`],
      [`bg-gradient-${NimiqColor.Blue}`, `var(--nq-${NimiqColor.Blue}-gradient)`],
      [`bg-gradient-${NimiqColor.Green}`, `var(--nq-${NimiqColor.Green}-gradient)`],
      [`bg-gradient-${NimiqColor.Orange}`, `var(--nq-${NimiqColor.Orange}-gradient)`],
      [`bg-gradient-${NimiqColor.Red}`, `var(--nq-${NimiqColor.Red}-gradient)`],
      [`bg-gradient-${NimiqColor.Gold}`, `var(--nq-${NimiqColor.Gold}-gradient)`],
      [`bg-gradient-${NimiqColor.Purple}`, `var(--nq-${NimiqColor.Purple}-gradient)`]
    ]
  } as const
};
