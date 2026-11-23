# Dossier de Cadrage & Backlog Produit — Projet Biblio+
**Formation Développeur Web / Vue.js · RNCP 39608 BC01**

---

## 1. Contexte et Attentes du Projet

### 1.1 Contexte client
La bibliothèque municipale souhaite moderniser son portail web à travers le projet **Biblio+**. L'objectif est d'offrir aux usagers un service en ligne réactif, intuitif et accessible pour :
- Découvrir les collections et consulter les ouvrages disponibles en temps réel.
- Rechercher rapidement un livre par titre, auteur ou catégorie.
- Mettre en avant les coups de cœur des bibliothécaires et les nouveautés.
- Faciliter le contact et la consultation des horaires et services proposés par la bibliothèque.
- Garantir une **accessibilité numérique exemplaire (RGAA / WCAG 2.1 niveau AA)**, notamment pour les personnes malvoyantes ou naviguant exclusivement au clavier.

### 1.2 Objectifs et Livrables attendus
- **Application Single Page Application (SPA)** fluide et réactive développée avec **Vue 3** et **Vite**.
- Architecture par **composants monofichiers (.vue)** modulaires et réutilisables.
- Gestion d'état claire avec la Composition API (`<script setup>`, `ref`, `computed`, `watch`, `defineModel`).
- Design System reposant sur des **Design Tokens** en variables CSS et la méthodologie **BEM** (`bloc__élément--modificateur`).
- Déploiement continu automatisé via **GitHub** et **Netlify**.
- Audit qualité : Score **Lighthouse Accessibilité ≥ 90/100** et 0 violation bloquante sur axe DevTools.

---

## 2. Contraintes et Choix Techniques

| Domaine | Choix technique | Justification |
| :--- | :--- | :--- |
| **Framework** | Vue.js 3 (Composition API) | Réactivité performante, `<script setup>` concis et typage naturel. |
| **Outillage** | Vite | Démarrage instantané du serveur dev, HMR ultra-rapide et build Rollup optimisé. |
| **Routage** | Vue Router 4 | Navigation SPA fluide sans rechargement de page avec historique HTML5. |
| **État global** | Pinia | Store officiel léger, modulaire et parfaitement intégré à Vue 3. |
| **Styles** | CSS natif (Tokens + Scoped + BEM) | Pas de dépendance CSS lourde ; isolation des styles par composant et tokens centralisés. |
| **Accessibilité** | RGAA / WCAG AA | Balises sémantiques HTML5 (`header`, `nav`, `main`, `footer`, `article`), navigation clavier, contrastes ≥ 4.5:1. |
| **Versionnement** | Git & GitHub | Workflow par branches de fonctionnalités (`feat/...`) et revues de code. |
| **Hébergement** | Netlify | Déploiement continu (CI/CD) automatique à chaque push sur `main`, règle de fallback SPA (`_redirects`). |

---

## 3. Planning Prévisionnel (5 Séances)

```
Séance 1 : Cadrage, maquettage Figma, init projet Vue 3 + Vite, réactivité de base.
Séance 2 : Composants modulaires (Header, Footer, Button, Card, SearchBar), CSS Tokens & BEM, Audit Accessibilité.
Séance 3 : Navigation SPA avec Vue Router (Catalogue, Détail d'un livre, Contact), routes dynamiques.
Séance 4 : Gestion de l'état global avec Pinia (Gestion des favoris, réservations, panier d'emprunt).
Séance 5 : Tests unitaires (Vitest), tests E2E (Playwright) et soutenance finale.
```

---

## 4. Backlog Produit Priorisé (Méthode MoSCoW)

Chaque besoin est découpé sous forme de User Story (US) accompagnée de ses critères d'acceptation (CA) :

### MUST HAVE (Indispensable pour la V1)

#### US-01 : Consultation de la liste des livres coups de cœur (Accueil)
- **En tant que** usager,
- **Je veux** visualiser sur la page d'accueil une sélection de livres (coups de cœur),
- **Afin de** découvrir rapidement des suggestions de lecture pertinentes.
- **Critères d'acceptation :**
  - Les livres s'affichent sous forme de grille responsive.
  - Chaque carte affiche la couverture, le titre, l'auteur et la disponibilité.
  - Un indicateur visuel et textuel distinct distingue les livres disponibles des livres empruntés.

#### US-02 : Recherche dynamique instantanée de livres
- **En tant que** lecteur,
- **Je veux** rechercher un livre par titre ou auteur en tapant dans un champ de recherche,
- **Afin de** trouver immédiatement si l'ouvrage est référencé sans recharger la page.
- **Critères d'acceptation :**
  - La recherche filtre la liste en temps réel dès la saisie (liaison bidirectionnelle `v-model`).
  - Si le champ est vidé, la liste complète réapparaît.
  - Le champ de recherche dispose d'un `<label>` accessible (`.sr-only`) et d'un `role="search"`.

