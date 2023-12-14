<script setup lang="ts">
import { reactive } from 'vue';
import Email from './components/Email.vue';
import { useRender } from 'vue-email';
import { Logo } from './types';
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
const disclosure = useLocalStorage('disclosure', defaultProfile.disclosure, { writeDefaults: false });

const input = reactive({ name, role, email, phoneNumber, logos, telegram, facebook, youtube, instagram, twitter, disclosure });

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
          <li><a href="https://docs.gandi.net/en/gandimail/sogo_webmail/signature.html" target="_blank">Nimiq Email
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
      <h2>Preview</h2>
      <div style="border: 1px solid rgba(225, 225, 232, 0.5); margin: 0 auto; width: 600px">
        <Email v-bind="input" />
      </div>
    </div>

  </div>
</template>

<style scoped>
fieldset {
  border-color: rgba(225, 225, 232, 0.5);
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}
</style>
