# Tache Front End

Une application frontend React pour la gestion des tâches utilisateur, avec authentification et fonctionnalités complètes de gestion des tâches.

## Description

Cette application permet aux utilisateurs de s'inscrire, se connecter, et gérer leurs tâches personnelles. Elle offre une interface moderne et responsive pour créer, visualiser, modifier et supprimer des tâches, avec support pour l'upload de fichiers et des champs dynamiques lors de l'inscription.

## Fonctionnalités

- **Authentification utilisateur** : Connexion et inscription avec validation
- **Gestion des tâches** :
  - Création de nouvelles tâches
  - Affichage en liste avec pagination
  - Suppression de tâches
  - Support audio (notes vocales)
- **Inscription avancée** : Champs dynamiques et upload de fichiers
- **Interface responsive** : Design moderne avec Tailwind CSS
- **Navigation fluide** : Routing avec React Router

## Technologies utilisées

- **React 19** : Bibliothèque JavaScript pour l'interface utilisateur
- **Vite** : Outil de build rapide pour le développement
- **Tailwind CSS** : Framework CSS utilitaire
- **React Router DOM** : Gestion du routing
- **Lucide React** : Icônes SVG
- **Context API** : Gestion d'état globale
- **ESLint** : Linting du code

## Installation

1. Clonez le repository :
   ```bash
   git clone <url-du-repo>
   cd tache-front-end
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Créez un fichier `.env` à la racine avec vos variables d'environnement si nécessaire.

4. Lancez l'application en mode développement :
   ```bash
   npm run dev
   ```

L'application sera accessible sur `http://localhost:5173`.

## Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Construit l'application pour la production
- `npm run lint` : Exécute ESLint pour vérifier le code
- `npm run preview` : Prévisualise la version de production

## Structure du projet

```
src/
├── components/
│   ├── connexions/          # Composants de connexion
│   ├── inscriptions/        # Composants d'inscription
│   ├── userTache/           # Composants de gestion des tâches
│   │   ├── AddTask.jsx
│   │   ├── DeleteTask.jsx
│   │   ├── UserTaskList.jsx
│   │   ├── UserTaskCard.jsx
│   │   ├── Pagination.jsx
│   │   ├── Audio.jsx
│   │   └── UserTask.jsx
│   ├── contexts/            # Contextes React pour la gestion d'état
│   │   ├── auth/
│   │   ├── users/
│   │   └── userTasks/
│   └── AppTache.jsx         # Composant principal
├── routes/
│   └── route.jsx            # Configuration des routes
├── App.jsx                  # Point d'entrée de l'application
└── main.jsx                 # Fichier d'entrée Vite
```

## Utilisation

1. **Inscription** : Accédez à `/inscription` pour créer un compte avec des champs dynamiques et upload de fichiers.
2. **Connexion** : Utilisez `/` pour vous connecter.
3. **Gestion des tâches** : Après connexion, accédez à `/userTache` pour gérer vos tâches.

## Développement

Pour contribuer au projet :

1. Forkez le repository
2. Créez une branche pour votre fonctionnalité
3. Commitez vos changements
4. Poussez vers votre fork
5. Ouvrez une Pull Request

Assurez-vous que le code passe les tests ESLint avant de soumettre.

## Licence

Ce projet est sous licence MIT.
