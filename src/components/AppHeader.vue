<script setup>
import { useFavoritesStore } from '@/stores/favorites'

const favorites = useFavoritesStore()
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="app-header__logo">Biblio+</RouterLink>
    <nav aria-label="Navigation principale">
      <ul class="app-header__nav">
        <li><RouterLink to="/">Accueil</RouterLink></li>
        <li><RouterLink to="/catalogue">Catalogue</RouterLink></li>
        <li>
          <RouterLink to="/favoris" class="app-header__fav-link">
            Favoris
            <span class="badge" aria-label="nombre de favoris">
              {{ favorites.count }}
            </span>
          </RouterLink>
        </li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-6);
  background: var(--color-primary);
  color: var(--color-primary-contrast);
}
.app-header a {
  color: inherit;
  text-decoration: none;
}
.app-header__logo {
  font-size: var(--fs-300);
  font-weight: 700;
  letter-spacing: 0.05em;
}
.app-header__nav {
  display: flex;
  gap: var(--space-4);
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}
.app-header__nav a {
  padding-bottom: 2px;
  transition: border-color 0.2s;
  display: inline-flex;
  align-items: center;
}
.app-header__nav a:hover,
.app-header__nav a:focus-visible {
  text-decoration: underline;
}
.app-header__nav a.router-link-active {
  font-weight: 700;
  border-bottom: 2px solid currentColor;
}
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 999px;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  margin-left: 0.35rem;
  line-height: 1;
}
</style>
