<script setup lang="ts">
import { createReusableTemplate, useDark } from '@vueuse/core';
import { ref } from 'vue';

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ html: string }>()
const showLoading = ref(true)
const loadingSmall = ref(true)
</script>

<template>
  <DefineTemplate v-slot="{ html }">
    <div mt-3 flex="~ gap-4 col" w-full>
      <div v-html="html">
      </div>

      <details p-2>
        <summary>See HTML</summary>

        <div class="text-xs" of-x-auto w-full text-neutral rounded-md of-hidden>
          <code p-2>{{ html }}</code>
        </div>
      </details>
    </div>
  </DefineTemplate>

  <section max-w-700 mx-auto mt-8 p-6 class="border-base" rounded>
    <h2>Texts</h2>
    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<p subline>An awesome subline</p>`" />
      <ReuseTemplate :html="`<p label text-3>Build</p>`" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 border-base rounded>
    <h2>
      Arrows links
    </h2>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<a href='./' class='arrow-back'>Arrow back</a>`" />
      <ReuseTemplate :html="`<a href='https://nimiq.com' class='arrow'>External link</a>`" />
      <ReuseTemplate :html="`<a href='/typography' class='arrow'>Internal link</a>`" />
    </div>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`
        <a class='flex flex-col gap-3 raw max-w-120 bg-neutral-200 rounded-2 px-6 py-4'>
          <h3 class='arrow-back flex'>Arrow</h3>
          <p class='text-3 text-neutral-800 text-pretty'>You can even nest the arrow in <code>a tag</code> element</p>
        </a>
      `" />

      <ReuseTemplate :html="`
        <a href='./' class='flex flex-col gap-3 raw max-w-120 bg-neutral-200 rounded-2 px-6 py-4'>
          <h3 class='arrow flex after:ml-auto'>Arrow</h3>
          <p class='text-3 text-neutral-800 text-pretty'>You can even nest the arrow in <code>a tag</code> element</p>
        </a>
      `" />

      <ReuseTemplate :html="`
        <a href='https://nimiq.com' class='flex flex-col gap-3 raw max-w-120 bg-neutral-200 rounded-2 px-6 py-4'>
          <h3 class='arrow flex after:ml-auto'>Arrow</h3>
          <p class='text-3 text-neutral-800 text-pretty'>You can even nest the arrow in <code>a tag</code> element</p>
        </a>
      `" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 border-base rounded>
    <h2>Pills</h2>

    <div grid="~ gap-2 flow-col">
      <ReuseTemplate :html="`<a href='./' class='pill-blue'>Blue pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-green'>Green pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-orange'>Orange pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-red'>Red pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-gold'>Gold pill</a>`" />
    </div>

    <h3 mt-6>Small pills</h3>
    <div grid="~ gap-2 flow-col">
      <ReuseTemplate :html="`<a href='./' class='pill-blue pill-sm'>Blue pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-green pill-sm'>Green pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-orange pill-sm'>Orange pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-red pill-sm'>Red pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-gold pill-sm'>Gold pill</a>`" />
    </div>

    <h3 mt-6>Variants</h3>
    <div grid="~ gap-2 flow-col">
      <ReuseTemplate :html="`<a href='./' class='pill-secondary'>Secondary pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-secondary pill-sm'>Secondary small pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-tertiary'>Tertiary pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-tertiary pill-sm'>Tertiary small pill</a>`" />
    </div>

    <h3 mt-6>Bold pills</h3>
    <div grid="~ gap-2 flow-col">
      <ReuseTemplate :html="`<a href='./' class='pill-xl pill-blue'>Send</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-xl pill-tertiary'>Next step</a>`" />
    </div>

    <h3 mt-6>Combine it with other class</h3>
    <div grid="~ gap-2 flow-col">
      <ReuseTemplate :html="`<a href='./' class='pill-blue pill-sm arrow'>Pill with arrow</a>`" />

      <div flex="~ gap-4">
        <div mt-3 flex="~ gap-2 col">
          <button pill-blue pill-sm @click="showLoading = !showLoading">Toggle loading</button>
          <button pill-blue pill-sm @click="loadingSmall = !loadingSmall">Toggle size</button>
        </div>
        <ReuseTemplate
          :html="`<a href='./' class='pill-secondary ${showLoading ? 'loading' : 'not-loading'} ${loadingSmall ? 'pill-sm' : ''}' ${showLoading ? 'disabled' : ''}>Loading</a>`" />
      </div>
      <ReuseTemplate :html="`<a href='./' class='pill-xl pill-green label'>Awesome</a>`" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 border-base rounded>
    <h2>Inputs</h2>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<input type='text' placeholder='Hey, hello :)' class='input-box' rounded-full />`" />
      <ReuseTemplate :html="`<input type='text' class='input-box invalid' value='Something bad' rounded-full />`" />
      <ReuseTemplate :html="`<textarea class='input-box rounded-[3px]' placeholder='Hey, hello :)' />`" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 border-base rounded>
    <h2>Switch</h2>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<input type='checkbox' switch />`" />
      <ReuseTemplate :html="`<input type='checkbox' switch style='font-size: 24px' />`" />
      <ReuseTemplate :html="`<input type='checkbox' switch disabled/>`" />
      <ReuseTemplate :html="`<input type='checkbox' switch disabled checked/>`" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 border-base rounded>
    <h2>Borders</h2>

    <p>Borders might change. I would like to update the API</p>

    <p>
      Recommended: In Tailwind/UnoCSS, use just <code>ring-{COLOR}</code> instead
    </p>
    <p>
      Like this: <code>.ring-neutral-700</code>. No need to do <code>.ring-neutral-700.ring-1</code>
    </p>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<div size-16 rounded-sm grid place-content-center border-base>Box</div>`" />
      <ReuseTemplate :html="`<div size-16 grid place-content-center border-top>Box</div>`" />
      <ReuseTemplate :html="`<div size-16 grid place-content-center border-right>Box</div>`" />
      <ReuseTemplate :html="`<div size-16 grid place-content-center border-bottom>Box</div>`" />
      <ReuseTemplate :html="`<div size-16 grid place-content-center border-left>Box</div>`" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 border-base rounded>
    <h2>Buttons</h2>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<button text-8 close-btn></button>`" />
      <ReuseTemplate :html="`<button ghost-btn>SVG</button>`" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 border-base rounded>
    <h2>Flex Cards</h2>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<div flex-card><h2>An awesome card</h2></div>`" />
      <ReuseTemplate :html="`<a href='/' flex-card><h2>An awesome card</h2><p>with a link!</p></a>`" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 border-base rounded>
    <h2>Curtain</h2>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate
        :html="`<div class='prose curtain-y max-h-96 of-auto'><p>You can use the class <code>.curtain-y</code> to add the curtains. You can change the heigth of the curtain using <code>--mask-size</code></p><p>Only works if the browser supports animation-timeline</p>${Array.from({ length: 6 }).fill('Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet animi consequatur atque accusantium soluta cumque, temporibus ipsam eos voluptas porro architecto expedita quisquam eum et necessitatibus culpa odio, laudantium reprehenderit.').map(p => `<p>${p}</p>`).join('')}</div>`" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 border-base rounded>
    <h2>Notices</h2>

    <div grid="~ flow-col gap-2"> 
      <ReuseTemplate :html="`<p class='notice text-blue'>Info notice</p></ReuseTemplate>`" />
      <ReuseTemplate :html="`<p class='notice text-green'>Success notice</p></ReuseTemplate>`" />
      <ReuseTemplate :html="`<p class='notice text-orange'>Warning notice</p></ReuseTemplate>`" />
      <ReuseTemplate :html="`<p class='notice text-red'>Error notice</p></ReuseTemplate>`" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 border-base rounded>
    <h2>Card</h2>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<div class='card'>
   <header>
       <h1>Card Header</h1>
       <p class='notice text-orange'>Warning under the headline.</p>
    </header>
    <section>
        <p>Card Body</p>
    </section>
    <footer>
        <a>Card Footer</a>
    </footer>
</div>`" />
    </div>
  </section>
</template>
