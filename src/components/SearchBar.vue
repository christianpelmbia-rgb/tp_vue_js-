<script setup>
const model = defineModel({ type: String, default: '' })
</script>

<template>
  <form class="search" role="search" @submit.prevent>
    <label for="q" class="sr-only">Rechercher un livre</label>
    <input
      id="q"
      v-model="model"
      type="search"
      placeholder="Titre, auteur…"
      class="search__input"
    />
  </form>
</template>

<style scoped>
.search {
  width: 100%;
  max-width: 32rem;
  margin: var(--space-4) auto;
}
.search__input {
  width: 100%;
  padding: var(--space-2) var(--space-4);
  font-family: inherit;
  font-size: var(--fs-400);
  border: 2px solid #cbd5e1;
  border-radius: var(--radius);
  background-color: var(--color-surface);
  color: var(--color-text);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(31, 111, 84, 0.2);
}
</style>
