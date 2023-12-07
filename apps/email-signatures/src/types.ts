export enum Logo {
  Criptociudad = 'criptociudad-logo',
  Kryptostadt = 'kryptostadt-logo',
  Nimiq = 'nimiq-logo-horizontal',
}

export type Logos = Record<Logo, boolean>

export enum SocialMedia { 
  Telegram = 'telegram',
  Facebook = 'facebook',
  Youtube = 'youtube',
  Instagram = 'instagram',
  Twitter = 'twitter',
}

export type SocialMediaList = Record<SocialMedia, string>
