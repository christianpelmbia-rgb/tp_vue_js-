<template>
  <div class="not-found">
    <div class="not-found__card">
      <span class="not-found__code">404</span>
      <h1 class="not-found__title">Page introuvable</h1>
      <p class="not-found__desc">
        Oups ! La page ou l'ouvrage que vous recherchez n'existe pas ou a été déplacé.
      </p>
      <div class="not-found__actions">
        <RouterLink to="/" class="btn btn--primary">Retourner à l'accueil</RouterLink>
        <RouterLink to="/catalogue" class="btn btn--ghost">Consulter le catalogue</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  padding: var(--space-6) var(--space-4);
  text-align: center;
}

.not-found__card {
  background: var(--color-surface);
  padding: var(--space-6);
  border-radius: var(--radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  width: 100%;
}

.not-found__code {
  display: block;
  font-size: 4rem;
  font-weight: 800;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: var(--space-2);
}

.not-found__title {
  margin: 0 0 var(--space-4) 0;
  font-size: 1.75rem;
  color: var(--color-text);
}

.not-found__desc {
  color: #64748b;
  margin-bottom: var(--space-6);
  line-height: 1.6;
}

.not-found__actions {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn--primary {
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}

.btn--primary:hover {
  background: #185843;
}

.btn--ghost {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
}

.btn--ghost:hover {
  background: rgba(31, 111, 84, 0.08);
}
</style>
