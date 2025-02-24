<script setup lang="ts">
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'reka-ui'

const open = defineModel<boolean>('open')
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger v-bind="$attrs">
      <slot name="trigger" />
    </DialogTrigger>
    <DialogPortal>
      <Transition name="backdrop">
        <DialogOverlay fixed inset-0 z-200 bg-darkblue op-60 />
      </Transition>
      <Transition name="modal">
        <DialogContent
          xl="top-1/2 left-1/2 translate--1/2" rounded="t-8 xl:8"
          data-modal xl:max-w-500 fixed bottom-0 z-200 h-max max-h-85dvh w-full transform of-y-auto shadow-lg outline-none
          @open-auto-focus.prevent
        >
          <div relative bg-neutral-0 py-32 ring="1.5 neutral/3" class="modal-container">
            <DialogTitle text="24 center neutral lh-24" xl:px-40 mb-12 px-24 font-bold lh-none as="h2">
              <slot name="title" />
            </DialogTitle>
            <DialogDescription text="center neutral" xl:px-40 block px-24>
              <slot name="description" />
            </DialogDescription>

            <div xl:px-40 mt-12 px-24>
              <slot name="content" />
            </div>

            <DialogClose aria-label="Close" close-btn absolute right-16 top-16 text-28 />
          </div>
        </DialogContent>
      </Transition>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
/* https://github.com/nimiq/wallet/blob/a88d34bfa16930adbfd52baaa5b0809c38c5c365/src/components/modals/Modal.vue */

.backdrop-enter-active {
  transition: opacity 650ms cubic-bezier(0.3, 1, 0.2, 1);
}

.backdrop-leave-active {
  transition: opacity 650ms cubic-bezier(0.3, 0, 0, 1);
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* @screen lt-xl { */
@media screen and (max-width:1200px) {
  .modal-enter-active,
  .modal-leave-active {
    transition: transform 200ms ease-out;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    --un-translate-y: 100%;
  }
}

@media screen and (min-width:1200px) {
  .modal-enter-active,
  .modal-leave-active {
    transition:
      opacity 250ms cubic-bezier(0.4, 0, 0.2, 1),
      transform 100ms var(--nq-ease);
  }

  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    --un-scale-x: 0.96;
    --un-scale-y: 0.96;
    --un-translate-y: calc(-50% - 0.5rem);
  }
}
</style>
