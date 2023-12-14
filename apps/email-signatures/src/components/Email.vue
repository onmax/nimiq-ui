
<script setup lang="ts">
import { EHtml, EHead, EFont, EBody, EText, EContainer, EColumn, ERow, ESection, EImg, EHeading, ELink } from "vue-email"
import { computed, toValue, type PropType } from 'vue';
import { Logo, Logos } from "../types";

const props = defineProps({
  name: { type: String },
  role: { type: String },
  email: { type: String },
  phoneNumber: { type: String, default: '' },
  telegram: { type: String, default: '' },
  twitter: { type: String, default: '' },
  facebook: { type: String, default: '' },
  youtube: { type: String, default: '' },
  instagram: { type: String, default: '' },
  logos: { type: Object as PropType<Logos>, required: true },
  disclosure: { type: String, default: '' },
})

const telegram = computed(() => ({ username: '@' + props.telegram.split('/').at(-1), url: props.telegram }))
const facebook = computed(() => ({ username: '/' + props.facebook.split('/').at(-1), url: props.facebook }))
const youtube = computed(() => ({ username: '@' + props.youtube.split('/').at(-1), url: props.youtube }))
const instagram = computed(() => ({ username: '@' + props.instagram.split('/').at(-1), url: props.instagram }))
const twitter = computed(() => ({ username: '@' + props.twitter.split('/').at(-1), url: props.twitter }))

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
      fontStyle: 'normal',
    }">
      <EContainer>
        <ESection>
          <EHeading style="font-size: 24px; font-weight: bold; color: rgb(31, 35, 72); margin: 0;" v-if="name"> {{ name }}
          </EHeading>
        </ESection>

        <ESection>
          <EHeading as="h4"
            style="font-size: 12px; color: rgba(16, 21, 49, 0.5); font-weight: 400; margin-top: 2px; margin-bottom: 0px"
            v-if="role"> {{ role }}
          </EHeading>
        </ESection>


        <ERow style=" color:rgba(16, 21, 49, 0.5); margin-top:24px">
          <EColumn>
            <ELink :href="`mailto:${email}`"
              style="font-size:12px; margin: 0; color: rgba(16, 21, 49, 0.5); text-decoration: none;">
              {{ email }}
            </ELink>
            <EText v-if="phoneNumber" style="font-size: 12px; margin: 0;line-height: 1;margin-top:6px">{{ phoneNumber }}</EText>
          </EColumn>
        </ERow>

        <ESection v-if="telegram.url">
          <EText style="vertical-align: middle; display: inline-block; margin:0;line-height: 1;">
            <ELink :href="telegram.url" style="font-size:12px;color:rgba(16,21,49,0.5);margin:0;line-height: 1;">
              <EImg :src="`${baseUrl}/telegram.png`" alt="Telegram" width="14" height="14"
                style="border: none; display: inline; outline: none; text-decoration: none; position:relative;bottom:-3px" />
              &nbsp;{{ telegram.username }}
            </ELink>
            &nbsp;&nbsp;&nbsp;
          </EText>
        </ESection>


        <ESection style="margin-top: 40px" />

        <ERow style="min-height: 32px" v-if="logos.length > 0">
          <ELink v-for="({ imgUrl, url }) in logos" :key="url" :href="url" style="margin-right: 24px;">
            <EColumn>
              <EImg style="margin:-16px 0; height: 20px;" :src="imgUrl" alt="Logo" />
            </EColumn>
          </ELink>
        </ERow>

        <ESection>
          <EText
            v-for="[social, { url, username }] in Object.entries({ facebook, youtube, instagram, twitter }).filter(([_, { url }]) => !!url)"
            style="vertical-align: middle; display: inline-block; margin:0">
            <ELink :href="url" style="font-size:12px;color:rgba(16,21,49,0.5);margin:0;line-height: 1;">
              <EImg :src="`${baseUrl}/${social}.png`" :alt="social" width="14" height="14"
                style="border: none; display: inline; outline: none; text-decoration: none; position:relative;bottom:-3px" />
              &nbsp;{{ username }}
            </ELink>
            &nbsp;&nbsp;&nbsp;
          </EText>
        </ESection>

                <ESection style="margin-top: 40px" v-if="disclosure" />

        <ESection v-if="disclosure" style="font-size: 8px; color: rgba(31, 35, 72, 0.5)">
          <EText v-for="line in disclosure" :key="line" style="margin: 8px 0;font-style: normal;">{{ line }}</EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>
