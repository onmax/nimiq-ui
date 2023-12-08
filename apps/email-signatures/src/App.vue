<script setup lang="ts">
import { reactive, ref } from 'vue';
import Email from './components/Email.vue';
import { useRender } from 'vue-email';
import { SocialMediaList, Logos, SocialMedia, Logo } from './types';

const socialMedia = ref<SocialMediaList>({
  [SocialMedia.Telegram]: 'https://t.me/johndoe',
  [SocialMedia.Facebook]: 'https://facebook.com/johndoe',
  [SocialMedia.Youtube]: 'https://youtube.com/johndoe',
  [SocialMedia.Instagram]: 'https://instagram.com/johndoe',
  [SocialMedia.Twitter]: 'https://twitter.com/johndoe',
})

const logos = ref<Logos>({
  [Logo.Nimiq]: true,
  [Logo.Kryptostadt]: false,
  [Logo.Criptociudad]: false,
})

const emailProps = reactive({
  name: 'John Doe',
  email: 'johndoe@nimiq.com',
  phoneNumber: '+1 123 456 7890',
  socialMedia,
  logos,
  disclosure: `
Disclosure:
Message test class font face subscriber mail video cross-campaign email lotus transactional, week the double selective html exactly authentication help uce reverse, signature ecoa group sends none rich domainkeys mailing delivery. Targeting content confirmation html crm rental is &, important client figuring line rate pushed handling, try started avoid alt be digest.
Email worm clients of never challenge pretty market subscribers, flawless verification effective segment read uce div get, msp want an pre forward right subscriber. Great place denial-of-service cost uniform folder market snail bring dpi relay, opt-in call hygiene open treat line blacklist address.
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
  <div style="margin: 0 auto; max-width: 1100px">

    <h1>
      Nimiq Email Signatures
    </h1>
    <p>
      A dynamic email signature generator for Nimiq.
    </p>

    <h2>How to use it?</h2>
    <ol>
      <li>✒️ Fill up the form below with the information for your contact.</li>
      <li>🔬 Check the preview of the signature.</li>
      <li>📁 Copy or download the HTML.
        <button @click="copy">Copy</button>
        <button style="margin-left:8px" @click="download">Download</button>

        <blockquote style="margin:0">
          <p style="margin:0">
            <strong>Important:</strong> Download might not work. Create a new file in your computer called
            <code>
                "nimiq-email-signature.html"</code> and paste the HTML there.
          </p>
        </blockquote>
      </li>
      <li>✉️ Read this guides to add the HTML to you email client:
        <ul>
          <li><a href="https://www.lokitimestwo.com/adding-custom-html-signature-email-gmail/" target="_blank">GMail</a>
          </li>
          <li><a
              href="https://www.christopherbolt.com/support/knowledgebase/24/Installing-HTML-email-signatures-in-Microsoft-Outlook.html"
              target="_blank">Outlook</a></li>
          <li><a href="https://docs.gandi.net/en/gandimail/sogo_webmail/signature.html" target="_blank">Nimiq Email
              (SOGo)</a></li>
        </ul>
      </li>

      <li>🪄 Send an email to yourself to test if it works</li>
    </ol>
  </div>

  <div style="display: flex; gap: 32px; justify-content: center; margin: 12px auto">
    <div style="width: min(300px, 500px, 600px)">
      <h2>Your data</h2>
      <form>
        <fieldset style="display: flex; flex-direction:column; margin-bottom: 24px">
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
        <fieldset style="margin-bottom: 24px; user-select: none; display: flex; flex-direction: column">
          <legend>Logos</legend>

          <label>
            <input type="checkbox" :name="Logo.Nimiq"  :value="Logo.Nimiq" v-model="emailProps.logos[Logo.Nimiq]" />
            Nimiq (nimiq.com)
          </label>
          <label>
            <input type="checkbox" :name="Logo.Criptociudad" :value="Logo.Criptociudad" v-model="emailProps.logos[Logo.Criptociudad]" />
            Criptociudad (criptociudad.cr)
          </label>
          <label>
            <input type="checkbox" :name="Logo.Kryptostadt" :value="Logo.Kryptostadt" v-model="emailProps.logos[Logo.Kryptostadt]" />
            Kryptostadt (kryptostadt.info)
          </label>
        </fieldset>

        <fieldset style="margin-bottom: 24px; display: flex; flex-direction: column">
          <legend>Social Media</legend>
          <blockquote style="margin: 0">
            <p style="margin:0">
              <strong>Important:</strong> Please only add the social media you are active on. Empty fields will not be
              shown in the signature. Use the full URL, including the <code>https://</code> part.
            </p>
          </blockquote>

          <label style="margin-top: 12px">
            Telegram:
            <input v-model="emailProps.socialMedia.telegram" />
          </label>
          <label>
            Facebook:
            <input v-model="emailProps.socialMedia.facebook" />
          </label>
          <label>
            Youtube:
            <input v-model="emailProps.socialMedia.youtube" />
          </label>
          <label>
            Instagram:
            <input v-model="emailProps.socialMedia.instagram" />
          </label>
          <label>
            Twitter:
            <input v-model="emailProps.socialMedia.twitter" />
          </label>
        </fieldset>
        <fieldset style="margin-top: 24px">
          <legend>Disclosure</legend>
          <textarea v-model="emailProps.disclosure"
            style="width: 100%; height: 100px; min-height: 400px; resize: none; box-sizing: border-box; padding: 12px; margin-top: 12px; font-size:12px;"></textarea>
        </fieldset>
      </form>
    </div>

    <div>
      <h2>Preview</h2>
      <div style="border: 1px solid #ccc; margin: 0 auto; min-width: 400px">
        <Email v-bind="emailProps" />
      </div>
    </div>

  </div>
</template>

