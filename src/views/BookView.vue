<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooks } from '@/composables/useBooks'
import { useReservationsStore } from '@/stores/reservations'
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'

const props = defineProps({ id: String })
const router = useRouter()
const { books, loading, load } = useBooks()
const reservations = useReservationsStore()

const book = computed(() =>
  books.value.find((b) => b.id === Number(props.id))
)

const isReserved = computed(() =>
  book.value ? reservations.has(book.value.id) : false
)

// État de la modale de réservation
const openModal = ref(false)
const reservationSent = ref(false)

const resForm = reactive({
  name: '',
  email: '',
  pickupDate: '',
})

const resTouched = reactive({
  name: false,
  email: false,
  pickupDate: false,
})

const resErrors = computed(() => ({
  name: resForm.name.trim().length < 2 ? 'Votre nom est requis (au moins 2 caractères).' : '',
  email: /^\S+@\S+\.\S+$/.test(resForm.email) ? '' : 'Adresse e-mail valide requise.',
  pickupDate: !resForm.pickupDate ? 'Veuillez sélectionner une date de retrait.' : '',
}))

const isResValid = computed(() => Object.values(resErrors.value).every((e) => !e))

function submitReservation() {
  Object.keys(resTouched).forEach((k) => (resTouched[k] = true))
  if (!isResValid.value) return

  reservations.add({
    bookId: book.value.id,
    bookTitle: book.value.title,
    name: resForm.name,
    email: resForm.email,
    pickupDate: resForm.pickupDate,
  })

  reservationSent.value = true
}

function closeModal() {
  openModal.value = false
  if (reservationSent.value) {
    resForm.name = ''
    resForm.email = ''
    resForm.pickupDate = ''
    Object.keys(resTouched).forEach((k) => (resTouched[k] = false))
    reservationSent.value = false
  }
}

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
          {{ book.available ? '● Exemplaire disponible' : '● Actuellement emprunté' }}
        </p>

        <div v-if="isReserved" class="reservation-badge" role="status">
          ✓ Vous avez réservé cet ouvrage (enregistré dans vos réservations).
        </div>

        <div class="book-detail__desc">
          <h2 class="book-detail__desc-title">Résumé de l'œuvre</h2>
          <p>{{ book.summary }}</p>
        </div>

        <div class="book-detail__actions">
          <RouterLink to="/catalogue" class="back-link">
            ← Retour au catalogue
          </RouterLink>

          <BaseButton
            :disabled="!book.available"
            variant="primary"
            @click="openModal = true"
          >
            {{ isReserved ? 'Réserver à nouveau' : 'Réserver ce livre' }}
          </BaseButton>
        </div>
      </div>
    </article>

    <!-- Modale de réservation accessible -->
    <BaseModal
      :open="openModal"
      :title="book ? 'Réserver : ' + book.title : 'Réservation'"
      @close="closeModal"
    >
      <div v-if="reservationSent" class="modal-success" role="status">
        <h3 class="modal-success__title">✓ Réservation confirmée !</h3>
        <p>
          Merci <strong>{{ resForm.name }}</strong>, votre exemplaire de <em>« {{ book?.title }} »</em>
          a été réservé pour un retrait le <strong>{{ resForm.pickupDate }}</strong>.
        </p>
        <p class="modal-success__hint">
          Un e-mail récapitulatif a été simulé vers {{ resForm.email }}.
        </p>
        <BaseButton variant="primary" @click="closeModal">
          Fermer la fenêtre
        </BaseButton>
      </div>

      <form v-else class="modal-form" novalidate @submit.prevent="submitReservation">
        <div class="field" :class="{ 'field--invalid': resTouched.name && !!resErrors.name }">
          <label for="res-name" class="field__label">Votre nom complet *</label>
          <input
            id="res-name"
            v-model="resForm.name"
            type="text"
            class="field__input"
            @blur="resTouched.name = true"
            :aria-invalid="resTouched.name && !!resErrors.name"
            aria-describedby="res-name-err"
            required
          />
          <p
            id="res-name-err"
            v-if="resTouched.name && resErrors.name"
            class="field__error"
            role="alert"
          >
            {{ resErrors.name }}
          </p>
        </div>

        <div class="field" :class="{ 'field--invalid': resTouched.email && !!resErrors.email }">
          <label for="res-email" class="field__label">Adresse e-mail *</label>
          <input
            id="res-email"
            v-model="resForm.email"
            type="email"
            class="field__input"
            @blur="resTouched.email = true"
            :aria-invalid="resTouched.email && !!resErrors.email"
            aria-describedby="res-email-err"
            required
          />
          <p
            id="res-email-err"
            v-if="resTouched.email && resErrors.email"
            class="field__error"
            role="alert"
          >
            {{ resErrors.email }}
          </p>
        </div>

        <div class="field" :class="{ 'field--invalid': resTouched.pickupDate && !!resErrors.pickupDate }">
          <label for="res-date" class="field__label">Date de retrait souhaitée *</label>
          <input
            id="res-date"
            v-model="resForm.pickupDate"
            type="date"
            class="field__input"
            @blur="resTouched.pickupDate = true"
            :aria-invalid="resTouched.pickupDate && !!resErrors.pickupDate"
            aria-describedby="res-date-err"
            required
          />
          <p
            id="res-date-err"
            v-if="resTouched.pickupDate && resErrors.pickupDate"
            class="field__error"
            role="alert"
          >
            {{ resErrors.pickupDate }}
          </p>
        </div>

        <div class="modal-form__actions">
          <button type="button" class="btn-cancel" @click="closeModal">
            Annuler
          </button>
          <BaseButton variant="primary">Confirmer la réservation</BaseButton>
        </div>
      </form>
    </BaseModal>
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
  margin: 0 0 var(--space-2) 0;
  font-weight: 700;
  color: var(--color-primary);
  font-size: 1rem;
}

.book-detail__status--off {
  color: var(--color-danger);
}

.reservation-badge {
  background: rgba(31, 111, 84, 0.1);
  color: var(--color-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: var(--space-4);
  border: 1px solid rgba(31, 111, 84, 0.25);
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

/* Formulaire modale */
.modal-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field__label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.field__input {
  padding: var(--space-2) var(--space-4);
  border: 1px solid #cbd5e1;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: var(--fs-400);
  background: var(--color-surface);
  color: var(--color-text);
}

.field__input:focus {
  outline: 3px solid var(--color-primary);
  outline-offset: 1px;
}

.field--invalid .field__input {
  border-color: var(--color-danger);
}

.field__error {
  margin: 0;
  font-size: 0.825rem;
  color: var(--color-danger);
  font-weight: 500;
}

.modal-form__actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-2);
}

.btn-cancel {
  background: transparent;
  border: none;
  color: #64748b;
  font-family: inherit;
  font-size: var(--fs-400);
  cursor: pointer;
  padding: var(--space-2);
}

.btn-cancel:hover {
  color: var(--color-text);
}

.modal-success {
  text-align: center;
  padding: var(--space-2) 0;
}

.modal-success__title {
  color: var(--color-primary);
  font-size: 1.3rem;
  margin: 0 0 var(--space-2) 0;
}

.modal-success__hint {
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: var(--space-4);
}
</style>
