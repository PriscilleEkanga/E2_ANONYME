# Portail WebCraft Solutions — React

Migration du portail E1 (projets + formations) vers une application React componentisée.

- **React 18** · **React Router 6** · **JavaScript ES6+** · **CSS3 + Bootstrap 5**
- Aucune bibliothèque UI (pas de Material-UI, Ant Design…), Bootstrap est utilisé uniquement pour le CSS

## Lancer le projet

```bash
npm install
npm run dev       # serveur de développement → http://localhost:5173
npm run build     # build de production dans dist/
npm run lint      # analyse du code (oxlint)
```

## Fonctionnalités

| Page | Route | Contenu |
|---|---|---|
| Accueil | `/` | Hero animé + section Projets (API 1) + section Formations (API 2) |
| Projets | `/projets` | Liste complète des projets |
| Formations | `/formations` | Liste complète des formations |
| Inscription | `/inscription/:courseId?` | Formulaire validé ; `:courseId` (optionnel) pré-sélectionne la formation |
| 404 | `*` | Page introuvable |

Dans chaque section : **recherche en temps réel** (insensible aux accents et à la casse), **filtres dynamiques**
construits à partir des listes renvoyées par l'API, **modale de détails**, **spinner** pendant le chargement et
**message d'erreur avec bouton « Réessayer »** si une API ne répond pas.

## Architecture

```
src/
├── App.jsx                   # Composant racine : Router + mise en page (Header / main / Footer)
├── App.css                   # Styles globaux, animations du Hero
├── main.jsx                  # Point d'entrée
├── config/                   # Constantes : aucune valeur « en dur » dans les composants
│   ├── api.js                #   URLs des deux API
│   ├── routes.js             #   Chemins des routes + liens de navigation
│   └── catalog.js            #   Champs de recherche / filtres de chaque catalogue
├── pages/                    # Une page = un assemblage de composants, presque sans logique
│   ├── Home.jsx
│   ├── ProjectsPage.jsx
│   ├── CoursesPage.jsx
│   ├── InscriptionPage.jsx
│   └── NotFoundPage.jsx
├── components/
│   ├── Header.jsx, Footer.jsx, Hero.jsx, ScrollToTop.jsx      # Mise en page
│   ├── SearchBar.jsx, FilterBar.jsx, Modal.jsx                # Composants réutilisables
│   ├── Loader.jsx, ErrorMessage.jsx                           # États de chargement / erreur
│   ├── ProjectCard.jsx, CourseCard.jsx                        # Cartes
│   ├── ProjectDetails.jsx, CourseDetails.jsx                  # Contenu des modales
│   ├── CardImage.jsx, TagList.jsx, InfoList.jsx               # Petits blocs partagés
│   ├── CatalogSection.jsx                                     # Section générique (voir ci-dessous)
│   ├── ProjectsSection.jsx, CoursesSection.jsx                # Branchement API → CatalogSection
│   └── InscriptionForm.jsx, FormField.jsx                     # Formulaire
├── hooks/
│   ├── useFetch.jsx          # Appel API : data / isLoading / error / refetch
│   ├── useSearch.jsx         # Recherche + filtres
│   └── useForm.jsx           # État et validation d'un formulaire
└── utils/
    ├── validation.js         # Règles de validation du formulaire (fonctions pures)
    ├── search.js             # Logique de recherche / filtrage (fonctions pures)
    └── format.js             # Formatage prix et notes
```

### Arbre des composants de la page d'accueil

```
App
├── Header
├── Home
│   ├── Hero
│   ├── ProjectsSection ── useFetch(API projets)
│   │   └── CatalogSection ── useSearch
│   │       ├── SearchBar
│   │       ├── FilterBar  (technologies, categories)
│   │       ├── ProjectCard × n
│   │       └── Modal → ProjectDetails
│   └── CoursesSection ── useFetch(API formations)
│       └── CatalogSection ── useSearch
│           ├── SearchBar
│           ├── FilterBar  (categories, levels, technologies)
│           ├── CourseCard × n
│           └── Modal → CourseDetails
└── Footer
```

## Choix de conception

### Pas de code dupliqué entre Projets et Formations
`CatalogSection` contient toute la mécanique commune (recherche, filtres, grille, modale, chargement, erreur).
Ce qui diffère est injecté par props :
- `config` : champs de recherche et de filtre (depuis `config/catalog.js`)
- `filterOptions` : listes `categories` / `levels` / `technologies` renvoyées par l'API
- `renderCard` / `renderDetails` : quelle carte et quel contenu de modale afficher

`ProjectsSection` et `CoursesSection` ne font qu'appeler `useFetch` et brancher le résultat.
Les pages `/projets` et `/formations` réutilisent ces mêmes sections.

`FilterBar` n'affiche un `<select>` que pour les listes reçues : le même composant donne 2 filtres
pour les projets et 3 pour les formations.

### Hooks personnalisés
- **`useFetch(url)`** : gère les trois états d'un appel réseau. Il teste `response.ok` (fetch ne rejette pas
  sur une erreur HTTP), annule la requête avec `AbortController` si le composant est démonté, et expose
  `refetch` pour le bouton « Réessayer ».
- **`useSearch(items, searchKeys, filterKeys)`** : stocke la recherche et les filtres, calcule les résultats
  avec `useMemo` en s'appuyant sur `utils/search.js`.
- **`useForm(initialValues, validate)`** : formulaire contrôlé. Les erreurs sont calculées à chaque saisie
  mais affichées seulement après avoir quitté le champ ou soumis le formulaire.

### Séparation des responsabilités
- **Logique métier** (validation, recherche, formatage) dans `utils/`, en fonctions pures documentées en JSDoc,
  testables sans React.
- **Constantes** (URLs, routes, configuration) dans `config/`.
- **Composants d'affichage** sans état métier : les cartes reçoivent leurs données et un `onSelect`,
  c'est la section parente qui décide d'ouvrir la modale.

### State et props
Chaque section possède son propre état (données, recherche, élément sélectionné) : pas de state global
et pas de prop drilling au-delà de deux niveaux. Les props de chaque composant sont documentées en JSDoc.

### Accessibilité
Labels sur tous les champs, `aria-invalid` / `aria-describedby` sur les erreurs, modale avec `role="dialog"`,
fermeture à la touche Échap et focus sur le bouton de fermeture, `role="status"` sur le loader,
animations désactivées si l'utilisateur a choisi de réduire les animations.

### Version de React Router
Le sujet impose React Router 6. `npm audit` signale deux alertes modérées sur cette version, corrigées
uniquement en v7. Elles ne concernent pas ce projet : la première touche les liens construits à partir
d'une saisie utilisateur (tous les liens ici sont des constantes), la seconde le rendu serveur (SSR),
non utilisé.

## Conventions
- Composants en **PascalCase** (`SearchBar`, `ProjectCard`), fonctions et variables en **camelCase**
  (`handleSubmit`, `isLoading`, `refetch`)
- Indentation de 2 espaces
- Composants de moins de 150 lignes, une responsabilité par fichier
