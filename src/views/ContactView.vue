<script setup>
import { reactive, computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'

const form = reactive({ name: '', email: '', message: '' })
const touched = reactive({ name: false, email: false, message: false })
const sent = ref(false)

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? 'Votre nom est requis (au moins 2 caractères).' : '',
  email: /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Veuillez saisir une adresse e-mail valide.',
  message: form.message.trim().length < 10 ? 'Le message doit contenir au moins 10 caractères.' : '',
}))

const isValid = computed(() => Object.values(errors.value).every(e => !e))

function submit() {
  Object.keys(touched).forEach(k => (touched[k] = true))
  if (!isValid.value) return
  sent.value = true // simulation : aucun back-end dans ce projet
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.message = ''
  Object.keys(touched).forEach(k => (touched[k] = false))
  sent.value = false
}
</script>

<template>
  <div class="contact-view">
    <header class="contact-view__header">
      <h1 class="contact-view__title">Contact & Renseignements</h1>
      <p class="contact-view__subtitle">
        Une question sur nos collections, une réservation ou un événement ? Écrivez-nous.
      </p>
    </header>

    <div v-if="sent" class="alert-success" role="status">
      <h2 class="alert-success__title">✓ Message envoyé avec succès</h2>
      <p class="alert-success__text">
        Merci, votre message a bien été envoyé. L'équipe municipale vous répondra sous 48 heures.
      </p>
      <BaseButton variant="ghost" @click="resetForm">
        Envoyer un autre message
      </BaseButton>
    </div>

    <form v-else class="contact-form" novalidate @submit.prevent="submit">
      <div class="field" :class="{ 'field--invalid': touched.name && !!errors.name }">
        <label for="name" class="field__label">
          Nom et prénom <span class="field__required" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          class="field__input"
          @blur="touched.name = true"
          :aria-invalid="touched.name && !!errors.name"
          aria-describedby="name-err"
          required
        />
        <p
          id="name-err"
          v-if="touched.name && errors.name"
          class="field__error"
          role="alert"
        >
          {{ errors.name }}
        </p>
      </div>

      <div class="field" :class="{ 'field--invalid': touched.email && !!errors.email }">
        <label for="email" class="field__label">
          Adresse e-mail <span class="field__required" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          class="field__input"
          @blur="touched.email = true"
          :aria-invalid="touched.email && !!errors.email"
          aria-describedby="email-err"
          required
        />
        <p
          id="email-err"
          v-if="touched.email && errors.email"
          class="field__error"
          role="alert"
        >
          {{ errors.email }}
        </p>
      </div>

      <div class="field" :class="{ 'field--invalid': touched.message && !!errors.message }">
        <label for="message" class="field__label">
          Votre message <span class="field__required" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          v-model="form.message"
          class="field__textarea"
          rows="5"
          @blur="touched.message = true"
          :aria-invalid="touched.message && !!errors.message"
          aria-describedby="message-err"
          required
        ></textarea>
        <p
          id="message-err"
          v-if="touched.message && errors.message"
          class="field__error"
          role="alert"
        >
          {{ errors.message }}
        </p>
      </div>

      <div class="contact-form__actions">
        <BaseButton variant="primary">Envoyer le message</BaseButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.contact-view {
  max-width: 650px;
  margin: var(--space-6) auto;
  padding: 0 var(--space-4);
}

.contact-view__header {
  margin-bottom: var(--space-6);
  text-align: center;
}

.contact-view__title {
  font-size: 2rem;
  color: var(--color-primary);
  margin: 0 0 var(--space-2) 0;
}

.contact-view__subtitle {
  color: #64748b;
  margin: 0;
  font-size: var(--fs-400);
}

.alert-success {
  background: rgba(31, 111, 84, 0.08);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius);
  padding: var(--space-6);
  text-align: center;
}

.alert-success__title {
  color: var(--color-primary);
  margin: 0 0 var(--space-2) 0;
  font-size: 1.25rem;
}

.alert-success__text {
  color: var(--color-text);
  margin: 0 0 var(--space-4) 0;
}

.contact-form {
  background: var(--color-surface);
  padding: var(--space-6);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
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
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.field__required {
  color: var(--color-danger);
}

.field__input,
.field__textarea {
  padding: var(--space-2) var(--space-4);
  font-family: inherit;
  font-size: var(--fs-400);
  border: 1px solid #cbd5e1;
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-text);
  transition: border-color 0.2s;
}

.field__input:focus,
.field__textarea:focus {
  outline: 3px solid var(--color-primary);
  outline-offset: 1px;
}

.field--invalid .field__input,
.field--invalid .field__textarea {
  border-color: var(--color-danger);
}

.field__error {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-danger);
  font-weight: 500;
}

.contact-form__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-2);
}
</style>
