<script setup lang="ts">
import { Ref, h, reactive, ref } from 'vue';
import Email from './components/Email.vue';
import { useRender } from 'vue-email';
import { Logos, Logo, SocialMedia } from './types';
import { useLocalStorage, useMediaQuery } from '@vueuse/core';
import { profile as defaultProfile } from './profiles';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs/index'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from './components/ui/select/index'
import Button from './components/ui/Button.vue'
import Link from './components/ui/Link.vue'
import Label from './components/ui/Label.vue'
import Input from './components/ui/Input.vue'
import TextArea from './components/ui/TextArea.vue'
import './assets/index.css'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet/index'
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover/index'
import Toaster from './components/ui/toast/Toaster.vue'
import { useToast } from './components/ui/toast/use-toast'




const name = useLocalStorage('name', defaultProfile.name, { writeDefaults: false }) as unknown as Ref<string>;
const role = useLocalStorage('role', defaultProfile.role, { writeDefaults: false }) as unknown as Ref<string>;
const email = useLocalStorage('email', defaultProfile.email, { writeDefaults: false }) as unknown as Ref<string>;
const phoneNumber = useLocalStorage('phoneNumber', defaultProfile.phoneNumber, { writeDefaults: false }) as unknown as Ref<string>;
const logos = useLocalStorage('logos', defaultProfile.logos, { writeDefaults: false }) as unknown as Ref<Logos>;
const telegram = useLocalStorage('telegram', defaultProfile.telegram, { writeDefaults: false }) as unknown as Ref<string>;
const facebook = useLocalStorage('facebook', defaultProfile.facebook, { writeDefaults: false }) as unknown as Ref<string>;
const youtube = useLocalStorage('youtube', defaultProfile.youtube, { writeDefaults: false }) as unknown as Ref<string>;
const instagram = useLocalStorage('instagram', defaultProfile.instagram, { writeDefaults: false }) as unknown as Ref<string>;
const twitter = useLocalStorage('twitter', defaultProfile.twitter, { writeDefaults: false }) as unknown as Ref<string>;
const primarySocial = useLocalStorage<SocialMedia>('primarySocial', SocialMedia.Telegram, { writeDefaults: false }) as unknown as Ref<SocialMedia>;
const disclosure = useLocalStorage('disclosure', defaultProfile.disclosure, { writeDefaults: false }) as unknown as Ref<string>;


const visited = ref(new Set())

const input = reactive({ name, role, email, phoneNumber, logos, telegram, facebook, youtube, instagram, twitter, disclosure, primarySocial });

const pretty = useLocalStorage('pretty', false);
const {toast} = useToast();

async function copy() {
  await navigator.clipboard?.writeText(await useRender(Email, { props: input }, { pretty: pretty.value }));
  useToast().toast({ title: 'Copied to clipboard!' })
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
  toast({
    title: 'Are you sure you want to reset the data?',
    description: 'This will reset all the data to the default values and you will lose all the changes you have made.',
    action: h(Button, { variant: 'destructive', size: 'sm', onClick: () => { localStorage.clear(); window.location.reload() } }, 'Yes, reset data'),
  })
}

const isDark = useMediaQuery('(prefers-color-scheme: dark)')

</script>

