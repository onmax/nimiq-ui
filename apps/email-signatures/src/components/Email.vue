
<script setup lang="ts">
import { EHtml, EHead, EFont, EBody, EText, EContainer, EColumn, ERow, ESection, EImg, EHeading, ELink } from "vue-email"
import { computed, toValue, type PropType } from 'vue';
import { Logo, SocialMediaList, Logos } from "../types";

const props = defineProps({
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  socialMedia: { type: Object as PropType<SocialMediaList>, required: true },
  logos: { type: Object as PropType<Logos>, required: true },
  disclosure: { type: String, default: '' },
})

const telegram = computed(() => ({ username: '@' + props.socialMedia.telegram.split('/').at(-1), url: props.socialMedia.telegram }))
const facebook = computed(() => ({ username: '/' + props.socialMedia.facebook.split('/').at(-1), url: props.socialMedia.facebook }))
const youtube = computed(() => ({ username: props.socialMedia.youtube.split('/').at(-1), url: props.socialMedia.youtube }))
const instagram = computed(() => ({ username: '@' + props.socialMedia.instagram.split('/').at(-1), url: props.socialMedia.instagram }))
const twitter = computed(() => ({ username: '@' + props.socialMedia.twitter.split('/').at(-1), url: props.socialMedia.twitter }))

const disclosure = computed(() => toValue(props.disclosure).split('\n').filter(Boolean) ?? [])

const baseUrl = "https://www.nimiq.com/email-signatures"

const urls = {
  [Logo.Criptociudad]: 'https://www.criptociudad.cr/',
  [Logo.Kryptostadt]: 'https://kryptostadt.info/',
  [Logo.Nimiq]: 'https://nimiq.com/',
} as const

const logos = computed(() => Object.entries(props.logos).filter(([_, value]) => value).map(([logo, _]) => ({ imgUrl: `${baseUrl}/${logo}.png`, url: urls[logo as Logo] })))
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
          <EHeading style="font-size: 24px; font-weight: bold; color: rgb(31, 35, 72); " v-if="name"> {{ name }}
          </EHeading>
        </ESection>

        <ERow style=" color:rgba(16, 21, 49, 0.5); fontSize: 12">
          <EColumn>
            <EText v-if="email" style="margin: 0">{{ email }}</EText>
            <EText v-if="phoneNumber" style="margin: 0">{{ phoneNumber }}</EText>
          </EColumn>
        </ERow>

         <ESection style="margin-bottom: 40px;">
          <ERow>
            <EColumn v-if="telegram" style="vertical-align: middle;">
              <EImg :src="`${baseUrl}/telegram.png`" alt="Telegram" width="14" height="14" style="margin: 4px 4px 0 0; border: none; display: inline; outline: none; textDecoration: none" />
              <ELink :href="telegram.url" style="color: rgba(16, 21, 49, 0.5); text-decoration: none;">
                {{ telegram.username }}
              </ELink>
            </EColumn>
          </ERow>
        </ESection>

        <ERow style="min-height: 32px" v-if="logos.length > 0">
          <ELink v-for="({ imgUrl, url }) in logos" :key="url" :href="url" style="margin-right: 24px;">
            <EColumn>
              <EImg style="margin:-16px 0; height: 20px;" :src="imgUrl" alt="Logo" />
            </EColumn>
          </ELink>
        </ERow>

        <ESection>
          <ERow>
            <EColumn
              v-for="[social, { url, username }] in (Object.entries({ facebook, youtube, instagram, twitter })).filter(([_, url]) => !!url)"
              :key="social" style="vertical-align: middle; margin: 0 12px 0 0">
              <EImg :src="`${baseUrl}/${social}.png`" :alt="social" width="14" height="14" style="margin: 2px 4px 0 0; border: none; display: inline; outline: none; textDecoration: none" />
              <ELink :href="url" style="color: rgba(16, 21, 49, 0.5); text-decoration: none;">
                {{ username }}
              </ELink>
            </EColumn>
          </ERow>
        </ESection>

        <ESection style="fontSize: 8px; color: rgba(31, 35, 72, 0.5); margin-top: 24px">
          <EText v-for="line in disclosure" :key="line" style="margin: 8px 0;">{{ line }}</EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>

