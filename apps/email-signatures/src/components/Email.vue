
<script setup lang="ts">
import { EHtml, EHead, EFont, EBody, EText, EContainer, EColumn, ERow, ESection, EImg, EHeading, ELink } from "vue-email"
import { computed, toValue, type PropType } from 'vue';
import { Logo, SocialMediaList, Logos, SocialMedia } from "../types";

const props = defineProps({
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  socialMedia: { type: Object as PropType<SocialMediaList>, required: true },
  logos: { type: Object as PropType<Logos>, required: true },
  disclosure: { type: String, default: '' },
})

const telegram = computed(() => props.socialMedia.telegram)
const facebook = computed(() => props.socialMedia.facebook)
const youtube = computed(() => props.socialMedia.youtube)
const instagram = computed(() => props.socialMedia.instagram)
const twitter = computed(() => props.socialMedia.twitter)

const disclosure = computed(() => toValue(props.disclosure).split('\n').filter(Boolean) ?? [])

const baseUrl = "https://www.nimiq.com/email-signatures"

const urls = {
  [Logo.Criptociudad]: 'https://www.criptociudad.cr/',
  [Logo.Kryptostadt]: 'https://kryptostadt.info/',
  [Logo.Nimiq]: 'https://nimiq.com/',
} as const

const logos = computed(() => Object.entries(props.logos).filter(([_, value]) => value).map(([logo, _]) => ({ imgUrl: `${baseUrl}/${logo}.png`, url: urls[logo as Logo] })))

const socialMediaPrefix = {
  [SocialMedia.Facebook]: '/',
  [SocialMedia.Instagram]: '@',
  [SocialMedia.Telegram]: '@',
  [SocialMedia.Twitter]: '@',
  [SocialMedia.Youtube]: '',
} as const
</script>

<template>
  <EHtml lang="en">
    <EHead>
      <EFont font-family="Mulish" fallback-font-family="Helvetica" :web-font="{
        url: 'https://fonts.bunny.net/mulish/files/mulish-latin-400-normal.woff2',
        format: 'woff2',
      }" font-weight="normal" font-style="normal" />
      <EFont font-family="Mulish" fallback-font-family="Helvetica" :web-font="{
        url: 'https://fonts.bunny.net/mulish/files/mulish-latin-700-normal.woff2',
        format: 'woff2',
      }" font-weight="bold" font-style="normal" />
    </EHead>

    <EBody :style="{
      backgroundColor: '#fff',
      fontFamily: 'Mulish,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      padding: '24px',
    }">
      <EContainer>
        <ESection>
          <EHeading style="font-size: 24px; font-weight: bold; color: rgb(31, 35, 72); " v-if="name"> {{ name }}</EHeading>
        </ESection>

        <ERow style=" color:rgba(16, 21, 49, 0.5); fontSize: 12">
          <EColumn>
            <EText v-if="email" style="margin: 0">{{ email }}</EText>
            <EText v-if="phoneNumber" style="margin: 0">{{ phoneNumber }}</EText>
          </EColumn>
        </ERow>

        <ESection style="margin-bottom: 40px">
          <ELink v-if="telegram" :href="telegram" style="fontSize: 12;">
            <ERow>
              <EColumn style="width: 18px">
                <EImg width="14" :src="`${baseUrl}/telegram.png`" />
              </EColumn>
              <EColumn>
                <EText style="color: rgba(16, 21, 49, 0.5); margin: 0">{{ socialMediaPrefix[SocialMedia.Telegram] }}{{
                  telegram.split('/').at(-1) }}</EText>
              </EColumn>
            </ERow>
          </ELink>
        </ESection>

        <ERow style="min-height: 32px">
          <ELink v-for="({ imgUrl, url }) in logos" :key="url" :href="url" style="margin-right: 24px;">
            <EColumn>
              <EImg style="margin:-16px 0; height: 20px;" :src="imgUrl" />
            </EColumn>
          </ELink>
        </ERow>

        <ERow>
          <ELink
            v-for="[social, url] in (Object.entries({ facebook, youtube, instagram, twitter })).filter(([_, url]) => !!url)"
            :href="url!" style="fontSize: 12;">
            <EColumn style="width: 18px">
              <EImg width="14" style="margin-bottom: -2px;" :src="`${baseUrl}/${social}.png`" />
            </EColumn>
            <EColumn>
              <EText style="color: rgba(16, 21, 49, 0.5); margin: 0 12px 0 0;">
                {{ socialMediaPrefix[social as SocialMedia] || '' }}{{ url!.split('/').at(-1) }}
              </EText>
            </EColumn>
          </ELink>
        </ERow>

        <ESection style="fontSize: 8px; color: rgba(31, 35, 72, 0.5); margin-top: 24px">
          <EText v-for="line in disclosure" :key="line" style="margin: 4px 0;">{{ line }}</EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>

