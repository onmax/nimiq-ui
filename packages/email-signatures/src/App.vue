<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import Email from './components/Email.vue';
import { useRender } from 'vue-email';
import { Cryptocity } from './types';

const emailProps = reactive({
  name: 'John Doe',
  email: 'johndoe@nimiq.com',
  phoneNumber: '+1 123 456 7890',
  telegram: 'https://t.me/johndoe',
  cryptocity: Cryptocity.None,
  facebook: 'https://facebook.com/johndoe',
  youtube: 'https://youtube.com/johndoe',
  twitter: 'https://twitter.com/johndoe',
  instagram: 'https://instagram.com/johndoe',
  disclosure: `
Disclosure:
Message test class font face subscriber mail video cross-campaign email lotus transactional, week the double selective html exactly authentication help uce reverse, signature ecoa group sends none rich domainkeys mailing delivery. Targeting content confirmation html crm rental is &, important client figuring line rate pushed handling, try started avoid alt be digest.
Email worm clients of never challenge pretty market subscribers, flawless verification effective segment read uce div get, msp want an pre forward right subscriber. Great place denial-of-service cost uniform folder market snail bring dpi relay, opt-in call hygiene open treat line blacklist address.
Switch relay banging then transactional tricks page inline users prefix, great sender text line just is design job spoofing nth, lotus in whitelist consent effective right spam broadcast. Ghost solid lines your responsive email devices, loop my fast domainkeys newsletter windows group, you sender emails conversion something.
  `.trim(),
})

async function copy() {
  await navigator.clipboard?.writeText(await useRender(Email, { props: emailProps }, { pretty: true }));
  alert('Copied to clipboard!');
}
</script>

<template>
  Add your information below. If the field is empty, we will not show anything.
  <form style="padding: 24px">
    <fieldset>
      <legend>Personal info</legend>
      <label>
        Name:
        <input v-model="emailProps.name" />
      </label>
      <label>
        Email:
        <input v-model="emailProps.email" />
      </label>
      <label>
        Phone Number:
        <input v-model="emailProps.phoneNumber" />
      </label>
    </fieldset>
    <fieldset style="margin-top: 12px">
      <legend>Social Media</legend>
      <label>Cryptocity
        <select v-model="emailProps.cryptocity">
          <option v-for="city in Object.values(Cryptocity)" :value="city">{{ city }}</option>
        </select>
      </label>
      <label>
        Telegram:
        <code style="font-size: 12px;">https://t.me/</code><input v-model="emailProps.telegram" />
      </label>
      <label>
        Facebook:
        <code style="font-size: 12px;">https://facebook.com/</code><input v-model="emailProps.facebook" />
      </label>
      <label>
        Youtube:
        <code style="font-size: 12px;">https://youtube.com/</code><input v-model="emailProps.youtube" />
      </label>
      <label>
        Instagram:
        <code style="font-size: 12px;">https://instagram.com/</code><input v-model="emailProps.instagram" />
      </label>
      <label>
        Twitter:
        <code style="font-size: 12px;">https://x.com/</code><input v-model="emailProps.twitter" />
      </label>
    </fieldset>
    <fieldset>
      <legend>Disclosure</legend>
      <textarea v-model="emailProps.disclosure"
        style="width: 100%; height: 100px; min-height: 200px; resize: none; box-sizing: border-box; padding: 12px; margin-top: 12px;"></textarea>
    </fieldset>
  </form>

  <button @click="copy">Copy HTML code</button>

  <hr style="opacity: 0.4; margin-top: 24px">

  <Email v-bind="emailProps" />
</template>

