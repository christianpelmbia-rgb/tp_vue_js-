<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import BookList from '@/components/BookList.vue'
import BaseButton from '@/components/BaseButton.vue'

const { books, loading, error, load } = useBooks()
onMounted(load)

const query = ref('')
const category = ref('')
const sort = ref('title')
const page = ref(1)
const PER_PAGE = 8

const favoriteIds = ref([])

function toggleFavorite(id) {
  const index = favoriteIds.value.indexOf(id)
  if (index === -1) {
    favoriteIds.value.push(id)
  } else {
    favoriteIds.value.splice(index, 1)
  }
}

const categories = computed(() => [...new Set(books.value.map(b => b.category))])

const filtered = computed(() =>
  books.value
    .filter(b => !category.value || b.category === category.value)
    .filter(b =>
      (b.title + ' ' + b.author)
        .toLowerCase()
        .includes(query.value.trim().toLowerCase())
    )
    .sort((a, b) => (a[sort.value] > b[sort.value] ? 1 : -1))
)

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)))

const visible = computed(() =>
  filtered.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE)
)

watch([query, category, sort], () => {
  page.value = 1
})
</script>

<template>
  <div class="catalogue-view">
    <header class="catalogue-view__header">
      <h1 class="catalogue-view__title">Catalogue des ouvrages</h1>
      <p class="catalogue-view__subtitle">
        Consultez l'ensemble de nos collections physiques et numériques, filtrez et réservez.
      </p>
    </header>

    <!-- Contrôles : recherche, filtre catégorie, tri -->
    <section class="catalogue-controls" aria-label="Filtres et tri du catalogue">
      <div class="catalogue-controls__field catalogue-controls__field--search">
        <label for="catalog-search" class="sr-only">Rechercher par titre ou auteur</label>
        <input
          id="catalog-search"
          v-model="query"
          type="search"
          placeholder="Rechercher par titre, auteur…"
          class="control-input"
        />
      </div>

      <div class="catalogue-controls__field">
        <label for="catalog-category" class="control-label">Catégorie :</label>
        <select id="catalog-category" v-model="category" class="control-select">
          <option value="">Toutes</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>

      <div class="catalogue-controls__field">
        <label for="catalog-sort" class="control-label">Trier par :</label>
        <select id="catalog-sort" v-model="sort" class="control-select">
          <option value="title">Titre</option>
          <option value="year">Année</option>
        </select>
      </div>
    </section>

    <!-- Informations d'état -->
    <div v-if="!loading && !error" class="catalogue-meta">
      <p>
        <strong>{{ filtered.length }}</strong> livre{{ filtered.length > 1 ? 's' : '' }} au total
        <span v-if="query || category"> (sélection filtrée)</span>
      </p>
    </div>

    <!-- Gestion des 4 états : loading, error, vide, données -->
    <div v-if="loading" class="status-card" role="status">
      <p>Chargement du catalogue en cours…</p>
    </div>

    <div v-else-if="error" class="status-card status-card--error" role="alert">
      <p>{{ error }}</p>
      <BaseButton variant="primary" @click="load">Réessayer</BaseButton>
    </div>

    <div v-else-if="!filtered.length" class="status-card">
      <p>Aucun résultat ne correspond à votre recherche.</p>
      <button
        type="button"
        class="reset-btn"
        @click="query = ''; category = ''"
      >
        Réinitialiser les critères
      </button>
    </div>

    <div v-else>
      <BookList
        :books="visible"
        :favorites="favoriteIds"
        @toggle-favorite="toggleFavorite"
      />

      <!-- Navigation de pagination -->
      <nav v-if="pageCount > 1" class="pagination" aria-label="Pagination">
        <button
          type="button"
          class="pagination__btn"
          :disabled="page === 1"
          @click="page--"
        >
          ← Précédent
        </button>

        <span class="pagination__info">
          Page {{ page }} / {{ pageCount }}
        </span>

        <button
          type="button"
          class="pagination__btn"
          :disabled="page === pageCount"
          @click="page++"
        >
          Suivant →
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.catalogue-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-4);
}

.catalogue-view__header {
  margin-bottom: var(--space-6);
  border-bottom: 2px solid rgba(31, 111, 84, 0.15);
  padding-bottom: var(--space-4);
}

.catalogue-view__title {
  margin: 0 0 var(--space-2) 0;
  font-size: 2rem;
  color: var(--color-primary);
}

.catalogue-view__subtitle {
  margin: 0;
  color: #64748b;
  font-size: var(--fs-400);
}

.catalogue-controls {
  display: flex;
  gap: var(--space-4);
  align-items: center;
  flex-wrap: wrap;
  background: var(--color-surface);
  padding: var(--space-4);
  border-radius: var(--radius);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: var(--space-4);
}

.catalogue-controls__field {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.catalogue-controls__field--search {
  flex: 1;
  min-width: 240px;
}

.control-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text);
}

.control-input,
.control-select {
  padding: var(--space-2) var(--space-4);
  border: 1px solid #cbd5e1;
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-text);
  font-family: inherit;
  font-size: var(--fs-400);
}

.control-input {
  width: 100%;
}

.control-input:focus,
.control-select:focus {
  outline: 3px solid var(--color-primary);
  outline-offset: 1px;
}

.catalogue-meta {
  margin-bottom: var(--space-4);
  color: #64748b;
  font-size: 0.9rem;
}

.status-card {
  text-align: center;
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius);
  margin: var(--space-6) 0;
  color: #64748b;
}

.status-card--error {
  color: var(--color-danger);
  border: 1px solid rgba(179, 38, 30, 0.2);
}

.reset-btn {
  margin-top: var(--space-2);
  background: transparent;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 600;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-6);
  padding: var(--space-4) 0;
}

.pagination__btn {
  padding: var(--space-2) var(--space-4);
  border: 1px solid rgba(0, 0, 0, 0.15);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius);
  cursor: pointer;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.2s ease;
}

.pagination__btn:hover:not(:disabled) {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
  border-color: var(--color-primary);
}

.pagination__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pagination__info {
  font-size: 0.95rem;
  color: var(--color-text);
}
</style>
