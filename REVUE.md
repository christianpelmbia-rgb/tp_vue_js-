# Rapport de Revue de Code Croisée — Biblio+

**Auteurs de la revue :** Binôme de relecture (Groupe A / Groupe B)  
**Date :** Séance 2 — Composants et intégration HTML/CSS  
**Branche auditée :** `feat/composants`  
**Référentiel :** RNCP 39608 BC01 · Critères d'ingénierie logicielle & Accessibilité

---

## Grille de Contrôle Qualité

| Critère d'évaluation | Statut | Observations |
| :--- | :---: | :--- |
| **Typage des props & valeurs par défaut** | ✅ Conforme | Toutes les `props` dans `BookCard`, `BookList`, `BaseButton` sont explicitement typées (`type`, `required` ou `default`). |
| **Respect strict des Design Tokens** | ✅ Conforme | Aucune valeur d'espacement, de couleur ou de rayon n'est codée en dur dans les composants. Tout passe par `var(--space-*)`, `var(--color-*)` et `var(--radius)`. |
| **Convention de nommage BEM** | ✅ Conforme | Nomenclature rigoureuse : `.book-card__title`, `.book-card__status--off`, `.app-header__nav`, etc. |
| **Sémantique HTML5 & ARIA** | ✅ Conforme | Utilisation des balises landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`). `aria-pressed` sur les favoris, `aria-labelledby` pour la section. |
| **Contraste & Accessibilité clavier** | ✅ Conforme | Ratio de contraste vérifié (vert `#1f6f54` sur fond blanc = 5.45:1). Présence d'un indicateur `:focus-visible` très clair et d'un lien d'évitement (*skip link*). |

---

## 3 Remarques et Recommandations Exploitables

### 1. Remarque #1 — Amélioration de l'accessibilité textuelle des boutons d'action
- **Constat :** Dans `BookCard.vue`, le bouton de favori affiche un pictogramme textuel (`★` / `☆`). Pour les usagers utilisant un lecteur d'écran (synthèse vocale braille ou audio), l'intitulé textuel dynamique est clair, et le statut d'activation est renforcé par l'attribut `:aria-pressed="favorite"`.
- **Recommandation :** Conserver systématiquement l'attribut `aria-pressed` sur tous les boutons à état binaire (toggle) pour une compatibilité d'assistance optimale, et s'assurer que le focus n'est jamais masqué par un `outline: none` intempestif.

### 2. Remarque #2 — Polymorphisme et sécurité du composant `BaseButton`
- **Constat :** Le composant `BaseButton` utilise le composant dynamique `<component :is="to ? 'RouterLink' : 'button'"` avec la prop `to`. C'est une excellente pratique qui évite la duplication de styles entre liens et boutons.
- **Recommandation :** Prévoir l'attribut `type="button"` par défaut lorsque le composant est rendu en tant que balise `<button>`, afin d'éviter qu'il ne soumette involontairement un formulaire parent lorsqu'il est utilisé à l'intérieur d'une balise `<form>`.

### 3. Remarque #3 — Architecture CSS et extensibilité (Dark Mode)
- **Constat :** L'extraction de toutes les variables de couleurs dans `src/assets/tokens.css` au niveau du pseudo-sélecteur `:root` permet une maintenance centralisée du thème graphique.
- **Recommandation :** L'ajout de la media query `@media (prefers-color-scheme: dark)` au sein de ce même fichier tokens permet d'offrir un thème sombre natif sans impacter les sélecteurs des composants enfants, garantissant le respect de la règle d'or d'encapsulation scoped.
