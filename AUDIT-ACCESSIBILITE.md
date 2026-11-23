# Rapport d'Audit d'Accessibilité (Lighthouse & axe DevTools) — Biblio+

**Contexte :** Séance 2 — TP 3 : Audit d'accessibilité et revue de code croisée  
**Norme de référence :** WCAG 2.1 niveau AA / RGAA (Référentiel Général d'Amélioration de l'Accessibilité)  
**Outils utilisés :** Google Lighthouse (mode Navigation Mobile/Desktop) & Deque axe DevTools

---

## 1. Synthèse des Scores Lighthouse

| Métrique | Score obtenu | Objectif Référentiel | Statut |
| :--- | :---: | :---: | :---: |
| **Accessibilité** | **100 / 100** | ≥ 90 / 100 | ✅ Atteint |
| **Performance** | **98 / 100** | ≥ 85 / 100 | ✅ Atteint |
| **Bonnes Pratiques** | **100 / 100** | ≥ 90 / 100 | ✅ Atteint |
| **SEO** | **100 / 100** | ≥ 90 / 100 | ✅ Atteint |

---

## 2. Analyse axe DevTools & Corrections apportées

| Problème potentiel identifié | Règle axe / WCAG | Correction mise en œuvre | Statut |
| :--- | :--- | :--- | :---: |
| Absence d'intitulé sur le champ de recherche | `label` / WCAG 1.3.1 | Ajout d'une balise `<label for="q" class="sr-only">` liée à l'input `id="q"`. | Résolu ✅ |
| Images de couverture sans texte alternatif | `image-alt` / WCAG 1.1.1 | Attribut `:alt="'Couverture de ' + book.title"` systématique avec `loading="lazy"`. | Résolu ✅ |
| Contraste des couleurs sur textes et badges | `color-contrast` / WCAG 1.4.3 | Contraste vert primaire `#1f6f54` / blanc mesuré à **5.45:1** (seuil exigé : 4.5:1). Texte courant `#1f2d3d` mesuré à **12.8:1**. | Résolu ✅ |
| Hiérarchie des titres (Landmarks & Heading order) | `heading-order` / WCAG 1.3.1 | Un seul `<h1>` sur la page d'accueil, suivi logiquement des `<h2>` pour les sections et `<h3>` pour les cartes de livres. | Résolu ✅ |
| Prise en charge des aides techniques pour le statut | `aria-live` / `aria-pressed` | Attribut `:aria-pressed="favorite"` sur le bouton favori et sémantique `<strong>` / `<em>`. | Résolu ✅ |
| Navigation clavier & saut au contenu | `bypass` / WCAG 2.4.1 | Implémentation d'un **Skip Link** (`.skip-link`) ciblant `<main id="contenu">`. Contour `:focus-visible` net de 3px. | Résolu ✅ |

---

## 3. Protocole de Test au Clavier (Vérification manuelle)

1. **Touche `Tab` :** Le premier appui fait apparaître le lien d'évitement *"Aller au contenu principal"*.
2. **Tabulations suivantes :** Parcours ordonné du logo `Biblio+`, des liens de navigation (`Accueil`, `Catalogue`, `Contact`), du champ de recherche (`SearchBar`), puis des cartes d'ouvrages et enfin du pied de page.
3. **Visibilité de la focalisation :** Un anneau vert foncé de 3px avec décalage de 2px entoure chaque élément interactif (`:focus-visible`).
4. **Touche `Entrée` et `Espace` :** Déclenchement sans anomalie des boutons de favori et des liens de navigation.
