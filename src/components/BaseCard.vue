<template>
  <article class="base-card">
    <header v-if="$slots.header" class="base-card__header">
      <slot name="header" />
    </header>
    <div class="base-card__body">
      <slot />
    </div>
    <footer v-if="$slots.actions" class="base-card__actions">
      <slot name="actions" />
    </footer>
  </article>
</template>

<style scoped>
.base-card {
  background: var(--color-surface);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.base-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.base-card__body {
  padding: var(--space-4);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.base-card__actions {
  padding: var(--space-2) var(--space-4);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  gap: var(--space-2);
}
</style>
