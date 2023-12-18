export enum Logo {
  Criptociudad = 'criptociudad-logo',
  Kryptostadt = 'kryptostadt-logo',
  Nimiq = 'nimiq-logo-horizontal',
}

export type Logos = Record<Logo, boolean>

export enum SocialMedia { 
  Telegram = 'Telegram',
  Facebook = 'Facebook',
  Youtube = 'Youtube',
  Instagram = 'Instagram',
  Twitter = 'Twitter',
  None = 'none'
}

export type SocialMediaList = Record<SocialMedia, string>
