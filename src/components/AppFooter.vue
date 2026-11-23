<template>
  <footer class="app-footer">
    <div class="app-footer__content">
      <p class="app-footer__brand">
        <strong>Biblio+</strong> — Bibliothèque municipale
      </p>
      <p class="app-footer__hours">
        Ouvert du mardi au samedi de 9h à 18h (fermé dimanche et lundi)
      </p>
      <p class="app-footer__contact">
        12 rue des Livres, 75000 Paris • <RouterLink to="/contact">Nous contacter</RouterLink>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background: var(--color-surface);
  color: var(--color-text);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding: var(--space-6) var(--space-4);
  margin-top: var(--space-6);
  text-align: center;
}
.app-footer__content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.app-footer p {
  margin: 0;
  font-size: var(--fs-400);
}
.app-footer a {
  color: var(--color-primary);
  text-decoration: underline;
}
</style>
