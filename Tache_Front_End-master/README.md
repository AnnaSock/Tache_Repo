Voici les README détaillés pour vos deux dossiers (front-end et back-end), générés en français comme demandé. J'ai analysé la structure de vos projets pour inclure des descriptions précises des fonctionnalités, de l'installation, de l'architecture et de l'utilisation. Le README du back-end existait déjà et était assez détaillé, je l'ai légèrement amélioré pour plus de cohérence. Pour le front-end, j'ai créé un nouveau README complet basé sur l'analyse du code.

### README pour le dossier Front-End (Tache_Front_End-master)

```
# Application de Gestion de Tâches - Front-End

Cette application front-end est développée avec **React**, **Vite**, **Tailwind CSS** et **React Router**. Elle permet aux utilisateurs de se connecter, s'inscrire, et gérer leurs tâches personnelles via une interface moderne et responsive. L'application communique avec une API back-end pour l'authentification et la gestion des données.

---

## Sommaire

- [Fonctionnalités principales](#fonctionnalités-principales)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture du projet](#architecture-du-projet)
- [Installation et configuration](#installation-et-configuration)
- [Structure du code](#structure-du-code)
- [Utilisation](#utilisation)
- [Scripts npm utiles](#scripts-npm-utiles)
- [Contribution](#contribution)

---

## Fonctionnalités principales

- **Authentification** : Connexion et inscription des utilisateurs avec validation.
- **Gestion des tâches** : Création, modification, suppression et visualisation des tâches avec pagination.
- **Upload de fichiers** : Téléchargement d'images et d'audios pour enrichir les tâches.
- **Interface responsive** : Design moderne avec Tailwind CSS, adapté aux mobiles et desktops.
- **Contextes React** : Gestion d'état globale pour l'authentification, la création d'utilisateurs et les tâches.
- **Navigation** : Routage entre les pages de connexion, inscription et gestion des tâches.

---

## Technologies utilisées

- **React 19** : Bibliothèque pour la construction d'interfaces utilisateur.
- **Vite** : Outil de build rapide pour le développement.
- **Tailwind CSS** : Framework CSS utilitaire pour le styling.
- **React Router DOM** : Gestion du routage côté client.
- **Lucide React** : Icônes vectorielles pour l'interface.
- **ESLint** : Linting pour la qualité du code.

---

## Architecture du projet

```
Tache_Front_End-master/
├── public/                 # Assets statiques (images, etc.)
├── src/
│   ├── components/         # Composants React
│   │   ├── connexions/     # Pages de connexion
│   │   ├── contexts/       # Contextes pour la gestion d'état
│   │   │   ├── auth/       # Contexte d'authentification
│   │   │   ├── users/      # Contexte de création d'utilisateurs
│   │   │   └── userTasks/  # Contexte des tâches utilisateur
│   │   ├── inscriptions/   # Pages d'inscription
│   │   └── userTache/      # Composants de gestion des tâches
│   ├── routes/             # Configuration des routes
│   ├── App.jsx             # Composant principal
│   ├── main.jsx            # Point d'entrée
│   └── index.css           # Styles globaux
├── package.json            # Dépendances et scripts
├── vite.config.js          # Configuration Vite
├── tailwind.config.js      # Configuration Tailwind
└── README.md               # Documentation
```

---

## Installation et configuration

1. **Cloner le dépôt**
   ```bash
   git clone <repo-url>
   cd Tache_Front_End-master
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   - Créer un fichier `.env` à la racine si nécessaire (par exemple pour l'URL de l'API back-end).
   - Assurer que le back-end est en cours d'exécution (par défaut sur `http://localhost:3000`).

4. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:5173` (port par défaut de Vite).

---

## Structure du code

### Composants principaux

- **AppTache.jsx** : Wrapper principal avec les providers de contexte.
- **PageConnexion.jsx** : Page de connexion utilisateur.
- **PageInscription.jsx** : Page d'inscription avec champs dynamiques et upload.
- **UserTask.jsx** : Page principale de gestion des tâches.
- **AddTask.jsx** : Composant pour ajouter une nouvelle tâche.
- **UserTaskList.jsx** : Liste des tâches avec pagination.
- **DeleteTask.jsx** : Suppression de tâches.
- **Audio.jsx** : Gestion des enregistrements audio pour les tâches.

### Contextes

- **AuthContext** : Gestion de l'état d'authentification (login/logout).
- **UserCreateContext** : Gestion de la création d'utilisateurs.
- **UserTaskContext** : Gestion des tâches utilisateur (CRUD).

### Routes

- `/` : Connexion
- `/inscription` : Inscription
- `/userTache` : Gestion des tâches (protégée)

---

## Utilisation

1. **Inscription** : Accédez à `/inscription`, remplissez le formulaire et uploadez une photo si souhaité.
2. **Connexion** : Utilisez vos identifiants sur `/` pour accéder à l'application.
3. **Gestion des tâches** : Sur `/userTache`, ajoutez, modifiez ou supprimez des tâches. Utilisez la pagination pour naviguer.
4. **Upload et audio** : Intégrez des fichiers ou enregistrements dans vos tâches pour plus de détails.

L'application communique avec l'API back-end pour toutes les opérations de données.

---

## Scripts npm utiles

- `npm run dev` : Démarre le serveur de développement avec rechargement automatique.
- `npm run build` : Construit l'application pour la production.
- `npm run preview` : Prévisualise la version de production.
- `npm run lint` : Vérifie le code avec ESLint.

---

## Contribution

1. Forkez le projet.
2. Créez une branche (`git checkout -b feature/ma-feature`).
3. Commitez vos modifications (`git commit -am 'Ajout d'une feature'`).
4. Poussez la branche (`git push origin feature/ma-feature`).
5. Ouvrez une Pull Request.

---

**Auteur** : Anna Khadidiatou Sock  
Application front-end React pour la gestion de tâches.
```

### README pour le dossier Back-End (Tache-master)

Le README existant était déjà détaillé, mais j'ai apporté de légères améliorations pour inclure plus de détails sur les dépendances et l'intégration avec le front-end.

```
# Mini_framework_express

Ce projet est un mini framework basé sur **Express.js**, **TypeScript** et **Prisma** pour la gestion de tâches et d'utilisateurs. Il propose une structure simple, évolutive et professionnelle pour démarrer rapidement une API RESTful connectée à une base de données MySQL. Il est conçu pour être utilisé avec une application front-end React pour une gestion complète des tâches.

---

## Sommaire

