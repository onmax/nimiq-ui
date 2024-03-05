<script setup lang="ts">
import { createReusableTemplate, useDark } from '@vueuse/core'

const isDark = useDark()

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{ html: string }>()
</script>

<template>
  <DefineTemplate v-slot="{ html }">
    <div mt-3 flex="~ gap-4 col">
      <div v-html="html">
      </div>

      <details p-2>
        <summary>See HTML</summary>

        <div of-x-auto w-full whitespace-nowrap bg-neutral-100 text-neutral p-2 rounded-md>
          <code>{{ html }}</code>
        </div>
      </details>
    </div>
  </DefineTemplate>

  <section max-w-700 mx-auto mt-8 p-6 ring ring-neutral-400 rounded>
    <h2>Subline</h2>
    <ReuseTemplate :html="`<p subline>An awesome subline</p>`" />
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
      <ReuseTemplate :html="`<a href='./' class='pill pill-blue'>Blue pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-green'>Green pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-orange'>Orange pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-red'>Red pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-gold'>Gold pill</a>`" />
    </div>

    <h3 mt-6>Small pills</h3>
    <div grid="~ gap-2 flow-col">
      <ReuseTemplate :html="`<a href='./' class='pill pill-blue small'>Blue pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-green small'>Green pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-orange small'>Orange pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-red small'>Red pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-gold small'>Gold pill</a>`" />
    </div>

    <h3 mt-6>Variants</h3>
    <div grid="~ gap-2 flow-col">
      <ReuseTemplate :html="`<a href='./' class='pill pill-secondary'>Secondary pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-secondary small'>Secondary small pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-tertiary'>Tertiary pill</a>`" />
      <ReuseTemplate :html="`<a href='./' class='pill pill-tertiary small'>Tertiary small pill</a>`" />
    </div>

    <h3 mt-6>Combine it with other class</h3>
    <div mt-3 flex="~ gap-4">
      <a href="./" class="pill pill-blue small arrow">
        Small pill with arrow
      </a>
    </div>
  </section>
</template>
