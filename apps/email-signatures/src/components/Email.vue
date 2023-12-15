
<script setup lang="ts">
import { EHtml, EHead, EFont, EBody, EText, EContainer, EColumn, ERow, ESection, EImg, EHeading, ELink } from "vue-email"
import { computed, toValue, type PropType, ref, watch, nextTick } from 'vue';
import { Logo, Logos, SocialMedia } from "../types";

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
  primarySocial: { type: String as PropType<SocialMedia> },
})

const baseUrl = "https://www.nimiq.com/email-signatures"

const socials = computed(() => ([
  { username: '@' + props.twitter.split('/').at(-1), url: props.twitter, img: baseUrl + '/twitter.png', social: SocialMedia.Twitter },
  { username: '@' + props.telegram.split('/').at(-1), url: props.telegram, img: baseUrl + '/telegram.png', social: SocialMedia.Telegram },
  { username: '/' + props.facebook.split('/').at(-1), url: props.facebook, img: baseUrl + '/facebook.png', social: SocialMedia.Facebook },
  { username: '@' + props.youtube.split('/').at(-1), url: props.youtube, img: baseUrl + '/youtube.png', social: SocialMedia.Youtube },
  { username: '@' + props.instagram.split('/').at(-1), url: props.instagram, img: baseUrl + '/instagram.png', social: SocialMedia.Instagram },
] as const))

const getPrimarySocial = () => props.primarySocial ? socials.value.find(social => social.social === props.primarySocial && social.url) : undefined
const getRestSocial = (primary?: SocialMedia) => Object.entries(socials.value).filter(([_, value]) => value.social !== primary && value.url).map(([_, value]) => value)

const primarySocial = ref(getPrimarySocial())
const restSocial = ref(getRestSocial(primarySocial.value?.social))

watch(() => props, async () => {
  primarySocial.value = undefined
  restSocial.value = []
  await nextTick()
  primarySocial.value = getPrimarySocial()
  restSocial.value = getRestSocial(primarySocial.value?.social)
}, { deep: true })

const disclosure = computed(() => toValue(props.disclosure).split('\n').filter(Boolean) ?? [])

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
      fontFamily: 'Mulish,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      padding: '24px',
      fontStyle: 'normal',
    }">
      <EContainer>
        <ESection>
          <EHeading style="font-size: 24px; font-weight: bold;  margin: 0;padding-left:3px" v-if="name"> {{ name }}
          </EHeading>
        </ESection>

        <ESection>
          <EHeading as="h4"
            style="font-size: 12px; font-weight: 400; margin-top: 2px; margin-bottom: 0px;padding-left:3px" v-if="role">
            {{ role }}
          </EHeading>
        </ESection>


        <ERow style=" margin-top:24px">
          <EColumn>
            <ELink :href="`mailto:${email}`" style="font-size:12px; margin: 0; text-decoration: none;padding-left:3px">
              {{ email }}
            </ELink>
            <EText v-if="phoneNumber" style="font-size: 12px; margin: 0;line-height: 1;margin-top:8px;padding-left:3px">{{
              phoneNumber }}
            </EText>

            <EText v-if="primarySocial"
              style="vertical-align: middle; display: inline-block; margin:0;box-sizing: border-box;">
              <ELink :href="primarySocial.url" style="font-size:12px;color:rgba(16,21,49,0.5);margin:0;line-height: 1;">
                <EImg :src="primarySocial.img" :alt="primarySocial.social" width="24" height="20"
                  style="border: none; display: inline; outline: none; text-decoration: none; position:relative;bottom:-6px" />
                {{ primarySocial.username }}
              </ELink>
              &nbsp;&nbsp;&nbsp;
            </EText>
          </EColumn>
        </ERow>

        <ESection style="margin-top: 40px" />

        <ERow style="min-height: 32px" v-if="logos.length > 0">
          <ELink v-for="({ imgUrl, url }) in logos" :key="url" :href="url" style="margin-right: 24px;">
            <EColumn>
              <EImg style="margin:-16px 0; height: 20px;" :src="imgUrl" alt="Logo" />
            </EColumn>
          </ELink>
        </ERow>

        <ESection>
          <EText v-for="social in restSocial" style="vertical-align: middle; display: inline-block; margin:0">
            <ELink :href="social.url" style="font-size:12px;margin:0;line-height: 1;">
              <EImg :src="social.img" :alt="social.social" width="24" height="20"
                style="border: none; display: inline; outline: none; text-decoration: none; position:relative;bottom:-6px" />
              {{ social.username }}
            </ELink>
            &nbsp;&nbsp;&nbsp;
          </EText>
        </ESection>

        <ESection style="margin-top: 40px" v-if="disclosure" />

        <ESection v-if="disclosure" style=" color: ">
          <EText v-for="line in disclosure" :key="line" style="margin: 8px 0;font-style: normal;padding-left:3px;font-size: 12px;">{{ line
          }}</EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>

<style scoped>
h1 {
  color: rgba(15, 21, 49) !important;
}

p,
a,
h4 {
  color: rgba(15, 21, 49, 0.5) !important;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #12163c !important;
  }

  h1 {
    color: rgba(255, 255, 255) !important;
  }

  p,
  a,
  h4 {
    color: rgba(255, 255, 255, 0.5) !important;
  }
}
</style>