<template>
  <div class="min-h-[100dvh] flex flex-col">
    <div class="py-10 bg-slate-100">
      <div class="max-w-[1041px] mx-auto">
        <header class="flex items-center justify-between">
          <h1 class="text-2xl font-bold">Nimiq Email Signatures</h1>
          <div class="flex gap-2">
            <Sheet>
              <SheetTrigger><Button size="sm">Learn How to Use it</Button></SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>5 simples steps</SheetTitle>
                  <SheetDescription class="prose">
                    <ol>
                      <li>Fill the form with the information <b>you want to display</b> in your signature.</li>
                      <li>Check the preview of the signature.</li>
                      <li>Copy or download the HTML.
                        <blockquote style="margin:0">
                          <p style="margin:0">
                            If "Download" does not work, please create a new file in your computer called
                            <code>nimiq-email-signature.html</code> and paste the HTML there.
                          </p>
                        </blockquote>
                      </li>
                      <li>Add the HTML in to your email. You can follow any of these guides:
                        <ul>
                          <li><a href="/sogo-instructions.pdf" target="_blank">Nimiq Email
                              (SOGo)</a></li>
                          <li><a href="https://www.lokitimestwo.com/adding-custom-html-signature-email-gmail/"
                              target="_blank">GMail</a>
                          </li>
                          <li><a
                              href="https://www.christopherbolt.com/support/knowledgebase/24/Installing-HTML-email-signatures-in-Microsoft-Outlook.html"
                              target="_blank">Outlook</a></li>
                        </ul>


                      </li>

                      <li>Send an email to yourself to test if it works</li>
                    </ol>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <Link target="_blank" variant="link" href="https://github.com/onmax/nimiq-ui/tree/main/apps/email-signatures"
              size="sm" class="flex gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
              <path fill="currentColor" fill-rule="evenodd"
                d="M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2" />
            </svg>
            </Link>
          </div>
        </header>
        <p class="text-lg text-muted-foreground">
          Create your own Nimiq email signature immediately.
        </p>
      </div>
    </div>


    <div class="flex flex-wrap justify-center flex-1 gap-16 pt-10 bg-slate-100">
      <div class="flex flex-col gap-4 w-sm">
        <div class="flex justify-between">
          <h2 class="text-xl">Your data</h2>
          <Button @click="resetData" variant="outline" size="sm" class="flex gap-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 32 32">
              <path fill="currentColor"
                d="M18 28A12 12 0 1 0 6 16v6.2l-3.6-3.6L1 20l6 6l6-6l-1.4-1.4L8 22.2V16a10 10 0 1 1 10 10Z" />
            </svg>
            Reset data</Button>
        </div>
        <Tabs default-value="personal" class="flex flex-col">
          <TabsList class="bg-slate-200">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="social" @click="visited.add('social')" :notification="!visited.has('social')">Social Media
            </TabsTrigger>
            <TabsTrigger value="logos" @click="visited.add('logos')"
              :notification="!visited.has('logos') && visited.has('social')">Logos</TabsTrigger>
            <TabsTrigger value="disclaimer" @click="visited.add('disclaimer')"
              :notification="!visited.has('disclaimer') && visited.has('social') && visited.has('logos')">Disclaimer
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personal" class="flex flex-col gap-4">
            <Label>Name <Input v-model="name" /></Label>
            <Label>Role <Input v-model="role" /></Label>
            <Label>Email <Input v-model="email" /></Label>
            <Label>Phone Number <Input v-model="phoneNumber" /></Label>
          </TabsContent>
          <TabsContent value="social" class="flex flex-col">
            <p class="px-2 text-sm text-muted-foreground w-[300px] pb-2">
              This is the social media that will be shown right after your name.
            </p>
            <Select v-model="primarySocial">
              <SelectTrigger>
                <SelectValue placeholder="''" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="SocialMedia.None">None</SelectItem>
                  <SelectItem :value="SocialMedia.Telegram">Telegram</SelectItem>
                  <SelectItem :value="SocialMedia.Facebook">Facebook</SelectItem>
                  <SelectItem :value="SocialMedia.Twitter">Twitter</SelectItem>
                  <SelectItem :value="SocialMedia.Instagram">Instagram</SelectItem>
                  <SelectItem :value="SocialMedia.Youtube">Youtube</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <hr class="my-4">
            <Label>Telegram <Input v-model="telegram" /></Label>
            <Label>Twitter <Input v-model="twitter" /></Label>
            <Label>Instagram <Input v-model="instagram" /></Label>
            <Label>Facebook <Input v-model="facebook" /></Label>
            <Label>Youtube <Input v-model="youtube" /></Label>
          </TabsContent>
          <TabsContent value="logos" class="flex flex-col gap-4 px-6">
            <p class="text-sm text-muted-foreground w-[300px] pb-2">
              The image with a link for the project you want to highlight in the signature. You can select more than one.
            </p>

            <Label class="w-max">
              <input type="checkbox" class="sr-only peer" checked @input="logos[Logo.Nimiq] = !logos[Logo.Nimiq]" />
              <div class="p-4 rounded-md peer-checked:ring-2 peer-checked:ring-slate-600 peer-checked:bg-slate-200">
                <img :src="`https://www.nimiq.com/email-signatures/${Logo.Nimiq}.png`" alt="Nimiq Logo"
                  class=" rounded-md w-[80px] object-contain" />
              </div>
            </Label>
            <Label class="w-max">
              <input type="checkbox" class="sr-only peer" @input="logos[Logo.Criptociudad] = !logos[Logo.Criptociudad]" />
              <div class="p-4 rounded-md peer-checked:ring-2 peer-checked:ring-slate-600 peer-checked:bg-slate-200">
                <img :src="`https://www.nimiq.com/email-signatures/${Logo.Criptociudad}.png`" alt="Nimiq Logo"
                  class=" rounded-md w-[100px] object-contain" />
              </div>
            </Label>
            <Label class="w-max">
              <input type="checkbox" class="sr-only peer" @input="logos[Logo.Kryptostadt] = !logos[Logo.Kryptostadt]" />
              <div class="p-4 rounded-md peer-checked:ring-2 peer-checked:ring-slate-600 peer-checked:bg-slate-200">
                <img :src="`https://www.nimiq.com/email-signatures/${Logo.Kryptostadt}.png`" alt="Nimiq Logo"
                  class=" rounded-md w-[100px] object-contain" />
              </div>
            </Label>


          </TabsContent>
          <TabsContent value="disclaimer">
            <TextArea v-model="disclosure" />
          </TabsContent>
        </Tabs>
      </div>

      <div style="width: 600px;">
        <div class="flex justify-between mb-4">
          <div class="flex items-center gap-x-2">
            <h2 class="text-xl">Preview</h2>
            <Popover v-if="isDark">
              <PopoverTrigger>

                <Button size="sm" variant="ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 32 32">
                    <path fill="currentColor"
                      d="M13.503 5.414a15.076 15.076 0 0 0 11.593 18.194a11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016a13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555a1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38A1.015 1.015 0 0 0 14.98 3" />
                  </svg>
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <h3>
                  Dark mode enabled
                </h3>
                <p class="mt-2 text-sm text-muted-foreground">
                  Email viewed in dark mode due to system settings. Most clients show it in light mode. Disable dark mode
                  to
                  see
                  the light mode version.
                </p>
              </PopoverContent>
            </Popover>
          </div>
          <div class="flex gap-x-2">
            <Button @click="download" variant="outline" size="sm" class="flex gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 32 32">
                <path fill="currentColor"
                  d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4zm0-10l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10z" />
              </svg> Download
            </Button>
            <Button @click="copy" variant="outline" size="sm" class="flex gap-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 32 32">
                <path fill="currentColor"
                  d="M28 10v18H10V10zm0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2" />
                <path fill="currentColor" d="M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z" />
              </svg>
              Copy
            </Button>
          </div>
        </div>

        <div style="border: 1px solid rgba(225, 225, 232, 0.5); margin: 0 auto; ">
          <Email v-bind="input" />
        </div>
      </div>
    </div>
  </div>
  <Toaster />
</template>
