# Biblio+ — Portail Web de la Bibliothèque Municipale

Projet d'application web moderne réalisé dans le cadre de la certification **RNCP 39608 BC01 (Vue.js)**.

## Séances couvertes

- **Séance 1 : Cadrage, maquettage et initialisation du projet**
  - Cadrage du besoin usager & contraintes techniques.
  - Backlog priorisé (12 User Stories méthode MoSCoW) : voir [`CADRAGE.md`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/CADRAGE.md).
  - Initialisation avec Vite + Vue 3 (Composition API).
  - Données structurées `public/data/books.json` (12 ouvrages variés) & couvertures SVG vectorielles.
  - Règle de redirection SPA pour hébergement Netlify (`public/_redirects`).
  - Démonstrateur de réactivité et directives (`ref`, `v-model`, `v-for`, `v-if`).

- **Séance 2 : Composants et intégration HTML/CSS**
  - Design Tokens CSS centralisés (`src/assets/tokens.css`) avec support thème clair / sombre (`prefers-color-scheme`).
  - Remise à zéro CSS et classe utilitaire accessibilité `.sr-only` (`src/assets/base.css`).
  - Composants monofichiers réutilisables en architecture BEM :
    - [`AppHeader.vue`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/AppHeader.vue) : En-tête sémantique avec navigation principale.
    - [`AppFooter.vue`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/AppFooter.vue) : Pied de page sémantique avec horaires et contact.
    - [`BaseButton.vue`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/BaseButton.vue) : Bouton polymorphe (`button` ou `RouterLink`, variantes `primary` / `ghost`).
    - [`BookCard.vue`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/BookCard.vue) : Carte d'ouvrage accessible avec statut et bouton favori.
    - [`BookList.vue`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/BookList.vue) : Grille adaptative CSS Grid sans breakpoint rigide.
    - [`SearchBar.vue`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/SearchBar.vue) : Champ de recherche avec `defineModel` et label masqué accessible.
    - [`BaseCard.vue`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/components/BaseCard.vue) : Carte générique avec slots nommés.
  - Page d'accueil intégrée [`HomeView.vue`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/src/views/HomeView.vue) avec filtrage dynamique et chargement des données.
  - Audit d'accessibilité (Score 100/100 Lighthouse & zéro violation axe) : voir [`AUDIT-ACCESSIBILITE.md`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/AUDIT-ACCESSIBILITE.md).
  - Revue de code croisée avec 3 recommandations : voir [`REVUE.md`](file:///C:/Users/NHN/.gemini/antigravity/scratch/biblio-plus/REVUE.md).

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

# Lancement des tests unitaires
npm test:unit

# Linter et formateur
npm run lint
npm run format
```

## Déploiement Netlify
- **Build command :** `npm run build`
- **Publish directory :** `dist`
- **Fallback SPA :** configuré via `public/_redirects` (`/* /index.html 200`)
