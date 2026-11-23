<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooks } from '@/composables/useBooks'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({ id: String })
const router = useRouter()
const { books, loading, load } = useBooks()

const book = computed(() =>
  books.value.find(b => b.id === Number(props.id))
)

onMounted(async () => {
  await load()
  if (!book.value) {
    router.replace({ name: 'not-found' })
  }
})
</script>

<template>
  <div class="book-view-page">
    <p v-if="loading" class="status-loading" role="status">
      Chargement des détails de l'ouvrage…
    </p>

    <article v-else-if="book" class="book-detail">
      <div class="book-detail__media">
        <img
          :src="book.cover"
          :alt="'Couverture de ' + book.title"
          class="book-detail__cover"
          width="300"
          height="450"
        />
      </div>

      <div class="book-detail__body">
        <span class="book-detail__tag">{{ book.category }}</span>
        <h1 class="book-detail__title">{{ book.title }}</h1>
        <p class="book-detail__meta">
          Auteur : <strong>{{ book.author }}</strong> · Année : <strong>{{ book.year }}</strong>
        </p>

        <p
          class="book-detail__status"
          :class="{ 'book-detail__status--off': !book.available }"
        >
          {{ book.available ? '● Disponible à l\'emprunt' : '● Actuellement emprunté' }}
        </p>

        <div class="book-detail__desc">
          <h2 class="book-detail__desc-title">Résumé de l'œuvre</h2>
          <p>{{ book.summary }}</p>
        </div>

        <div class="book-detail__actions">
          <RouterLink to="/catalogue" class="back-link">
            ← Retour au catalogue
          </RouterLink>
          <BaseButton v-if="book.available" variant="primary" to="/contact">
            Réserver cet exemplaire
          </BaseButton>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.book-view-page {
  max-width: 1000px;
  margin: var(--space-6) auto;
  padding: 0 var(--space-4);
}

.status-loading {
  text-align: center;
  padding: var(--space-6);
  font-size: var(--fs-300);
  color: #64748b;
}

.book-detail {
  background: var(--color-surface);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--space-6);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

@media (max-width: 768px) {
  .book-detail {
    grid-template-columns: 1fr;
  }
}

.book-detail__media {
  background: var(--color-bg);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--space-4);
}

.book-detail__cover {
  max-width: 100%;
  height: auto;
  border-radius: calc(var(--radius) / 2);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.book-detail__body {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
}

.book-detail__tag {
  display: inline-block;
  align-self: flex-start;
  background: rgba(31, 111, 84, 0.1);
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  margin-bottom: var(--space-2);
}

.book-detail__title {
  margin: 0 0 var(--space-2) 0;
  font-size: 2rem;
  color: var(--color-text);
  line-height: 1.25;
}

.book-detail__meta {
  margin: 0 0 var(--space-4) 0;
  color: #64748b;
  font-size: var(--fs-400);
}

.book-detail__status {
  margin: 0 0 var(--space-4) 0;
  font-weight: 700;
  color: var(--color-primary);
  font-size: 1rem;
}

.book-detail__status--off {
  color: var(--color-danger);
}

.book-detail__desc {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: var(--space-4);
  margin-bottom: var(--space-6);
  flex: 1;
}

.book-detail__desc-title {
  font-size: 1.1rem;
  margin: 0 0 var(--space-2) 0;
  color: var(--color-text);
}

.book-detail__desc p {
  color: #475569;
  line-height: 1.6;
  margin: 0;
}

.book-detail__actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: var(--space-4);
}

.back-link {
  color: var(--color-primary);
  text-decoration: underline;
  font-weight: 600;
}
</style>
