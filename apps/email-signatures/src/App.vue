<script setup lang="ts">
import { reactive } from 'vue';
import Email from './components/Email.vue';
import { useRender } from 'vue-email';
import { Logo, SocialMedia } from './types';
import { useLocalStorage } from '@vueuse/core';
import { profile as defaultProfile } from './profiles';
import GithubButton from 'vue-github-button'

const name = useLocalStorage('name', defaultProfile.name, { writeDefaults: false });
const role = useLocalStorage('role', defaultProfile.role, { writeDefaults: false });
const email = useLocalStorage('email', defaultProfile.email, { writeDefaults: false });
const phoneNumber = useLocalStorage('phoneNumber', defaultProfile.phoneNumber, { writeDefaults: false });
const logos = useLocalStorage('logos', defaultProfile.logos, { writeDefaults: false });
const telegram = useLocalStorage('telegram', defaultProfile.telegram, { writeDefaults: false });
const facebook = useLocalStorage('facebook', defaultProfile.facebook, { writeDefaults: false });
const youtube = useLocalStorage('youtube', defaultProfile.youtube, { writeDefaults: false });
const instagram = useLocalStorage('instagram', defaultProfile.instagram, { writeDefaults: false });
const twitter = useLocalStorage('twitter', defaultProfile.twitter, { writeDefaults: false });
const primarySocial = useLocalStorage<SocialMedia>('primarySocial', SocialMedia.Telegram, { writeDefaults: false });
const disclosure = useLocalStorage('disclosure', defaultProfile.disclosure, { writeDefaults: false });

const input = reactive({ name, role, email, phoneNumber, logos, telegram, facebook, youtube, instagram, twitter, disclosure, primarySocial });

const pretty = useLocalStorage('pretty', false);

async function copy() {
  await navigator.clipboard?.writeText(await useRender(Email, { props: input }, { pretty: pretty.value }));
  alert('Copied to clipboard!');
}

async function download() {
  const html = await useRender(Email, { props: input }, { pretty: pretty.value });
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'nimiq-email-signature.html';
  a.click();
  URL.revokeObjectURL(url);
}

function resetData() {
  if (confirm('Are you sure you want to reset the data?')) {
    localStorage.clear();
    window.location.reload();
  }
}

const showDarkPreview = useLocalStorage('showDarkPreview', false); 
</script>

<template>
  <div style="margin: 0 auto; max-width: 1100px">

    <h1>
      Nimiq Email Signatures
    </h1>
    <p>
      A dynamic email signature generator for Nimiq.
      <github-button href="https://github.com/onmax/nimiq-ui/tree/main/apps/email-signatures"
        aria-label="Source code on GitHub" style="float:right">See source code</github-button>
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
          <label style="margin-left:8px">
            <input type="checkbox" v-model="pretty" /> Pretty output (leave unchecked for better output)
          </label>
        </blockquote>
      </li>
      <li>✉️ Read this guides to add the HTML to you email client:
        <ul>
          <li><a href="https://www.lokitimestwo.com/adding-custom-html-signature-email-gmail/" target="_blank">GMail</a>
          </li>
          <li><a
              href="https://www.christopherbolt.com/support/knowledgebase/24/Installing-HTML-email-signatures-in-Microsoft-Outlook.html"
              target="_blank">Outlook</a></li>
          <li><a href="/sogo-instructions.pdf" target="_blank">Nimiq Email
              (SOGo)</a></li>
        </ul>


      </li>

      <li>🪄 Send an email to yourself to test if it works</li>
    </ol>
  </div>

  <div style="display: flex; gap: 32px; justify-content: center; margin: 12px auto">
    <div style="width: min(300px, 500px, 600px)">
      <div style="display: flex; gap: 8px; justify-content: space-between; align-items: center;">
        <h2>Your data</h2> <button style="height: max-content;" @click="resetData">Reset data</button>
      </div>
      <form>
        <fieldset>
          <legend>Personal info</legend>
          <label>
            Name:
            <input v-model="name" />
          </label>
          <label>
            Role:
            <input v-model="role" />
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
        <fieldset style="user-select: none; ">
          <legend>Logos</legend>

          <label>
            <input type="checkbox" :name="Logo.Nimiq" :value="Logo.Nimiq" v-model="logos[Logo.Nimiq]" />
            Nimiq (nimiq.com)
          </label>
          <label>
            <input type="checkbox" :name="Logo.Criptociudad" :value="Logo.Criptociudad"
              v-model="logos[Logo.Criptociudad]" />
            Criptociudad (criptociudad.cr)
          </label>
          <label>
            <input type="checkbox" :name="Logo.Kryptostadt" :value="Logo.Kryptostadt" v-model="logos[Logo.Kryptostadt]" />
            Kryptostadt (kryptostadt.info)
          </label>
        </fieldset>

        <fieldset>
          <legend>Social Media</legend>
          <blockquote style="margin: 0">
            <p style="margin:0">
              <strong>Important:</strong> Please only add the social media you are active on. Empty fields will not be
              shown in the signature. Use the full URL, including the <code>https://</code> part.
            </p>
          </blockquote>

          <label style="margin-top: 12px">
            Primary Social Media:

            <select v-model="primarySocial">
              <option v-for="social in Object.values(SocialMedia)" :value="social">{{ social }}</option>
            </select>
          </label>

          <label style="margin-top: 12px">
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
          <label>
            Twitter:
            <input v-model="twitter" />
          </label>
        </fieldset>
        <fieldset>
          <legend>Disclosure</legend>
          <textarea v-model="disclosure"
            style="width: 100%; height: 100px; min-height: 400px; resize: none; box-sizing: border-box; padding: 12px; margin-top: 12px; font-size:12px;"></textarea>
        </fieldset>
      </form>
    </div>

    <div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <h2>Preview</h2>
        <button @click="showDarkPreview = !showDarkPreview">
          <svg v-if="showDarkPreview" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path fill="#888888" d="M16 12.005a4 4 0 1 1-4 4a4.005 4.005 0 0 1 4-4m0-2a6 6 0 1 0 6 6a6 6 0 0 0-6-6M5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.9 21.692l1.414 1.414l-3.505 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.414l3.506 3.506l-1.414 1.414zm3.313-8.1h5v2h-5zm-3.313-6.101l3.506-3.506l1.414 1.414l-3.506 3.506zM15 2.005h2v5h-2z"/></svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32"><path fill="#888888" d="M13.503 5.414a15.076 15.076 0 0 0 11.593 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3"/></svg>
        </button>


      </div>
      <div style="border: 1px solid rgba(225, 225, 232, 0.5); margin: 0 auto; width: 600px" :class="showDarkPreview ? 'dark' : ''">
        <Email v-bind="input" />
      </div>
    </div>

  </div>
</template>

<style>
fieldset {
  border-color: rgba(225, 225, 232, 0.5);
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}

.dark   {
  background-color: #1f2338 !important;
  color: #fff !important;
}
</style>
