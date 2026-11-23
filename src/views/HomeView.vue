<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import { useFavoritesStore } from '@/stores/favorites'
import SearchBar from '@/components/SearchBar.vue'
import BookList from '@/components/BookList.vue'
import BaseButton from '@/components/BaseButton.vue'

const { books, loading, error, load } = useBooks()
const favorites = useFavoritesStore()
const query = ref('')

const featured = computed(() =>
  books.value
    .filter(b =>
      b.title.toLowerCase().includes(query.value.toLowerCase()) ||
      b.author.toLowerCase().includes(query.value.toLowerCase())
    )
    .slice(0, 8)
)

onMounted(load)
</script>

<template>
  <div class="home-view">
    <section class="hero">
      <h1 class="hero__title">Bienvenue à la bibliothèque</h1>
      <p class="hero__desc">
        Découvrez notre sélection d'ouvrages, réservez vos lectures et explorez le catalogue municipal.
      </p>
      <SearchBar v-model="query" />
      <div class="hero__actions">
        <BaseButton variant="primary" to="/catalogue">Explorer le catalogue</BaseButton>
        <BaseButton variant="ghost" to="/contact">Informations & Contact</BaseButton>
      </div>
    </section>

    <section aria-labelledby="coeur" class="section-featured">
      <div class="section-featured__header">
        <h2 id="coeur">Coups de cœur</h2>
        <span v-if="!loading && !error" class="section-featured__count">
          {{ featured.length }} livres affichés
        </span>
      </div>

      <div v-if="loading" class="status-box" role="status">
        <p>Chargement des coups de cœur…</p>
      </div>

      <div v-else-if="error" class="status-box status-box--error" role="alert">
        <p>{{ error }}</p>
        <BaseButton variant="primary" @click="load">Réessayer</BaseButton>
      </div>

      <div v-else-if="featured.length === 0" class="status-box">
        <p>Aucun livre ne correspond à votre recherche.</p>
      </div>

      <BookList
        v-else
        :books="featured"
        :favorites="favorites.ids"
        @toggle-favorite="favorites.toggle"
      />
    </section>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

.hero {
  text-align: center;
  padding: var(--space-6) var(--space-4);
  background: linear-gradient(180deg, rgba(31, 111, 84, 0.08) 0%, transparent 100%);
  border-radius: var(--radius);
  margin-top: var(--space-4);
  margin-bottom: var(--space-6);
}

.hero__title {
  margin: 0 0 var(--space-2) 0;
  font-size: 2rem;
  color: var(--color-text);
}

.hero__desc {
  margin: 0 auto var(--space-4) auto;
  color: #475569;
  max-width: 600px;
  font-size: var(--fs-400);
}

.hero__actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-4);
  flex-wrap: wrap;
}

.section-featured {
  margin-bottom: var(--space-6);
}

.section-featured__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: var(--space-4);
  border-bottom: 2px solid rgba(31, 111, 84, 0.15);
  padding-bottom: var(--space-2);
}

.section-featured__header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--color-primary);
}

.section-featured__count {
  color: #64748b;
  font-size: 0.875rem;
}

.status-box {
  text-align: center;
  padding: var(--space-6);
  background: var(--color-surface);
  border-radius: var(--radius);
  color: #64748b;
}

.status-box--error {
  color: var(--color-danger);
  border: 1px solid rgba(179, 38, 30, 0.2);
}
</style>
