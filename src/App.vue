<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import HomeView from '@/views/HomeView.vue'
</script>

<template>
  <a href="#contenu" class="skip-link">Aller au contenu principal</a>
  <AppHeader />
  <main id="contenu" tabindex="-1">
    <HomeView />
  </main>
  <AppFooter />
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -60px;
  left: var(--space-4);
  background: var(--color-primary);
  color: var(--color-primary-contrast);
  padding: var(--space-2) var(--space-4);
  z-index: 1000;
  border-radius: 0 0 var(--radius) var(--radius);
  font-weight: 600;
  text-decoration: none;
  transition: top 0.2s ease-in-out;
}

.skip-link:focus {
  top: 0;
  outline: 3px solid var(--color-primary-contrast);
  outline-offset: 2px;
}

main:focus {
  outline: none;
}
</style>