- [Fonctionnalités principales](#fonctionnalités-principales)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture du projet](#architecture-du-projet)
- [Installation et configuration](#installation-et-configuration)
- [Modèle de données](#modèle-de-données)
- [Structure du code](#structure-du-code)
- [Utilisation de l'API](#utilisation-de-lapi)
- [Sécurité & Authentification](#sécurité--authentification)
- [Intégration avec le front-end](#intégration-avec-le-front-end)
- [Scripts npm utiles](#scripts-npm-utiles)
- [Contribution](#contribution)

---

## Fonctionnalités principales

- **API Express** : Serveur HTTP rapide et minimaliste.
- **TypeScript** : Typage statique pour plus de robustesse.
- **Prisma ORM** : Accès à la base de données MySQL avec migrations et génération automatique du client.
- **Gestion des variables d'environnement** avec dotenv.
- **Structure repository/service/controller** pour une séparation claire des responsabilités.
- **Validation des données** avec Zod.
- **Authentification JWT** pour sécuriser les routes.
- **Gestion des utilisateurs et des tâches** (CRUD complet).
- **Upload de fichiers** : Gestion des images et audios via Multer.
- **Permissions** : Système de gestion des permissions utilisateur.

---

## Technologies utilisées

- **Express.js** : Framework web pour Node.js.
- **TypeScript** : Superset JavaScript avec typage statique.
- **Prisma** : ORM pour la base de données.
- **MySQL** : Base de données relationnelle.
- **JWT** : Authentification basée sur tokens.
- **Bcrypt** : Hashage des mots de passe.
- **Zod** : Validation des schémas de données.
- **Multer** : Gestion des uploads de fichiers.
- **CORS** : Gestion des requêtes cross-origin.

---

## Architecture du projet

```
tache/
├── src/
│   ├── config/           # Chargement des variables d'environnement
│   ├── controllers/      # Logique des routes (contrôleurs)
│   ├── middlewares/      # Middlewares Express (authentification, etc.)
│   ├── repositories/     # Accès aux données (Prisma)
│   ├── routes/           # Définition des routes Express
│   ├── services/         # Logique métier
│   ├── types/            # Types TypeScript personnalisés
│   ├── validators/       # Schémas de validation Zod
│   └── index.ts          # Point d'entrée principal de l'application
├── prisma/
│   ├── schema.prisma     # Modèle de données Prisma
│   └── migrations/       # Dossiers de migration SQL
├── uploads/              # Dossier pour les fichiers uploadés
├── .env                  # Variables d'environnement (à ne pas versionner)
├── .env.example          # Exemple de variables d'environnement
├── package.json          # Dépendances et scripts npm
├── tsconfig.json         # Configuration TypeScript
└── README.md             # Documentation
```

---

## Installation et configuration

1. **Cloner le dépôt**
   ```bash
   git clone <repo-url>
   cd tache
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer la base de données**
   - Copier `.env.example` en `.env` et renseigner les variables :
     ```
     DATABASE_URL="mysql://user:password@localhost:3306/tache"
     PORT=3000
     JWT_SECRET="votre_cle_secrete"
     ```

4. **Lancer les migrations Prisma**
   ```bash
   npm run migrate
   ```

5. **Générer le client Prisma**
   ```bash
   npm run generate
   ```

6. **Démarrer le serveur en développement**
   ```bash
   npm run dev
   ```

---

## Modèle de données

Le projet gère trois entités principales : **Utilisateur**, **Taches** et **Permission**.

```prisma
model Utilisateur {
  id        Int     @id @default(autoincrement())
  nom       String
  prenom    String
  email     String  @unique
  adresse   String?
  photo     String?
  login     String  @unique
  password  String
  telephone String?
  genre     String
  tache     Taches[]
  permissions Permission[]
}

model Taches {
  id            Int         @id @default(autoincrement())
  titre         String
  description   String?
  statut        Etat        @default(EN_COURS)
  utilisateurId Int
  utilisateur   Utilisateur @relation(fields: [utilisateurId], references: [id])
  dateCreation  DateTime?   @default(now())
  dateModification DateTime? @updatedAt
}

model Permission {
  id            Int         @id @default(autoincrement())
  nom           String      @unique
  description   String?
  utilisateurs  Utilisateur[]
}

enum Etat {
  EN_COURS
  TERMINER
  A_FAIRE
}
```

---

## Structure du code

### 1. Contrôleurs (`src/controllers/`)

- [`UtilisateurController`](src/controllers/UtilisateurController.ts) : Gère l'inscription, la connexion, la récupération, la modification et la suppression des utilisateurs.
- [`TacheController`](src/controllers/TacheController.ts) : Gère la création, la récupération, la modification et la suppression des tâches.
- [`UploadController`](src/controllers/UploadController.ts) : Gère l'upload de fichiers (images, audios).
- [`PermissionController`](src/controllers/PermissionController.ts) : Gère les permissions utilisateur.

### 2. Services (`src/services/`)

- [`UtilisateurService`](src/services/UtilisateurService.ts) : Logique métier liée aux utilisateurs (hash du mot de passe, génération du JWT, etc.).
- [`TacheService`](src/services/TacheService.ts) : Logique métier liée aux tâches.
- [`PermissionService`](src/services/PermissionService.ts) : Logique métier liée aux permissions.

### 3. Repositories (`src/repositories/`)

- [`UtilisateurRepository`](src/repositories/UtilisateurRepository.ts) : Accès aux données utilisateurs via Prisma.
- [`TacheRepository`](src/repositories/TacheRepository.ts) : Accès aux données tâches via Prisma.
- [`PermissionRepository`](src/repositories/PermissionRepository.ts) : Accès aux données permissions via Prisma.
- [`IRepository`](src/repositories/IRepository.ts) : Interface générique pour les repositories.

### 4. Middlewares (`src/middlewares/`)

- [`AuthMiddleware`](src/middlewares/AuthMiddleware.ts) : Vérifie la présence et la validité du token JWT pour sécuriser les routes.
- [`authentificate`](src/middlewares/authentificate.ts) : Middleware d'authentification personnalisé.

### 5. Validation (`src/validators/`)

- [`Utilisateur.ts`](src/validators/Utilisateur.ts) : Schémas de validation Zod pour les utilisateurs (création, connexion).
- [`taches.ts`](src/validators/taches.ts) : Schémas de validation Zod pour les tâches.

---

## Utilisation de l'API

### Authentification

- **Inscription** : `POST /api/users`
- **Connexion** : `POST /api/users/login`  
  → Retourne un JWT à utiliser dans l'en-tête `Authorization: Bearer <token>` pour les routes protégées.

### Utilisateurs

- `GET /api/users` : Liste tous les utilisateurs
- `GET /api/users/:id` : Récupère un utilisateur par ID
- `PUT /api/users/:id` : Met à jour un utilisateur
- `DELETE /api/users/:id` : Supprime un utilisateur

### Tâches (protégées par JWT)

- `GET /api/taches` : Liste toutes les tâches
- `GET /api/taches/:id` : Récupère une tâche par ID
- `POST /api/taches` : Crée une tâche (l'utilisateur connecté est automatiquement associé)
- `PUT /api/taches/:id` : Met à jour une tâche
- `DELETE /api/taches/:id` : Supprime une tâche

### Upload

- `POST /api/upload` : Upload de fichiers (images, audios)

### Permissions

- `GET /api/permissions` : Liste des permissions
- `POST /api/permissions` : Crée une permission
- etc.

### Exemple de requête protégée

```http
POST /api/taches
Authorization: Bearer <votre_token_jwt>
Content-Type: application/json

{
  "titre": "Ma nouvelle tâche",
  "description": "Description de la tâche",
  "statut": "A_FAIRE"
}
```

---

## Sécurité & Authentification

- Les routes `/api/taches` sont protégées par un middleware JWT ([`AuthMiddleware`](src/middlewares/AuthMiddleware.ts)).
- Le mot de passe utilisateur est hashé avec bcrypt avant stockage.
- Le token JWT contient l'`id` et l'`email` de l'utilisateur.
- Gestion des CORS pour les requêtes cross-origin.

---

## Intégration avec le front-end

Cette API est conçue pour être utilisée avec l'application front-end React. Assurez-vous que :
- Le front-end pointe vers l'URL de l'API (par défaut `http://localhost:3000`).
- Les tokens JWT sont stockés côté client et inclus dans les requêtes.
- Les uploads sont gérés via les endpoints dédiés.

---

## Scripts npm utiles

- `npm run dev` : Démarre le serveur en mode développement.
- `npm run build` : Compile le projet TypeScript.
- `npm run start` : Lance le serveur compilé.
- `npm run migrate` : Applique les migrations Prisma.
- `npm run generate` : Génère le client Prisma.

---

## Contribution

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/ma-feature`)
3. Commitez vos modifications (`git commit -am 'Ajout d'une feature'`)
4. Poussez la branche (`git push origin feature/ma-feature`)
5. Ouvrez une Pull Request

---

**Auteur** : Anna Khadidiatou Sock  
Mini framework Express/TypeScript/Prisma pour la gestion de tâches.
```

Ces READMEs sont prêts à être copiés dans les fichiers `README.md` respectifs de chaque dossier. Ils fournissent une documentation complète pour faciliter l'installation, l'utilisation et la contribution à vos projets.