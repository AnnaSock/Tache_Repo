# Mini_framework_express

Ce projet est un mini framework basé sur **Express.js**, **TypeScript** et **Prisma** pour la gestion de tâches et d'utilisateurs. Il propose une structure simple, évolutive et professionnelle pour démarrer rapidement une API RESTful connectée à une base de données MySQL.

---

## Sommaire

- [Fonctionnalités principales](#fonctionnalités-principales)
- [Architecture du projet](#architecture-du-projet)
- [Installation et configuration](#installation-et-configuration)
- [Modèle de données](#modèle-de-données)
- [Structure du code](#structure-du-code)
- [Utilisation de l'API](#utilisation-de-lapi)
- [Sécurité & Authentification](#sécurité--authentification)
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

Le projet gère deux entités principales : **Utilisateur** et **Taches**.

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
}

model Taches {
  id            Int         @id @default(autoincrement())
  titre         String
  description   String?
  statut        Etat        @default(EN_COURS)
  utilisateurId Int
  utilisateur   Utilisateur @relation(fields: [utilisateurId], references: [id])
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

### 2. Services (`src/services/`)

- [`UtilisateurService`](src/services/UtilisateurService.ts) : Logique métier liée aux utilisateurs (hash du mot de passe, génération du JWT, etc.).
- [`TacheService`](src/services/TacheService.ts) : Logique métier liée aux tâches.

### 3. Repositories (`src/repositories/`)

- [`UtilisateurRepository`](src/repositories/UtilisateurRepository.ts) : Accès aux données utilisateurs via Prisma.
- [`TacheRepository`](src/repositories/TacheRepository.ts) : Accès aux données tâches via Prisma.
- [`IRepository`](src/repositories/IRepository.ts) : Interface générique pour les repositories.

### 4. Middlewares (`src/middlewares/`)

- [`AuthMiddleware`](src/middlewares/AuthMiddleware.ts) : Vérifie la présence et la validité du token JWT pour sécuriser les routes.

### 5. Validation (`src/validators/`)

- [`Utilisateur.ts`](src/validators/Utilisateur.ts) : Schémas de validation Zod pour les utilisateurs (création, connexion).

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

**Auteur** :  par Anna Khadidiatou Sock
Mini framework Express/TypeScript/Prisma pour la gestion de tâches.


