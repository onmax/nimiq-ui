<script setup lang="ts">
import { createReusableTemplate, useDark } from '@vueuse/core';
import { ref } from 'vue';

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ html: string }>()
const showLoading = ref(true)
</script>

<template>
  <DefineTemplate v-slot="{ html }">
    <div mt-3 flex="~ gap-4 col">
      <div v-html="html">
      </div>

      <details p-2>
        <summary>See HTML</summary>

        <div  class="text-xs" of-x-auto w-full text-neutral rounded-md of-hidden>
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

  <section max-w-700 mx-auto mt-8 p-6 ring ring-neutral-400 rounded>
    <h2>
      Arrows links
    </h2>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<a href='./' class='arrow-back'>Arrow back</a>`" />
      <ReuseTemplate :html="`<a href='https://nimiq.com' class='arrow'>External link</a>`" />
      <ReuseTemplate :html="`<a href='./typography' class='arrow'>Internal link</a>`" />
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 ring ring-neutral-400 rounded>
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
      <ReuseTemplate :html="`<a href='./' class='pill-blue small'>Blue pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-green small'>Green pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-orange small'>Orange pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-red small'>Red pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-gold small'>Gold pill</a>`" />
    </div>

    <h3 mt-6>Variants</h3>
    <div grid="~ gap-2 flow-col">
      <ReuseTemplate :html="`<a href='./' class='pill-secondary'>Secondary pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-secondary small'>Secondary small pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-tertiary'>Tertiary pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill-tertiary small'>Tertiary small pill</a>`" />
    </div>

    <h3 mt-6>Combine it with other class</h3>
    <div grid="~ gap-2 flow-col">
      <ReuseTemplate :html="`<a href='./' class='pill-blue small arrow'>Pill with arrow</a>`" />

      <div flex="~ gap-4">
        <button @click="showLoading = !showLoading" pill-blue small mt-3>Toggle loading</button>
        <ReuseTemplate :html="`<a href='./' class='pill-secondary small ${showLoading ? 'loading': 'not-loading'}'>Loading</a>`" />
      </div>  
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 ring ring-neutral-400 rounded>
    <h2>Inputs</h2>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<input type='text' placeholder='Hey, hello :)' class='input-text' rounded-full />`" /> 
      <ReuseTemplate :html="`<input type='text' class='input-text invalid' value='Something bad' rounded-full />`" /> 
      <ReuseTemplate :html="`<textarea class='input-text rounded-[3px]' placeholder='Hey, hello :)' />`" /> 
    </div>
  </section>

  <section max-w-700 mx-auto mt-8 p-6 ring ring-neutral-400 rounded>
    <h2>Borders</h2>

    <div grid="~ flow-col gap-2">
      <ReuseTemplate :html="`<div size-16 rounded-sm grid place-content-center border-base>Box</div>`" /> 
      <ReuseTemplate :html="`<div size-16 grid place-content-center border-top>Box</div>`" /> 
      <ReuseTemplate :html="`<div size-16 grid place-content-center border-right>Box</div>`" /> 
      <ReuseTemplate :html="`<div size-16 grid place-content-center border-bottom>Box</div>`" /> 
      <ReuseTemplate :html="`<div size-16 grid place-content-center border-left>Box</div>`" /> 
    </div>
  </section>
</template>

