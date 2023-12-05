
<script setup lang="ts">
import { EHtml, EHead, EFont, EBody, EText, EContainer, EColumn, ERow, ESection  } from "vue-email"
import { computed, toValue } from 'vue';

const props = defineProps({
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  telegram: { type: String },
  facebook: { type: String },
  youtube: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  disclosure: { type: String, default: '' }, 
})

const disclosure = computed(() => toValue(props.disclosure).split('\n').filter(Boolean) ?? [])
</script>

<template>
  <EHtml lang="en">
    <EHead>
      <EFont
        font-family="Mulish"
        fallback-font-family="Helvetica"
        :web-font="{
          url: 'https://fonts.bunny.net/mulish/files/mulish-latin-400-normal.woff2',
          format: 'woff2',
        }"
        font-weight="normal"
        font-style="normal"
      />
      <EFont
        font-family="Mulish"
        fallback-font-family="Helvetica"
        :web-font="{
          url: 'https://fonts.bunny.net/mulish/files/mulish-latin-700-normal.woff2',
          format: 'woff2',
        }"
        font-weight="bold"
        font-style="normal"
      />
    </EHead>

    <EBody >
      <EContainer :style="{
        backgroundColor: '#fff',
        fontFamily: 'Mulish,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        padding: '24px',
      }">
        <ESection>
          <EHeading style="font-size: 24px; font-weight: bold;" v-if="name"> {{ name }}</EHeading>
        </ESection>

        <ERow>
          <EColumn style="color: '#101531'; fontSize: 12; opacity: 0.5">
            <EText v-if="email">{{ email }}</EText>
            <EText v-if="phoneNumber">{{ phoneNumber }}</EText>
            <ERow v-if="telegram">
                <EImg width="14" src="https://github.com/onmax/nimiq-ui/tree/main/packages/email-signatures/src/assets/telegram.png" />
                <EText>{{ telegram }}</EText>
            </ERow>
            <EText>{{ telegram }}</EText>
          </EColumn>
        </ERow>

        <ESection style="fontSize: 8px; color: '#1F2348'; opacity: 0.5">
          <EText v-for="line in disclosure" :key="line">{{ line }}</EText>
        </ESection>
      </EContainer>
    </EBody>
  </EHtml>
</template>

