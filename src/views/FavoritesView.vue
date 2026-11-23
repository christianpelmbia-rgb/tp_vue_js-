<script setup>
import { computed, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import { useFavoritesStore } from '@/stores/favorites'
import BookList from '@/components/BookList.vue'
import BaseButton from '@/components/BaseButton.vue'

const { books, loading, load } = useBooks()
const favorites = useFavoritesStore()

onMounted(load)

const list = computed(() =>
  books.value.filter((b) => favorites.has(b.id))
)
</script>

<template>
  <div class="favorites-view">
    <header class="favorites-view__header">
      <h1 class="favorites-view__title">Mes Livres Favoris</h1>
      <p class="favorites-view__subtitle">
        Retrouvez ici tous les ouvrages que vous avez ajoutés à votre liste de lecture personnelle.
      </p>
    </header>

    <div v-if="loading" class="status-card" role="status">
      <p>Chargement de vos favoris…</p>
    </div>

    <div v-else-if="list.length === 0" class="status-card">
      <p class="status-card__empty-title">Vous n'avez pas encore de favoris.</p>
      <p class="status-card__empty-text">
        Explorez notre catalogue et cliquez sur « ☆ Ajouter aux favoris » pour composer votre liste de lecture.
      </p>
      <BaseButton variant="primary" to="/catalogue">
        Explorer le catalogue
      </BaseButton>
    </div>

    <div v-else>
      <div class="favorites-meta">
        <p>
          Vous avez <strong>{{ list.length }}</strong> ouvrage{{ list.length > 1 ? 's' : '' }} dans vos favoris.
        </p>
      </div>

      <BookList
        :books="list"
        :favorites="favorites.ids"
        @toggle-favorite="favorites.toggle"
      />
    </div>
  </div>
</template>

<style scoped>
.favorites-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4);
}

.favorites-view__header {
  margin-bottom: var(--space-6);
  border-bottom: 2px solid rgba(31, 111, 84, 0.15);
  padding-bottom: var(--space-4);
}

.favorites-view__title {
  margin: 0 0 var(--space-2) 0;
  font-size: 2rem;
  color: var(--color-primary);
}

.favorites-view__subtitle {
  margin: 0;
  color: #64748b;
  font-size: var(--fs-400);
}

.favorites-meta {
  margin-bottom: var(--space-4);
  color: #64748b;
  font-size: 0.95rem;
}

.status-card {
  text-align: center;
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius);
  margin: var(--space-6) 0;
  color: #64748b;
}

.status-card__empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-2);
}

.status-card__empty-text {
  margin-bottom: var(--space-4);
}
</style>
