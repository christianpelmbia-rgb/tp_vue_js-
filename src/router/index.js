import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Accueil — Biblio+' }
    },
    {
      path: '/catalogue',
      name: 'catalogue',
      component: () => import('@/views/CatalogueView.vue'), // lazy loading
      meta: { title: 'Catalogue des livres — Biblio+' }
    },
    {
      path: '/livres/:id',
      name: 'book',
      props: true,
      component: () => import('@/views/BookView.vue'),
      meta: { title: 'Détail du livre — Biblio+' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { title: 'Contact — Biblio+' }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Page non trouvée (404) — Biblio+' }
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// Guard de navigation pour actualiser le titre de la page (critère "Pour aller plus loin")
router.afterEach((to) => {
  document.title = to.meta.title || 'Biblio+ — Bibliothèque municipale'
})

export default router