#### US-03 : Bascule de la disponibilité d'un livre (Démonstrateur de réactivité)
- **En tant que** bibliothécaire ou testeur,
- **Je veux** cliquer sur un bouton pour inverser la disponibilité d'un livre,
- **Afin de** vérifier que l'état réactif met à jour l'interface instantanément.
- **Critères d'acceptation :**
  - Un clic modifie la valeur booléenne `available`.
  - La mention passe de "Disponible" à "Emprunté" sans rechargement.

#### US-04 : Architecture de composants monofichiers réutilisables
- **En tant que** développeur,
- **Je veux** découper l'interface en composants modulaires (`AppHeader`, `AppFooter`, `BaseButton`, `BookCard`, `BookList`, `SearchBar`),
- **Afin de** faciliter la maintenance, la testabilité et la réutilisation du code.
- **Critères d'acceptation :**
  - Les composants reçoivent leurs données par des `props` typées et documentées.
  - Les interactions remontent par des événements émis (`emit`).

#### US-05 : Accessibilité numérique et navigation au clavier
- **En tant que** utilisateur naviguant au clavier ou avec un lecteur d'écran,
- **Je veux** parcourir l'ensemble de l'interface avec la touche `Tab` et visualiser un focus clair,
- **Afin de** pouvoir interagir avec toutes les fonctionnalités sans souris.
- **Critères d'acceptation :**
  - Ordre de tabulation logique dans le DOM.
  - Indicateur `:focus-visible` très net (contour 3px vert primaire avec offset).
  - Score Lighthouse Accessibilité ≥ 90/100.

---

### SHOULD HAVE (Important pour une expérience usager optimale)

#### US-06 : Ajout / Retrait des livres aux favoris
- **En tant que** lecteur,
- **Je veux** marquer un livre comme favori d'un simple clic sur la carte,
- **Afin de** constituer ma liste de lecture personnelle.
- **Critères d'acceptation :**
  - Le bouton favori dispose d'un attribut `aria-pressed` reflétant son état.
  - L'action émet un événement `toggle-favorite` capté par le parent.

#### US-07 : Filtrage par catégorie d'ouvrage
- **En tant que** lecteur,
- **Je veux** filtrer le catalogue par genre (Roman, Jeunesse, Documentaire),
- **Afin de** cibler les ouvrages correspondant à mes goûts.
- **Critères d'acceptation :**
  - Boutons de filtre rapides actifs au clic.
  - Combinaison possible avec la recherche textuelle.

#### US-08 : Structure responsive mobile-first
- **En tant que** usager sur smartphone ou tablette,
- **Je veux** naviguer confortablement quelle que soit la taille de mon écran,
- **Afin de** consulter la bibliothèque en mobilité.
- **Critères d'acceptation :**
  - Grille CSS adaptative (`grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr))`).
  - En-tête et pied de page lisibles sans défilement horizontal.

---

### COULD HAVE (Fonctionnalités souhaitables à valeur ajoutée)

#### US-09 : Bouton polymorphe réutilisable (BaseButton)
- **En tant que** développeur UI,
- **Je veux** un composant `BaseButton` pouvant rendre un `<button>` ou un `<RouterLink>`,
- **Afin de** mutualiser le design et les variantes graphiques (`primary`, `ghost`).
- **Critères d'acceptation :**
  - Utilisation du composant dynamique `<component :is="...">`.

#### US-10 : Support d'un thème sombre automatique
- **En tant que** utilisateur en environnement sombre,
- **Je veux** que l'application s'adapte à mes préférences système (`prefers-color-scheme`),
- **Afin de** réduire la fatigue oculaire.
- **Critères d'acceptation :**
  - Media query CSS réaffectant les Design Tokens de couleurs.

#### US-11 : Formulaire de contact accessible
- **En tant que** usager,
- **Je veux** envoyer un message aux bibliothécaires via un formulaire validé,
- **Afin de** poser une question ou réserver une visite.

---

### WON'T HAVE (Hors périmètre des séances 1 et 2)
- US-12 : Paiement des pénalités de retard en ligne.
- US-13 : Authentification complexe OAuth2 / compte lecteur déporté.

---

## 5. Spécifications des Maquettes & Wireframes (Figma)

1. **Wireframe 1 — En-tête & Pied de page** :
   - Header fixe avec le logo `Biblio+` à gauche et la navigation (`Accueil`, `Catalogue`, `Contact`) à droite.
   - Footer structuré avec mentions légales, horaires d'ouverture et coordonnées.
2. **Wireframe 2 — Bannière Hero & Recherche** :
   - Titre principal `H1` clair et accueillant.
   - Barre de recherche centrale avec champ de saisie contrasté et loupe.
3. **Wireframe 3 — Grille des Livres** :
   - Cartes au format vertical (200x300 pour la couverture) avec titre `H3`, auteur, badge de disponibilité et bouton d'action favori.
