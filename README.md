# Biblio+ — Portail Web de la Bibliothèque Municipale

Projet d'application web moderne réalisé dans le cadre de la certification **RNCP 39608 BC01 (Vue.js)**.  
Dépôt GitHub : **[https://github.com/christianpelmbia-rgb/tp_vue_js-](https://github.com/christianpelmbia-rgb/tp_vue_js-)**

## Séances couvertes

### Séance 1 : Cadrage, maquettage et initialisation du projet
- Cadrage du besoin usager & contraintes techniques.
- Backlog priorisé (12 User Stories méthode MoSCoW) : voir [`CADRAGE.md`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/CADRAGE.md).
- Initialisation avec Vite + Vue 3 (Composition API).
- Données structurées [books.json](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/public/data/books.json) (12 ouvrages variés) & couvertures SVG vectorielles dans [public/covers/](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/public/covers/).
- Règle de redirection SPA pour hébergement Netlify (`public/_redirects`).
- Démonstrateur de réactivité et directives (`ref`, `v-model`, `v-for`, `v-if`).

### Séance 2 : Composants et intégration HTML/CSS
- Design Tokens CSS centralisés ([tokens.css](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/assets/tokens.css)) avec support thème clair / sombre (`prefers-color-scheme`).
- Remise à zéro CSS et classe utilitaire accessibilité `.sr-only` ([base.css](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/assets/base.css)).
- Composants monofichiers réutilisables en architecture BEM :
  - [AppHeader.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/AppHeader.vue) : En-tête sémantique avec navigation principale.
  - [AppFooter.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/AppFooter.vue) : Pied de page sémantique avec horaires et contact.
  - [BaseButton.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/BaseButton.vue) : Bouton polymorphe (`button` ou `RouterLink`, variantes `primary` / `ghost`).
  - [BookCard.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/BookCard.vue) : Carte d'ouvrage accessible avec statut et bouton favori.
  - [BookList.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/BookList.vue) : Grille adaptative CSS Grid sans breakpoint rigide.
  - [SearchBar.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/SearchBar.vue) : Champ de recherche avec `defineModel` et label masqué accessible.
  - [BaseCard.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/BaseCard.vue) : Carte générique avec slots nommés.
- Page d'accueil intégrée [HomeView.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/views/HomeView.vue).
- Audit d'accessibilité (Score 100/100 Lighthouse & zéro violation axe) : voir [`AUDIT-ACCESSIBILITE.md`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/AUDIT-ACCESSIBILITE.md).
- Revue de code croisée : voir [`REVUE.md`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/REVUE.md).

### Séance 3 : Routage, données asynchrones et pages du site
- **Vue Router 4 monopage (SPA) avec 5 routes :**
  1. `/` : Accueil ([HomeView.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/views/HomeView.vue))
  2. `/catalogue` : Catalogue complet avec filtres et pagination ([CatalogueView.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/views/CatalogueView.vue)) — *chargement à la demande (lazy loading)*
  3. `/livres/:id` : Page détail d'un livre ([BookView.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/views/BookView.vue)) avec paramètre dynamique sous forme de prop et redirection automatique vers la 404 si l'id n'existe pas.
  4. `/contact` : Formulaire de contact accessible avec validation réactive ([ContactView.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/views/ContactView.vue)).
  5. `/:pathMatch(.*)*` : Page 404 dédiée ([NotFoundView.vue](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/views/NotFoundView.vue)).
- **Navigation active et scroll behavior :**
  - Liens actifs soulignés automatiquement via la classe `.router-link-active`.
  - Remontée en haut de page systématique lors du changement de route (`scrollBehavior: () => ({ top: 0 })`).
  - Guard global `router.afterEach` mettant à jour dynamiquement la balise `<title>` du document.
- **Logique métier déportée dans un Composable :**
  - [useBooks.js](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/composables/useBooks.js) expose de façon réutilisable les états `{ books, loading, error, load }` sans aucun appel `fetch` dispersé dans les composants de présentation.
- **Catalogue interactif :**
  - Recherche combinée (titre ou auteur), filtre dynamique par catégorie, tri (titre alphabétique ou année) et pagination à 8 éléments par page.
  - Retour automatique à la première page au moindre changement de filtre (`watch([query, category, sort], ...)`).
  - Traitement rigoureux des 4 états d'interface : Chargement (`loading`), Erreur (`error`), Vide (`!filtered.length`) et Affichage des données.
- **Formulaire accessible (RGAA) :**
  - Validation réactive à la perte de focus (`@blur`) et à l'envoi (`@submit.prevent`).
  - Liaison ARIA complète (`aria-describedby` reliant l'erreur au champ, `:aria-invalid` reflétant l'état, `role="status"` et `role="alert"`).
- **Suite de tests unitaires Vitest :** 7 tests exécutés et validés avec succès sur les composants clés.

---

## Commandes du projet

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement (Vite)
npm run dev

# Build de production
npm run build

# Prévisualisation du build de production
npm run preview

# Lancement de la suite de tests unitaires Vitest
npm test:unit

# Linter et formateur de code
npm run lint
npm run format
```

## Déploiement Netlify
- **Build command :** `npm run build`
- **Publish directory :** `dist`
- **Fallback SPA :** configuré via `public/_redirects` (`/* /index.html 200`)
