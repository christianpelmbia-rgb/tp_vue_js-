<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <li
    class="nav__item"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @keydown.esc="open = false"
  >
    <button
      type="button"
      class="nav__btn"
      aria-haspopup="true"
      :aria-expanded="open"
      @click="open = !open"
    >
      Services ▾
    </button>
    <Transition name="fade">
      <ul v-if="open" class="nav__submenu">
        <li>
          <RouterLink to="/catalogue" @click="open = false">
            Catalogue complet
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/favoris" @click="open = false">
            Mes favoris
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/contact" @click="open = false">
            Nous contacter
          </RouterLink>
        </li>
      </ul>
    </Transition>
  </li>
</template>

<style scoped>
.nav__item {
  position: relative;
  list-style: none;
}

.nav__btn {
  background: transparent;
  border: none;
  color: inherit;
  font-family: inherit;
  font-size: var(--fs-400);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius);
  transition: background-color 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.nav__btn:hover,
.nav__btn:focus-visible {
  background: rgba(255, 255, 255, 0.15);
}

.nav__submenu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 11rem;
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 0.5rem 0;
  margin: 0.5rem 0 0 0;
  z-index: 50;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.nav__submenu li a {
  display: block;
  padding: 0.5rem 1rem;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.95rem;
  transition: background 0.15s, color 0.15s;
}

.nav__submenu li a:hover,
.nav__submenu li a:focus-visible {
  background: rgba(31, 111, 84, 0.08);
  color: var(--color-primary);
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
