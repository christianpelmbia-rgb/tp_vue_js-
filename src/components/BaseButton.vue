<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | ghost
  to: { type: [String, Object], default: null }, // lien interne si renseigné
})
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'button'"
    :to="to"
    :class="['btn', 'btn--' + variant]"
  >
    <slot />
  </component>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-family: inherit;
  font-size: var(--fs-400);
  font-weight: 600;
  border-radius: var(--radius);
  cursor: pointer;
  text-decoration: none;
  border: 2px solid transparent;
  transition: all 0.2s ease-in-out;
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
  border-color: var(--color-primary);
}

.btn--primary:hover {
  background: #185843;
  border-color: #185843;
}

.btn--ghost {
  background: transparent;
  color: var(--color-primary);
  border-color: var(--color-primary);
}

.btn--ghost:hover {
  background: rgba(31, 111, 84, 0.08);
}

.btn:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}
</style>
