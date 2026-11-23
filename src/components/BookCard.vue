<script setup>
defineProps({
  book: { type: Object, required: true },
  favorite: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <article class="book-card">
    <img
      class="book-card__cover"
      :src="book.cover"
      width="200"
      height="300"
      :alt="'Couverture de ' + book.title"
      loading="lazy"
    />
    <div class="book-card__body">
      <h3 class="book-card__title">{{ book.title }}</h3>
      <p class="book-card__author">{{ book.author }}</p>
      <p
        class="book-card__status"
        :class="{ 'book-card__status--off': !book.available }"
      >
        {{ book.available ? 'Disponible' : 'Emprunté' }}
      </p>
      <button
        class="book-card__fav"
        type="button"
        :aria-pressed="favorite"
        @click="emit('toggle-favorite', book.id)"
      >
        {{ favorite ? '★ Retirer des favoris' : '☆ Ajouter aux favoris' }}
      </button>
      <slot name="actions" />
    </div>
  </article>
</template>

<style scoped>
.book-card {
  background: var(--color-surface);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.book-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
}
.book-card__cover {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}
.book-card__body {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--space-2);
}
.book-card__title {
  font-size: var(--fs-300);
  margin: 0;
  color: var(--color-text);
  font-weight: 700;
  line-height: 1.3;
}
.book-card__author {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
}
.book-card__status {
  margin: 0;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-primary);
}
.book-card__status--off {
  color: var(--color-danger);
}
.book-card__fav {
  margin-top: auto;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding: var(--space-2);
  border-radius: var(--radius);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.875rem;
  color: var(--color-text);
  transition: background-color 0.2s;
}
.book-card__fav:hover {
  background-color: var(--color-bg);
}
</style>
