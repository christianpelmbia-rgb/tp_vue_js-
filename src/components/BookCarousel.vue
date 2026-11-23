<script setup>
import { ref, computed } from 'vue'
import BookCard from '@/components/BookCard.vue'

const props = defineProps({ items: { type: Array, required: true } })
const index = ref(0)
const current = computed(() => props.items[index.value])

const next = () => (index.value = (index.value + 1) % props.items.length)
const prev = () =>
  (index.value = (index.value - 1 + props.items.length) % props.items.length)
</script>

<template>
  <section
    class="carousel"
    aria-roledescription="carrousel"
    aria-label="Coups de cœur"
    @keydown.left="prev"
    @keydown.right="next"
  >
    <button
      type="button"
      class="carousel__btn"
      aria-label="Livre précédent"
      @click="prev"
    >
      ‹
    </button>

    <div class="carousel__stage">
      <Transition name="slide" mode="out-in">
        <BookCard v-if="current" :key="current.id" :book="current" />
      </Transition>
    </div>

    <button
      type="button"
      class="carousel__btn"
      aria-label="Livre suivant"
      @click="next"
    >
      ›
    </button>

    <p class="sr-only" aria-live="polite">
      Livre {{ index + 1 }} sur {{ items.length }}
    </p>
  </section>
</template>

<style scoped>
.carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  position: relative;
  max-width: 420px;
  margin: var(--space-4) auto var(--space-6) auto;
}

.carousel__stage {
  width: 260px;
  min-height: 420px;
}

.carousel__btn {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 2px solid var(--color-primary);
  background: var(--color-surface);
  color: var(--color-primary);
  font-size: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.carousel__btn:hover {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}

.carousel__btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
