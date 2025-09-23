<template>
  <div class="playground" f-p-sm relative rounded-12 outline="1.5 neutral/10 ~" of-hidden>
    <slot />
  </div>
</template>

<style scoped>
.playground {
  --c1: var(--colors-neutral-0);
  --c2: color-mix(in oklch, var(--colors-neutral) 4%, transparent);
  background: repeating-linear-gradient(-45deg, var(--c2), var(--c2) 1.5px, var(--c1) 1.5px, var(--c1) 12px);
}
</style>
