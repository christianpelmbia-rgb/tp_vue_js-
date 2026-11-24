<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({ open: Boolean, title: String })
const emit = defineEmits(['close'])
const dialog = ref(null)

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      await nextTick()
      dialog.value?.focus()
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="modal"
        @click.self="emit('close')"
        @keydown.esc="emit('close')"
      >
        <div
          ref="dialog"
          class="modal__dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabindex="-1"
        >
          <div class="modal__header">
            <h2 id="modal-title" class="modal__title">{{ title }}</h2>
            <button
              type="button"
              class="modal__close"
              aria-label="Fermer la boîte de dialogue"
              @click="emit('close')"
            >
              ✕
            </button>
          </div>

          <div class="modal__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: var(--space-4);
}

.modal__dialog {
  width: 90%;
  max-width: 32rem;
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  outline: none;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding-bottom: var(--space-2);
}

.modal__title {
  margin: 0;
  font-size: 1.35rem;
  color: var(--color-primary);
}

.modal__close {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: #64748b;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal__close:hover,
.modal__close:focus-visible {
  color: var(--color-text);
  background: rgba(0, 0, 0, 0.06);
}
</style>
