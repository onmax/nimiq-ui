<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import Email from './components/Email.vue';
  import { useRender } from 'vue-email';

const name = ref('John Doe');
const email = ref('johndoe@nimiq.com');
const phoneNumber = ref('+1 123 456 7890');
const telegram = ref('johndoe');
const facebook = ref('johndoe');
const youtube = ref('johndoe');
const instagram = ref('johndoe');
const disclosure = ref(`
Disclosure:
Message test class font face subscriber mail video cross-campaign email lotus transactional, week the double selective html exactly authentication help uce reverse, signature ecoa group sends none rich domainkeys mailing delivery. Targeting content confirmation html crm rental is &, important client figuring line rate pushed handling, try started avoid alt be digest.
Email worm clients of never challenge pretty market subscribers, flawless verification effective segment read uce div get, msp want an pre forward right subscriber. Great place denial-of-service cost uniform folder market snail bring dpi relay, opt-in call hygiene open treat line blacklist address.
Switch relay banging then transactional tricks page inline users prefix, great sender text line just is design job spoofing nth, lotus in whitelist consent effective right spam broadcast. Ghost solid lines your responsive email devices, loop my fast domainkeys newsletter windows group, you sender emails conversion something.
`.trim())

const panel = ref<'render' | 'code'>('render')
const code = ref('')
watchEffect(async () => {
  const props = { name: name.value, email: email.value, phoneNumber: phoneNumber.value, telegram: telegram.value, facebook: facebook.value, youtube: youtube.value, instagram: instagram.value, disclosure: disclosure.value }
  code.value = await useRender(Email, { props }, { pretty: true })
  console.log(code.value)
})

async function copy() {
  await navigator.clipboard.writeText(code.value)	
  alert('Copied to clipboard!')
  
}
</script>

<template>

  Add your information below. If the field is empty, we will not show anything.
  <form style="padding: 24px">
    <fieldset>
      <legend>Personal info</legend>
      <label>
        Name:
        <input v-model="name" />
      </label>
      <label>
        Email:
        <input v-model="email" />
      </label>
      <label>
        Phone Number:
        <input v-model="phoneNumber" />
      </label>
    </fieldset>
  <fieldset style="margin-top: 12px">
    <legend>Social Media</legend>
      <label>
        Telegram:
        <input v-model="telegram" />
      </label>
      <label>
        Facebook:
        <input v-model="facebook" />
      </label>
      <label>
        Youtube:
        <input v-model="youtube" />
      </label>
      <label>
        Instagram:
        <input v-model="instagram" />
      </label>
  </fieldset>
  <fieldset>
    <legend>Disclosure</legend>
    <textarea v-model="disclosure" style="width: 100%; height: 100px; min-height: 200px; resize: none; box-sizing: border-box; padding: 12px; margin-top: 12px;"></textarea>
  </fieldset>
  </form>

  <div style="display: flex; gap: 12px; justify-content: center;">
    <button :disabled="panel === 'render'" @click="panel = 'render'">
      See Code
    </button>
    <button :disabled="panel === 'code'" @click="panel = 'code'">
      Render
    </button>
    <button @click="copy">Copy HTML code</button>
  </div>


  <hr style="opacity: 0.4; margin-top: 24px">

  <div style="text-align: center; margin-top:36px">

    <p style="margin: 0">You are viewing</p>
    <h1 style="margin: 0">{{ panel.toLocaleUpperCase() }}</h1>
  </div>


    <code  v-show="panel === 'code'" style="padding: 24px; font-size: 14px; backgroundColor: #f5f5f5; display: block; overflow: auto; white-space: pre-wrap; margin-top: 12px;">
      <pre>{{ code }}</pre>
    </code>
  <Email v-show="panel === 'render'" v-bind="{ name, email, phoneNumber, telegram, facebook, youtube, instagram, disclosure }" />
  </template>

