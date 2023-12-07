<script setup lang="ts">
import { reactive } from 'vue';
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

async function download() {
  const html = await useRender(Email, { props: emailProps }, { pretty: true });
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nimiq-email-signature.html';
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <h1>
    Nimiq Email Signatures
  </h1>
  <p>
    A dynamic email signature generator for Nimiq.
  </p>

  <h2>How to use it?</h2>
  <ol>
    <li>✒️ Fill up the form below with the information for your contact</li>
    <li>🔬 Check the preview of the signature. You need to scroll all the way down to view it</li>
    <li>📁 Copy or download the HTML.
      <button @click="copy">Copy</button>
      <button style="margin-left:8px" @click="download">Download</button>

      <blockquote style="margin:0">
        <p>
          <strong>Important:</strong> In Safari, Download might now work. Create a new file in your computer called <code>
            nimiq-email-signature.html</code> and paste the HTML there.
        </p>
      </blockquote>
    </li>
    <li>✉️ Read this guides to add the HTML to you email client:
      <ul>
        <li><a href="https://www.lokitimestwo.com/adding-custom-html-signature-email-gmail/" target="_blank">GMail</a></li>
        <li><a href="https://www.christopherbolt.com/support/knowledgebase/24/Installing-HTML-email-signatures-in-Microsoft-Outlook.html" target="_blank">Outlook</a></li>
        <li><a href="https://docs.gandi.net/en/gandimail/sogo_webmail/signature.html" target="_blank">Nimiq Email (SOGo)</a></li>
      </ul>
    </li>
  </ol>
  
  <h2>Form</h2>
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
      <blockquote style="margin: 0">
        <p>
          <strong>Important:</strong> Please only add the social media you are active on. Empty fields will not be shown in the signature. Use the full URL, including the <code>https://</code> part.
        </p>
      </blockquote>

      <label>Cryptocity
        <select v-model="emailProps.cryptocity">
          <option v-for="city in Object.values(Cryptocity)" :value="city">{{ city }}</option>
        </select>
      </label>
      <label>
        Telegram:
        <input v-model="emailProps.telegram" />
      </label>
      <label>
        Facebook:
        <input v-model="emailProps.facebook" />
      </label>
      <label>
        Youtube:
        <input v-model="emailProps.youtube" />
      </label>
      <label>
        Instagram:
       <input v-model="emailProps.instagram" />
      </label>
      <label>
        Twitter:
       <input v-model="emailProps.twitter" />
      </label>
    </fieldset>
    <fieldset>
      <legend>Disclosure</legend>
      <textarea v-model="emailProps.disclosure"
        style="width: 100%; height: 100px; min-height: 200px; resize: none; box-sizing: border-box; padding: 12px; margin-top: 12px;"></textarea>
    </fieldset>
  </form>


  <h2>Email preview</h2>
  <hr style="opacity: 0.4; margin-top: 24px">

  <Email v-bind="emailProps" />
</template>

