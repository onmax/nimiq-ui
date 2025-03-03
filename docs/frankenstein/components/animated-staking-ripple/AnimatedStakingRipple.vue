<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 148 148" text="green inverted:white">
    <radialGradient id="a" cx="-791" cy="458" r="1" gradientTransform="matrix(-83 0 0 83.5341 -66014 -38208)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#41a38e" />
      <stop offset="1" stop-color="#21bca5" />
    </radialGradient>
    <circle cx="73.76" cy="73.76" r="51.76" stroke-opacity=".8" stroke-width="3" style="--delay:200ms" stroke="currentColor" op-0 class="ripple" />
    <circle cx="73.76" cy="73.76" r="61.76" stroke-opacity=".6" stroke-width="3" style="--delay:400ms" stroke="currentColor" op-0 class="ripple" />
    <circle cx="73.76" cy="73.76" r="71.76" stroke-opacity=".4" stroke-width="3" style="--delay:600ms" stroke="currentColor" op-0 class="ripple" />
    <circle cx="73.76" cy="73.76" r="41.76" fill="url(#a)" un-fill=" inverted:white" />
    <path stroke="neutral-0 inverted:!green" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M72.53 75.07v16.61m0-16.61C60.13 75.07 56 68.33 56 55c15.5 0 16.53 6.64 16.53 20.07Zm18.71-9.5c0 12.4-6.31 18.89-18.71 18.89 0-17.56 5.28-18.89 18.71-18.89Z" translate-y-3 />
  </svg>
</template>

<style scoped>
svg {
  .ripple {
    animation: fastwave 1s ease alternate infinite;
    animation-delay: var(--delay);
  }
}

@keyframes fastwave {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.15;
  }
  100% {
    opacity: 0;
  }
}
</style>
