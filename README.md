# TaskProject – API de gestion de projets et de tâches

TaskProject est une API REST développée avec **NestJS** permettant de gérer des utilisateurs, des projets et les tâches associées à ces projets.

Ce projet personnel a été réalisé dans le cadre de mon apprentissage du développement backend. Il me permet de mettre en pratique l'architecture modulaire de NestJS, la gestion d'une base de données relationnelle et l'authentification avec JWT.

## Fonctionnalités

### Gestion des utilisateurs
- Création d'utilisateurs.
- Consultation de la liste des utilisateurs.
- Consultation d'un utilisateur par son identifiant.
- Modification et suppression d'un utilisateur.
- Hachage des mots de passe avec bcrypt.

### Authentification
- Inscription et connexion.
- Authentification avec Passport et JWT.
- Protection des routes à l'aide d'un guard.
- Validation des identifiants.

### Gestion des projets
- Création d'un projet associé à un utilisateur.
- Consultation de tous les projets.
- Consultation d'un projet par son identifiant.
- Modification et suppression d'un projet.

### Gestion des tâches
- Création d'une tâche associée à un projet.
- Consultation de toutes les tâches.
- Consultation d'une tâche par son identifiant.
- Modification et suppression d'une tâche.
- Modification du statut d'une tâche.

Les statuts disponibles sont :
- `à faire`
- `en cours`
- `terminée`

## Technologies utilisées

| Technologie | Utilisation |
|---|---|
| NestJS | Framework backend |
| TypeScript | Langage de programmation |
| MySQL | Base de données relationnelle |
| TypeORM | ORM et gestion des relations |
| Passport | Authentification |
| JWT | Gestion des jetons d'authentification |
| bcrypt | Hachage des mots de passe |
| class-validator | Validation des données |
| Swagger | Documentation de l'API |
| Git / GitHub | Gestion du code source |

## Architecture du projet

L'application est organisée en plusieurs modules :

- `AuthModule` : inscription, connexion et authentification.
- `UserModule` : gestion des utilisateurs.
- `ProjectModule` : gestion des projets.
- `TasksModule` : gestion des tâches.
- `AppModule` : configuration générale de l'application.

### Relations entre les entités

- Un utilisateur peut posséder plusieurs projets.
- Un projet peut contenir plusieurs tâches.
- Une tâche appartient à un seul projet.

Ces relations sont gérées avec TypeORM (`OneToMany` et `ManyToOne`).

## Installation et configuration

### Prérequis

- Node.js
- npm
- MySQL

### 1. Cloner le dépôt

```bash
git clone https://github.com/fallafall471/taskproject.git
cd taskproject
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
DATABASE_NAME=nom_de_la_base
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=mot_de_passe
DATABASE_signature=une_cle_secrete
```

Adapter les valeurs à votre configuration MySQL.

Créer au préalable la base de données correspondante dans MySQL.

### 4. Démarrer l'application

```bash
npm run start:dev
```

L'API sera accessible à l'adresse :

`http://localhost:3000`

## Documentation de l'API

La documentation interactive Swagger est disponible à l'adresse :

`http://localhost:3000/api/docs`

Elle permet de consulter les routes disponibles et d'effectuer des requêtes sur l'API.

## Principales routes

| Méthode | Route | Description |
|---|---|---|
| POST | `/auth/signup` | Inscription |
| POST | `/auth/login` | Connexion |
| POST | `/user` | Créer un utilisateur |
| GET | `/user` | Lister les utilisateurs |
| GET | `/user/:id` | Consulter un utilisateur |
| PATCH | `/user/:id` | Modifier un utilisateur |
| DELETE | `/user/:id` | Supprimer un utilisateur |
| POST | `/project` | Créer un projet |
| GET | `/project` | Lister les projets |
| GET | `/project/:id` | Consulter un projet |
| PATCH | `/project/:id` | Modifier un projet |
| DELETE | `/project/:id` | Supprimer un projet |
| POST | `/tasks` | Créer une tâche |
| GET | `/tasks` | Lister les tâches |
| GET | `/tasks/:id` | Consulter une tâche |
| PATCH | `/tasks/:id` | Modifier une tâche |
| PATCH | `/tasks/:id/status` | Modifier le statut |
| DELETE | `/tasks/:id` | Supprimer une tâche |

Les routes protégées nécessitent un jeton JWT transmis dans l'en-tête `Authorization` au format `Bearer`.

## État du projet

Projet personnel réalisé à des fins d'apprentissage et de mise en pratique du développement backend avec NestJS.

Il constitue un travail en cours d'amélioration et n'est pas destiné à être utilisé directement en production.
